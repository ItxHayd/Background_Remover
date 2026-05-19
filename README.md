# 🖼️ Background Remover App

A simple and fast web-based background remover tool built using a modern serverless architecture. Users can upload an image, remove its background using an API, preview the result, and download the final PNG.

---

## 🚀 Live Demo
👉 https://itxhayd.github.io (replace with your deployed link)

---

## ✨ Features

- 📤 Upload image from device
- 👀 Instant image preview
- 🧠 AI-powered background removal
- 🖼️ Clean processed result display
- ⬇️ Download output as PNG
- ⚡ Serverless backend using Cloudflare Workers

---

## 🧱 Tech Stack

**Frontend**
- HTML5
- Tailwind CSS
- Vanilla JavaScript

**Backend**
- Cloudflare Workers
- remove.bg API

---

## ⚙️ How It Works

User uploads image → Preview shown → Image sent to Worker → Worker calls remove.bg API → Returns processed image → Frontend displays result & enables download

---

## 📁 Project Structure
/frontend
├── index.html
├── app.js
├── output.css

/cloudflare-worker
├── worker.js

---

## 🔌 API Endpoint

### `POST /bg-remover`

#### Request
- `file` → image file (FormData)

#### Response
- PNG image with background removed

---

## 🧠 What I Learned

- Cloudflare Workers fundamentals
- Handling file uploads in JavaScript
- Integrating third-party AI APIs
- Managing CORS in serverless environments
- Building full-stack apps without traditional backend servers

---

## ⚠️ Important Notes

- Requires a valid remove.bg API key
- API usage may be rate-limited depending on plan
- Large images may take longer to process

---

## 🚀 Future Improvements(OPEN to contributions)

- Drag & drop upload
- Loading spinner / progress indicator
- Before/after slider comparison
- Image history gallery
- Replace external API with open-source AI model backend

---

## 👨‍💻 Author

**Hayd**  
