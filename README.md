# Empower Connect

## 📌 About the Project

Empower Connect is a **full-stack web application** designed as a **lead generation and registration platform**.

Users can:

* View information about services
* Submit their details via a form

The system ensures:

* 📧 Email notification to admin (mandatory)
* 📊 Data storage in Google Sheets (best effort)
* 🔁 Retry mechanism for failed storage (no data loss)

---

## 🧠 Complete User Flow

```text
User submits form (Frontend)
        ↓
POST /api/register
        ↓
Backend receives request
        ↓
1. Send Email (MANDATORY)
        ↓
2. Try saving to Google Sheets
        ↓
   ├── Success → Done
   └── Failure → Save to retries.json
                        ↓
                Background Retry Job
                        ↓
                Sync to Google Sheets
```

---

## 🔌 API Endpoints

### Health Check

```
GET /api/health
```

---

### Register User

```
POST /api/register
```

#### Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "message": "Interested in demo"
}
```

#### Response:

```json
{
  "success": true,
  "message": "Registered successfully"
}
```

---

## 🚀 Tech Stack

### Frontend

* React (TypeScript)
* Vite
* Tailwind CSS
* shadcn/ui

### Backend

* Node.js + Express
* google-spreadsheet
* google-auth-library
* nodemailer
* dotenv

### Storage

* Google Sheets (Primary)
* JSON file (`retries.json`) as fallback

---

## 📂 Project Structure

```
empower-connect/
├── src/                  # React frontend
├── public/
├── server.js             # Backend (Express)
├── sendEmail.js          # Email service
├── retryService.js       # Retry logic
├── retries.json          # Failed entries storage
├── .env
├── package.json
├── vite.config.ts
```

---

## ⚙️ Setup & Installation

### 1. Clone Repository

```bash
git clone <repo-url>
cd empower-connect
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create `.env` file:

```env
PORT=5000

# Google Sheets
GOOGLE_SHEET_ID=your_sheet_id
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}

# Email
MAIL_USER=yourgmail@gmail.com
MAIL_PASS=your_app_password
MAIL_TO=admin@gmail.com
```

### Important Notes:

* `GOOGLE_SERVICE_ACCOUNT_KEY` should be a **stringified JSON**
* Share your Google Sheet with the service account email
---

## ▶️ Running the Application

### Development (Frontend only)

```bash
npm run dev
```

### Full Application

```bash
npm start
```

Access:

```
http://localhost:5000
```

---

## 📊 Google Sheets Integration

* Acts as a lightweight database
* Each request creates a new row
* Columns:

```
Timestamp | Name | Email | Phone | Message
```

---

## 📧 Email Notification

* Triggered on every registration
* Sent to admin (`MAIL_TO`)
* Mandatory step (request fails if email fails)

---

## 🔁 Retry Mechanism (Important)

If Google Sheets fails:

1. Data is stored in:

```
retries.json
```

2. Background job runs every hour:

```
setInterval(...)
```

3. It:

* Reads pending entries
* Tries to resend to Google Sheets
* Removes successful entries
* Keeps failed ones

👉 Ensures **no data loss**

---

## 🎨 Frontend Structure

Main sections:

* Header
* HeroSection
* AboutSection
* FeaturesSection
* ProcessSection
* ContactSection
* Footer

Entry point:

```
src/pages/Index.tsx
```

---

## 🔄 Backend Processing Flow

1. Validate input
2. Create entry object
3. Send email
4. Save to Google Sheets
5. If fail → store locally
6. Retry job syncs later

---
## 📧 Email Setup (Gmail App Password)

This project sends an email notification to the website maintainer whenever a user registers.  
To enable email functionality, you must configure a Gmail account using an **App Password**.

---

### ❗ Important

You **cannot use your normal Gmail password**.  
Google blocks direct login from applications for security reasons.

You must use a **Gmail App Password** instead.

---

### 🔐 Step 1: Enable 2-Step Verification

1. Go to your Google Account:  
   https://myaccount.google.com/security  
2. Enable **2-Step Verification**

---

### 🔑 Step 2: Generate App Password

1. Open:  
   https://myaccount.google.com/apppasswords  
2. Select:
   - App → **Mail**
   - Device → **Other (Custom name)** → Enter: `Node App`
3. Click **Generate**

You will receive a 16-character password like:

```
abcd efgh ijkl mnop
```

---

### ⚙️ Step 3: Add to `.env`

Remove spaces and add to your `.env` file:

```env
MAIL_USER=yourgmail@gmail.com
MAIL_PASS=abcdefghijklmnop
MAIL_TO=admin@gmail.com
```

---

### 📌 Explanation

- `MAIL_USER` → Gmail account used to send emails  
- `MAIL_PASS` → App Password (**NOT your real password**)  
- `MAIL_TO` → Email address that will receive notifications  

---

## 🛠️ Google Sheets Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click on the project dropdown at the top
   - Click "NEW PROJECT"
   - Enter project name (e.g., "Empower Connect")
   - Click "CREATE"

### 2. Enable Required APIs

1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - **Google Sheets API**: Click "Enable"
   - **Google Drive API**: Click "Enable"

### 3. Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Service account name: `empower-connect-service`
   - Service account ID: Auto-filled
   - Click "CREATE AND CONTINUE"
4. Grant roles:
   - Role: "Editor" (to allow sheet access)
   - Click "CONTINUE"
5. Click "DONE"

### 4. Create and Download Service Account Key

1. Go to "APIs & Services" > "Credentials"
2. Under "Service Accounts", click on the newly created account
3. Go to "KEYS" tab
4. Click "Add Key" > "Create new key"
5. Choose "JSON" format
6. Click "CREATE" - the JSON file will download

### 5. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Registrations" or similar
4. Share it with the service account email:
   - Click "Share"
   - Copy the `client_email` from the downloaded JSON file
   - Paste it in the share dialog
   - Give "Editor" permissions
   - Click "Share"

### 6. Configure Environment Variables

1. Open `backend/.env`
2. Fill in the variables:

```env
PORT=5000

# Paste the entire JSON key as a single line (no newlines)
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"xxx","private_key_id":"xxx","private_key":"-----BEGIN PRIVATE KEY-----\nxxx\n-----END PRIVATE KEY-----\n","client_email":"xxx@xxx.iam.gserviceaccount.com","client_id":"xxx","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/xxx%40xxx.iam.gserviceaccount.com"}

# Get the sheet ID from the URL
# https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
GOOGLE_SHEET_ID=1abc-xyz123
```

---

## 🧪 Troubleshooting

### Sheets API not enabled

* Enable in Google Cloud Console

### Permission issues

* Share sheet with service account email

### Invalid JSON key

* Must be single-line in `.env`

### Email not sending

* Use Gmail App Password
* Ensure 2FA is enabled

---
