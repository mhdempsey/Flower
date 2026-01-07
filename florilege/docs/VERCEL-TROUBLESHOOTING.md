# Vercel Deployment Troubleshooting

## Step 1: Check the Error Logs

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on one of your Florilege projects
3. Go to the **"Deployments"** tab
4. Click on the failed deployment (it will have a red ❌)
5. Scroll down to see the **Build Logs** or **Error Message**

**Common errors and fixes:**

### Error: "Cannot find module '@notionhq/client'"

**Problem**: The `package.json` file isn't in the right place or Vercel can't find it.

**Fix**:
1. Make sure your GitHub repo structure is:
   ```
   your-repo/
   └── florilege/
       └── website/
           ├── package.json  ← Must be here
           ├── index.html
           ├── api/
           └── vercel.json
   ```

2. In Vercel project settings:
   - Go to **Settings** → **General**
   - Set **Root Directory** to `florilege/website`
   - Click **Save**
   - Go to **Deployments** tab
   - Click **"Redeploy"** on the latest deployment

### Error: "Environment variable NOTION_API_KEY is not defined"

**Problem**: Environment variables aren't set.

**Fix**:
1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. Add both:
   - `NOTION_API_KEY` = your secret_... token
   - `NOTION_DATABASE_ID` = your 32-char database ID
4. Make sure they're enabled for **Production**, **Preview**, and **Development**
5. **Redeploy**

### Error: "No such file or directory: index.html"

**Problem**: Vercel is looking in the wrong directory.

**Fix**: Set the Root Directory (see above)

### Error: "Build failed" or "Command failed"

**Problem**: Usually a configuration issue.

**Fix**:
1. In **Settings** → **General**:
   - **Root Directory**: `florilege/website` (or wherever your website folder is)
   - **Framework Preset**: Other
   - **Build Command**: Leave blank
   - **Output Directory**: Leave blank
   - **Install Command**: `npm install` (should be automatic)

2. Save and redeploy

---

## Step 2: Clean Up Duplicate Projects

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. You should see both projects listed
3. Click on the one you DON'T want to use
4. Go to **Settings** → **General**
5. Scroll all the way down to **"Delete Project"**
6. Click it and confirm deletion
7. Keep the one you want to use

---

## Step 3: Fresh Deployment (If needed)

If both projects are broken, let's start fresh:

### Delete Both Projects
1. Delete both Vercel projects (Settings → Delete Project)

### Re-import Correctly
1. From Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find your GitHub repo
3. Click **"Import"**
4. **IMPORTANT**: Set **Root Directory** to `florilege/website`
5. Add environment variables:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
6. Click **"Deploy"**

---

## Step 4: Verify Your GitHub Repo Structure

Your repo should look like this:

```
your-repo-name/
└── florilege/
    └── website/
        ├── index.html
        ├── style.css
        ├── script.js
        ├── package.json
        ├── vercel.json
        ├── .env.example
        └── api/
            └── content.js
```

**Check on GitHub**:
1. Go to your repo on GitHub
2. Navigate to `florilege/website/`
3. Make sure `package.json` and `vercel.json` are there

---

## Step 5: Test Locally First (Optional)

Install Vercel CLI to test locally:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Go to website folder
cd florilege/website

# Set environment variables locally
# Create .env.local and add:
# NOTION_API_KEY=secret_...
# NOTION_DATABASE_ID=...

# Run locally
vercel dev
```

Visit `http://localhost:3000` - if it works locally, it should work on Vercel.

---

## What to Tell Me

Can you share:

1. **The error message from Vercel**:
   - Go to failed deployment → Copy the error message from build logs

2. **Your GitHub repo structure**:
   - Where is `package.json` located in your repo?

3. **Your Vercel settings**:
   - What is "Root Directory" set to?
   - Are environment variables set?

I'll help you fix it based on the specific error!

---

## Quick Fixes Checklist

- [ ] Root Directory is set to `florilege/website` (not just `florilege` or blank)
- [ ] Environment variables `NOTION_API_KEY` and `NOTION_DATABASE_ID` are set
- [ ] Both env vars are enabled for Production, Preview, Development
- [ ] `package.json` exists in the `website` folder
- [ ] `vercel.json` exists in the `website` folder
- [ ] GitHub repo has been pushed successfully
- [ ] Notion integration is connected to your database
- [ ] At least one entry in Notion has Active ✓ checked
