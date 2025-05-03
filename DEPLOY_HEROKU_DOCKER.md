# Unified Messaging API – Deployment Instructions

## 🚀 Deploying to Heroku (Node.js)

1. Clone the repo:
```bash
git clone https://github.com/yourusername/unified-messaging-api.git
cd unified-messaging-api
```

2. Login and create app:
```bash
heroku login
heroku create unified-messaging-api
```

3. Push the repo:
```bash
git init
heroku git:remote -a unified-messaging-api
git add .
git commit -m "Initial commit"
git push heroku master
```

4. Set environment variables:
```bash
heroku config:set AUTH_TOKEN=your_token
heroku config:set ENCRYPTION_SECRET=your_secret
# ... repeat for Twilio, Telegram, etc.
```

---

## 🐳 Deploying via Docker

1. Build and run locally:
```bash
docker build -t unified-messaging-api .
docker run -p 3000:3000 --env-file .env unified-messaging-api
```

2. Deploy to server:
```bash
docker tag unified-messaging-api yourrepo/unified-messaging-api:latest
docker push yourrepo/unified-messaging-api:latest
```

3. On VPS or cloud:
```bash
docker pull yourrepo/unified-messaging-api:latest
docker run -d -p 80:3000 --env-file .env yourrepo/unified-messaging-api:latest
```

---

## ✅ Health Check

After deployment, verify:
```bash
curl https://yourdomain.com/health
```

You should receive:
```json
{ "status": "ok", "timestamp": "..." }
```

---

MIT License • Created by Jesse Veils for Neon Covenant