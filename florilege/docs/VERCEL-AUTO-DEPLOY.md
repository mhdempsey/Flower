# Setting Up Vercel Auto-Deploy

If Vercel isn't automatically deploying when you push to GitHub, follow these steps:

## Check GitHub Integration

1. Go to https://vercel.com/dashboard
2. Click on your Florilege project
3. Go to **Settings** → **Git**
4. Check if GitHub is connected - you should see:
   - **Git Provider**: GitHub
   - **Repository**: mhdempsey/Flower
   - **Production Branch**: claude/build-florilege-oracle-zllkC

### If GitHub is NOT connected:

1. Click **"Connect Git Repository"**
2. Select GitHub
3. Authorize Vercel to access your repository
4. Select `mhdempsey/Flower`
5. Set Production Branch to `claude/build-florilege-oracle-zllkC`

## Enable Auto-Deployments

1. Still in **Settings** → **Git**
2. Make sure these are enabled:
   - ✅ **Production Branch** - Deploy every push to your production branch
   - ✅ **Preview Branches** - Deploy every push to other branches (optional)

## Check Ignored Build Step

1. Go to **Settings** → **Git**
2. Scroll to **"Ignored Build Step"**
3. Make sure it's set to **empty** or the default

If you see a custom command here, remove it (that might be blocking builds).

## Manual Deploy for Now

Until auto-deploy is set up, you can manually deploy:

1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Or click **"Deploy"** dropdown → **"Create deployment"**

## Test Auto-Deploy

After setting up the GitHub connection:

1. Make a small change to any file (like adding a comment)
2. Commit and push to GitHub
3. Check Vercel **Deployments** tab
4. You should see a new deployment start automatically within 10-20 seconds

## Alternative: Use Vercel CLI

If you prefer manual control:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Go to your website folder
cd florilege/website

# Deploy to production
vercel --prod
```

This uploads directly without going through GitHub.

## Troubleshooting

**"No Git Integration Found"**
- Go to Settings → Git → Connect Git Repository
- Select GitHub and authorize

**Deployments not triggering**
- Check that you're pushing to the correct branch
- Verify the branch name matches in Settings → Git → Production Branch
- Make sure Vercel has permission to access your repository

**"Build cancelled" or "Ignored build"**
- Check Settings → Git → Ignored Build Step is empty
- Make sure there's no `vercel-build-ignore.sh` in your repo

**Want to change the production branch?**
1. Settings → Git → Production Branch
2. Change to `main` or whichever branch you prefer
3. Merge your changes to that branch

## Current Setup

Your current configuration:
- Repository: `mhdempsey/Flower`
- Branch: `claude/build-florilege-oracle-zllkC`
- Root Directory: `florilege/website`
- When you push to this branch, Vercel should auto-deploy

If it's still not working after following these steps, check your email - Vercel might have sent notifications about failed deployments or permission issues.
