import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { addRetry, readRetries, writeRetries } from "./retryService.js";
import { sendEmail } from "./sendEmail.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let doc;
let isRetryRunning = false;

const pad = (value) => String(value).padStart(2, "0");
const formatTimestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}:${pad(now.getHours())}.${pad(now.getMinutes())}.${pad(now.getSeconds())}`;
};

const logInfo = (...args) => console.log(`${formatTimestamp()} -`, ...args);
const logWarn = (...args) => console.warn(`${formatTimestamp()} -`, ...args);
const logError = (...args) => console.error(`${formatTimestamp()} -`, ...args);

/* =========================
   GOOGLE SHEETS SETUP
========================= */

async function initializeGoogleSheets() {
  try {
    const serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

    const auth = new JWT({
      email: serviceAccountKey.client_email,
      key: serviceAccountKey.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
    await doc.loadInfo();

    logInfo(`Google Sheet loaded: ${doc.title}`);
  } catch (error) {
    logError("Google Sheets init failed:", error.message);
    doc = null;
  }
}

/* =========================
   HELPERS
========================= */

const createEntry = ({ name, email, phone, message }) => ({
  Timestamp: new Date().toISOString(),
  Name: name,
  Email: email || "N/A",
  Phone: phone,
  Message: message || "N/A",
});

async function saveToSheet(entry) {
  if (!doc) throw new Error("Sheets not initialized");

  const sheet = doc.sheetsByIndex[0];
  
  // Check if phone number already exists
  const rows = await sheet.getRows();
  const phoneExists = rows.some(row => row.get("Phone") === entry.Phone);
  if (phoneExists) {
    throw new Error("This mobile number is already registered. Please use a different mobile number.");
  }
  
  await sheet.addRows([entry]);
}

/* =========================
   RETRY SYSTEM
========================= */

const retryFailedEntries = async () => {
  if (isRetryRunning) return;

  isRetryRunning = true;
  logInfo("Running retry job...");

  try {
    if (!doc) {
      await initializeGoogleSheets();
    }

    const retries = await readRetries();
    if (retries.length === 0) {
      logInfo("No retries pending");
      return;
    }

    const sheet = doc.sheetsByIndex[0];
    const remaining = [];

    for (const entry of retries) {
      try {
        await sheet.addRows([entry]);
        logInfo("Synced:", entry.Name);
      } catch {
        remaining.push(entry);
      }
    }

    await writeRetries(remaining);
  } catch (err) {
    logError("Retry job failed:", err.message);
  } finally {
    isRetryRunning = false;
  }
};

// Run every 1 hour
setInterval(retryFailedEntries, 60 * 60 * 1000);

/* =========================
   ROUTES
========================= */

// Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Register
app.post("/api/register", async (req, res) => {
  const { name, email, phone, message } = req.body;

  logInfo(`Registration request received for ${name || "unknown user"}`);

  if (!name || !phone) {
    logWarn("/api/register missing required fields");
    return res.status(400).json({ error: "Name and phone required" });
  }

  const entry = createEntry({ name, email, phone, message });

  try {
    await saveToSheet(entry);
    logInfo("Saved registration in Google Sheet", { timestamp: entry.Timestamp });
  } catch (err) {
    logError("saveToSheet failed:", err);
    
    // Check if it's a duplicate phone number error
    if (err.message.includes("mobile number is already registered")) {
      return res.status(400).json({ error: err.message });
    }
    
    await addRetry(entry);
    logInfo("Registration saved locally for retry", { timestamp: entry.Timestamp });

    return res.json({
      success: true,
      fallback: true,
      message: "Saved locally, will sync later",
    });
  }

  try {
    await sendEmail(entry);
    logInfo("Email notification sent successfully", { timestamp: entry.Timestamp });
  } catch (err) {
    logError("sendEmail failed:", err);

    return res.json({
      success: true,
      fallback: true,
      message: "Saved successfully, but email notification failed.",
    });
  }

  return res.json({
    success: true,
    message: "Saved successfully",
  });
});

/* =========================
   STATIC FRONTEND
========================= */

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(new URL("./dist/index.html", import.meta.url).pathname);
});

/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  logError("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error" });
});

/* =========================
   START SERVER
========================= */

const startServer = async () => {
  await initializeGoogleSheets();

  app.listen(PORT, () => {
    logInfo(`Server running on port ${PORT}`);
    logInfo(`Google Sheets: ${doc ? "Connected" : "Fallback mode"}`);
  });
};

startServer();