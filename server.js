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

    console.log(`✅ Google Sheet loaded: ${doc.title}`);
  } catch (error) {
    console.error("❌ Google Sheets init failed:", error.message);
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
  await sheet.addRows([entry]);
}

/* =========================
   RETRY SYSTEM
========================= */

const retryFailedEntries = async () => {
  if (isRetryRunning) return;

  isRetryRunning = true;
  console.log("🔄 Running retry job...");

  try {
    if (!doc) {
      await initializeGoogleSheets();
    }

    const retries = await readRetries();
    if (retries.length === 0) {
      console.log("No retries pending");
      return;
    }

    const sheet = doc.sheetsByIndex[0];
    const remaining = [];

    for (const entry of retries) {
      try {
        await sheet.addRows([entry]);
        console.log("✅ Synced:", entry.Name);
      } catch {
        remaining.push(entry);
      }
    }

    await writeRetries(remaining);
  } catch (err) {
    console.error("Retry job failed:", err.message);
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

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone required" });
  }

  const entry = createEntry({ name, email, phone, message });

  try {
    await saveToSheet(entry);
    await sendEmail(entry);

    return res.json({
      success: true,
      message: "Saved successfully",
    });

  } catch (err) {
    console.error("❌ Sheets failed, saving locally:", err.message);

    await addRetry(entry);

    return res.json({
      success: true,
      fallback: true,
      message: "Saved locally, will sync later",
    });
  }
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
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error" });
});

/* =========================
   START SERVER
========================= */

const startServer = async () => {
  await initializeGoogleSheets();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Google Sheets: ${doc ? "Connected" : "Fallback mode"}`);
  });
};

startServer();