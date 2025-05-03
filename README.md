# PlexiShop Launcher – Production Deployment

**PlexiShop** is a Telegram Mini App storefront engine built for digital creators to sell content, subscriptions, and more using Stripe, Coinbase, and real-time call-to-action (CTA) technology.

---

## Features

- Telegram WebApp (Mini App) storefront UI
- Firebase backend with Cloud Functions
- Stripe integration for secure payments
- Coinbase Commerce integration for crypto
- Real-time CTA link generator
- Telegram bot notifications
- Dynamic QR code generation
- GitHub CI/CD deployment via Firebase

---

## Setup Instructions

### 1. Firebase Initialization

Install Firebase tools:

```bash
npm install -g firebase-tools
firebase login
firebase init functions hosting
```

**Choose:**
- Language: JavaScript
- Enable ESLint: Yes
- Hosting directory: `public`
- Configure as SPA: Yes

---

### 2. Set Firebase Environment Config

```bash
firebase functions:config:set \
  stripe.secret="sk_live_YOUR_STRIPE_KEY" \
  stripe.webhook="whsec_YOUR_STRIPE_WEBHOOK_SECRET" \
  coinbase.key="YOUR_COINBASE_COMMERCE_API_KEY" \
  telegram.token="YOUR_TELEGRAM_BOT_TOKEN"
```

To verify:
```bash
firebase functions:config:get
```

---

### 3. Deploy

```bash
firebase deploy --only functions,hosting
```

Your app will be live on Firebase Hosting with all cloud functions active.

---

## GitHub CI/CD Workflow

Included at `.github/workflows/firebase.yml`

To use:
- Generate Firebase token with: `firebase login:ci`
- Add token to GitHub repository secrets as `FIREBASE_TOKEN`

Every push to `main` will deploy your app automatically.

---

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/generate-cta` | Generate a PlexiShop link with CTA |
| POST | `/create-coinbase-payment` | Create crypto charge |
| POST | `/webhook/stripe` | Handle Stripe payment webhooks |
| GET | `/generate-qr` | Return base64 QR image for a CTA |

---

## Project Structure

```
plexishop-launcher/
├── client/                  # Telegram WebApp UI
├── public/                  # Firebase hosting frontend
├── server/functions/        # Firebase Functions
│   ├── index.js             # Main Express entry
│   ├── stripe.js            # Stripe payment webhook
│   ├── coinbase.js          # Coinbase charge logic
│   ├── telegram.js          # Telegram message utility
│   └── qrcode.js            # QR code generator
├── .github/workflows/       # CI/CD workflow
│   └── firebase.yml
├── .env.example             # Env variable reference
├── firebase.json            # Firebase config
└── README.md                # This file
```

---

## License

MIT © 2025 Neon Covenant Inc. / Plexilicious Def
