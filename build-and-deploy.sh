#!/bin/bash

# PlexiShop Complete Build & Deploy Script

echo ">>> Installing Firebase CLI..."
npm install -g firebase-tools

echo ">>> Logging into Firebase..."
firebase login

echo ">>> Initializing Firebase project..."
firebase init functions hosting

echo ">>> Setting environment variables..."
firebase functions:config:set \
  stripe.secret="sk_live_YOUR_STRIPE_KEY" \
  stripe.webhook="whsec_YOUR_STRIPE_WEBHOOK_SECRET" \
  coinbase.key="YOUR_COINBASE_COMMERCE_API_KEY" \
  telegram.token="YOUR_TELEGRAM_BOT_TOKEN"

echo ">>> Installing dependencies in functions..."
cd server/functions
npm install
cd ../../

echo ">>> Deploying to Firebase (functions + hosting)..."
firebase deploy --only functions,hosting

echo ">>> Deployment complete. Your PlexiShop is now live!"
