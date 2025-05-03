
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Auth Middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== process.env.AUTH_TOKEN) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
}

// AES-256 Encryption Middleware (dummy passthrough for demo)
function encryptionMiddleware(req, res, next) {
  // Extend to encrypt/decrypt sensitive fields
  next();
}

// Handlers
function sendMessageHandler(req, res) {
  const { to, platform, message } = req.body;
  res.json({ status: "sent", platform_used: platform, to, message });
}

function telegramWebhookHandler(req, res) {
  const body = req.body;
  if (body.message) {
    const logEntry = {
      chat_id: body.message.chat.id,
      text: body.message.text,
      timestamp: new Date().toISOString()
    };
    const logs = fs.existsSync("telegram_users_db.json")
      ? JSON.parse(fs.readFileSync("telegram_users_db.json"))
      : { telegram_users: [] };

    logs.telegram_users.push(logEntry);
    fs.writeFileSync("telegram_users_db.json", JSON.stringify(logs, null, 2));
  }
  res.sendStatus(200);
}

function healthCheckHandler(req, res) {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
}

// Routes
app.post("/send-message", authMiddleware, encryptionMiddleware, sendMessageHandler);
app.post("/telegram/webhook", telegramWebhookHandler);
app.get("/health", healthCheckHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Unified Messaging API running on port ${PORT}`);
});
