# Florilege Quick Start Guide

Get up and running in 15 minutes.

## Prerequisites

- A Notion account (free)
- A GitHub account (free)
- A Vercel account (free) - for website
- OR Chrome browser - for extension

## Step 1: Set Up Notion (5 minutes)

### Create Database

1. Open Notion
2. Create a new page called "Florilege Content"
3. Type `/table` → Select "Table - Full page"

### Add Properties

Click "+" to add these properties (exact names):

- **Title** (already exists) - Title type
- **Type** - Select type with options: `text`, `image`, `image_text`, `video`, `audio`, `tweet`, `link`
- **Content** - Text type
- **ImageURL** - URL type
- **Attribution** - Text type
- **LearnMoreURL** - URL type
- **Active** - Checkbox type

### Add Sample Content

Add one test entry:
- Title: "Test"
- Type: `text`
- Content: "The journey of a thousand miles begins with a single step."
- Attribution: "Lao Tzu"
- Active: ✓ (checked)

### Create Integration

1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name: "Florilege"
4. Submit
5. **Copy the Integration Token** (starts with `secret_`)

### Connect to Database

1. Open your database in Notion
2. Click "•••" (top right)
3. "Add connections" → Select "Florilege"
4. Confirm

### Get Database ID

1. Look at your browser URL while viewing the database
2. Copy the 32-character ID between workspace name and `?`
   - Example: `notion.so/workspace/THIS_IS_THE_ID?v=...`

---

## Step 2A: Deploy Website (10 minutes)

### Push to GitHub

```bash
cd florilege/website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/florilege.git
git push -u origin main
```

### Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import your `florilege` repository
5. **Add Environment Variables**:
   - `NOTION_API_KEY` = your integration token
   - `NOTION_DATABASE_ID` = your database ID
6. Click "Deploy"
7. Wait ~30 seconds
8. Click "Visit" to see your site!

**Done!** Press spacebar to shuffle content.

---

## Step 2B: Install Extension (5 minutes)

### Load Extension

1. Download/clone this repository
2. Open Chrome
3. Go to `chrome://extensions/`
4. Toggle "Developer mode" (top right)
5. Click "Load unpacked"
6. Select the `florilege/extension` folder

### Configure Extension

1. Right-click the Florilege icon
2. Select "Options"
3. Enter:
   - **Notion Integration Token**: your `secret_...` token
   - **Notion Database ID**: your 32-character ID
4. Click "Save Settings"

### Test

1. Open a new tab (Cmd+T or Ctrl+T)
2. You should see your test content!
3. Press spacebar to shuffle

**Done!**

---

## Step 3: Add More Content (ongoing)

Go back to your Notion database and add more entries:

### Text Quote Example
- Type: `text`
- Content: "Be yourself; everyone else is already taken."
- Attribution: Oscar Wilde
- Active: ✓

### Image Example
- Type: `image`
- ImageURL: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4`
- Attribution: Unsplash
- Active: ✓

### YouTube Video Example
- Type: `video`
- Content: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Attribution: YouTube
- Active: ✓

---

## Troubleshooting

### "No content available"
- Check that at least one entry has Active ✓ checked
- Verify property names are exact (case-sensitive)

### "Failed to fetch"
- Verify Integration Token and Database ID are correct
- Check integration is connected to database
- For website: check Vercel environment variables

### Extension: "Configure credentials"
- Go to extension Options
- Enter your Notion credentials
- Click "Clear Cache" and refresh

---

## Next Steps

- Add 10-20 pieces of content for variety
- Customize colors and fonts (see [docs/CUSTOMIZE.md](docs/CUSTOMIZE.md))
- Mix different content types (text, images, videos)
- Use Active checkbox to curate seasonally

---

## Full Documentation

- **Notion Setup**: [docs/NOTION-SETUP.md](docs/NOTION-SETUP.md)
- **Website Deployment**: [docs/DEPLOY.md](docs/DEPLOY.md)
- **Extension Install**: [docs/EXTENSION.md](docs/EXTENSION.md)
- **Customization**: [docs/CUSTOMIZE.md](docs/CUSTOMIZE.md)

---

**Enjoy your personal oracle!** ✨
