# 🛠️ Fix Vercel 404 Error - Step-by-Step

Your app is currently "Not Found" because Vercel is looking at the root folder, but your app is inside the `client` folder. Follow these steps exactly:

### 1. Go to Project Settings
Open your project in the [Vercel Dashboard](https://vercel.com/dashboard) and click on the **Settings** tab at the top.

### 2. Change the Root Directory
In the **General** section (the first page), look for **Root Directory**.
- Click **Edit**.
- Type in `client`.
- Click **Save**.

### 3. Trigger a Re-deployment
Vercel might not automatically re-deploy.
- Go to the **Deployments** tab.
- Click the three dots `...` next to your latest deployment.
- Select **Redeploy**.

---

### 🔍 Why this works:
1. **Monorepo Structure**: Since you have both `client` and `server` folders, Vercel needs to be told which one contains the frontend.
2. **SPA Routing**: The `vercel.json` I pushed earlier will now be "seen" by Vercel once it starts looking inside the `client` folder. This fixes 404s when you refresh the page.

### 🐼 Need more help?
If you still see the error after these 3 steps, check if the **Build Command** is set to `npm run build` (it usually is by default).
