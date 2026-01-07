# Deploying Florilege to Vercel

This guide will help you deploy the Florilege website to Vercel for free.

## Prerequisites

- A GitHub account
- A Vercel account (free) - sign up at [vercel.com](https://vercel.com)
- Your Notion Integration Token and Database ID (see [NOTION-SETUP.md](NOTION-SETUP.md))

## Step 1: Push Code to GitHub

If you haven't already, push the `website` folder to a GitHub repository:

```bash
cd florilege/website
git init
git add .
git commit -m "Initial commit - Florilege website"
git branch -M main
git remote add origin https://github.com/yourusername/florilege.git
git push -u origin main
```

## Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** for easiest integration
4. Authorize Vercel to access your GitHub account

## Step 3: Import Your Project

1. From the Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find your `florilege` repository in the list
3. Click **"Import"**

## Step 4: Configure Build Settings

Vercel should automatically detect the configuration from `vercel.json`, but verify:

- **Framework Preset**: Other
- **Root Directory**: `./` (leave as default)
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)

## Step 5: Add Environment Variables

Before deploying, add your Notion credentials:

1. Scroll down to **"Environment Variables"**
2. Add these two variables:

   **Variable 1:**
   - Name: `NOTION_API_KEY`
   - Value: Your Notion Integration Token (starts with `secret_`)

   **Variable 2:**
   - Name: `NOTION_DATABASE_ID`
   - Value: Your 32-character database ID

3. Make sure variables are available for **Production**, **Preview**, and **Development**

## Step 6: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 30-60 seconds)
3. Vercel will show you a success screen with your live URL

## Step 7: Test Your Deployment

1. Click the **"Visit"** button or go to your assigned URL (e.g., `florilege.vercel.app`)
2. You should see one of your Notion entries displayed
3. Press **Spacebar** to shuffle to another piece of content
4. If you see an error, check the logs in Vercel dashboard

## Step 8: Custom Domain (Optional)

To use your own domain:

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `florilege.yourdomain.com`)
4. Follow Vercel's instructions to configure DNS
5. Wait for DNS propagation (can take up to 48 hours)

## Updating Your Site

Every time you push changes to GitHub, Vercel will automatically rebuild and deploy:

```bash
# Make changes to your files
git add .
git commit -m "Update styles"
git push
```

Vercel will:
- Detect the push
- Build automatically
- Deploy to production
- Keep your previous deployments available

## Manual Redeploy

To trigger a redeploy without code changes (e.g., to refresh Notion content):

1. Go to Vercel dashboard
2. Click on your project
3. Go to the **"Deployments"** tab
4. Find the latest deployment
5. Click **"•••"** → **"Redeploy"**

## Troubleshooting

### "Failed to fetch content" Error

**Check environment variables:**
1. Go to Vercel dashboard → Your project → **Settings** → **Environment Variables**
2. Verify `NOTION_API_KEY` and `NOTION_DATABASE_ID` are set correctly
3. Make sure there are no extra spaces
4. Redeploy after fixing

**Check Notion integration:**
- Verify the integration has access to your database
- Check that at least one entry has Active ✓ checked

### Build Fails

**"Cannot find module @notionhq/client"**
- Make sure `package.json` is in your repository
- Vercel should auto-install dependencies
- Check the build logs for specific errors

### Content Not Updating

**Cache issue:**
- Vercel might be caching the API responses
- Try a hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Trigger a manual redeploy

### API Route Not Working

**Check vercel.json:**
- Make sure `vercel.json` is in the root of your repository
- Verify the routes configuration is correct
- Check build logs for routing errors

## Vercel CLI (Advanced)

For local development and advanced deployment:

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```

### Local Development
```bash
cd website
vercel dev
```

This runs your site locally with:
- Serverless function support
- Environment variables from Vercel
- Live reloading

### Manual Deploy
```bash
vercel --prod
```

## File Structure

Your deployed site will have:

```
/
├── index.html          → Main page
├── style.css           → Styles
├── script.js           → Client-side logic
└── /api
    └── content.js      → Serverless function (Notion API)
```

## Cost

Vercel's free Hobby tier includes:
- Unlimited personal projects
- HTTPS & CDN
- 100GB bandwidth/month
- Serverless function execution

This is more than enough for personal use. If you exceed limits, Vercel will notify you.

## Next Steps

- **Customize the design**: See [CUSTOMIZE.md](CUSTOMIZE.md)
- **Install the Chrome extension**: See [EXTENSION.md](EXTENSION.md)
- **Add more content** to your Notion database

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
