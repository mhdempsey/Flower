# Deploying Florilege to Vercel

This guide walks you through deploying your Florilege website to Vercel.

## Prerequisites

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free tier works fine)
- Your Notion API key and Database ID (see [NOTION-SETUP.md](NOTION-SETUP.md))

## Step 1: Fork or Push to GitHub

### Option A: Fork this repository
1. Click "Fork" on this repository
2. Clone your fork locally if you want to customize

### Option B: Create a new repository
1. Create a new repository on GitHub
2. Push the `website` folder contents to it

## Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect the framework

## Step 3: Configure Project Settings

In the Vercel project settings:

### Root Directory
Set to: `website`

### Build Settings
- **Framework Preset**: Other
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)

## Step 4: Add Environment Variables

This is the most important step!

1. Go to your project **Settings** → **Environment Variables**
2. Add these two variables:

| Name | Value |
|------|-------|
| `NOTION_API_KEY` | Your secret_... token |
| `NOTION_DATABASE_ID` | Your 32-character database ID |

3. Make sure both are available for **Production**, **Preview**, and **Development**

## Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually ~30 seconds)
3. Click the generated URL to see your site!

## Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

## Updating Content

Your content updates automatically from Notion! Just:
1. Add or edit items in your Notion database
2. Toggle the **Active** checkbox
3. Refresh your Florilege site

The API caches content for 1 minute, so changes appear quickly.

## Redeploying

If you make changes to the code:
1. Push changes to GitHub
2. Vercel automatically redeploys

Or manually:
1. Go to your Vercel dashboard
2. Click **"Redeploy"**

## Troubleshooting

### "Server configuration error"
- Check that environment variables are set correctly
- Ensure there are no extra spaces in your keys

### "Failed to fetch content"
- Verify your Notion integration has access to the database
- Test your API key in Notion's API reference

### API not working
- Check the Vercel function logs: **Deployments** → **Functions** → **content**
- Look for error messages in the logs

### Blank page
- Open browser developer tools (F12)
- Check the Console tab for errors
- Check the Network tab to see API responses

## Security Notes

- Your Notion API key is stored securely in Vercel environment variables
- It's never exposed to the browser
- The serverless function acts as a secure proxy

---

Next: [Install Chrome Extension →](EXTENSION.md)
