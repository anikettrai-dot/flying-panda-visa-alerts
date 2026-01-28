# ☁️ Backend Deployment Guide (Render)

The "Failed to fetch" error occurs because your frontend is on Vercel, but your backend is still only running on your computer (`localhost`). You need to put your backend on the cloud too!

I recommend **Render.com** (it's free and easy).

### 1. Create a New Web Service on Render
1. Go to [Render.com](https://render.com) and sign up with GitHub.
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository.

### 2. Configure the Service
- **Name**: `flying-panda-server`
- **Root Directory**: `server`
- **Language**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node index.js`
- **Plan**: Select the **Free** tier.

### 3. Connect to Vercel
Once Render finishes deploying, it will give you a URL (like `https://flying-panda-server.onrender.com`).

1. Copy that URL.
2. Go to your **Vercel Dashboard**.
3. Go to **Settings > Environment Variables**.
4. Add a new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-render-url.onrender.com/alerts` (Make sure it ends with `/alerts`)
5. **Redeploy** your Vercel project.

---

### ✅ Summary of what I fixed:
1. I updated your code to look for the `VITE_API_URL` environment variable.
2. Once you set that variable in Vercel, your app will stop looking at `localhost` and start talking to your live backend! 🐼🚀
