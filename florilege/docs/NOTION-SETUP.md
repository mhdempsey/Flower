# Setting Up Your Notion Database

This guide will walk you through setting up a Notion database for Florilege.

## Step 1: Create a New Notion Page

1. Open Notion and create a new page
2. Name it "Florilege Content" (or whatever you prefer)
3. Add a database by typing `/table` and selecting "Table - Full page"

## Step 2: Set Up Database Properties

Your database needs these exact properties (case-sensitive):

### Required Properties:

1. **Title** (default - already exists)
   - Type: Title
   - This is the optional label that appears above your content

2. **Type**
   - Type: Select
   - Options: `text`, `image`, `image_text`, `video`, `audio`, `tweet`, `link`
   - Add all these options to the select dropdown

3. **Content**
   - Type: Text
   - For text content: the actual quote/text
   - For media: the URL (YouTube, Spotify, etc.)
   - For links: the destination URL

4. **ImageURL**
   - Type: URL
   - External image URLs (GitHub, Unsplash, Imgur, etc.)
   - Required for `image` and `image_text` types

5. **Attribution**
   - Type: Text
   - Source, author, or description

6. **LearnMoreURL**
   - Type: URL
   - Optional link for "learn more →"

7. **Active**
   - Type: Checkbox
   - Only checked items will be displayed
   - Useful for drafts and seasonal content

## Step 3: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Give it a name: "Florilege"
4. Select the workspace where your database lives
5. Click **"Submit"**
6. Copy the **"Internal Integration Token"** (starts with `secret_`)
   - ⚠️ Keep this secret! Don't share it publicly

## Step 4: Connect Integration to Database

1. Open your Florilege Content database in Notion
2. Click the **"•••"** menu in the top right
3. Scroll down and click **"Add connections"**
4. Search for and select your "Florilege" integration
5. Click **"Confirm"**

## Step 5: Get Your Database ID

1. While viewing your database, look at the URL in your browser
2. The URL looks like: `https://www.notion.so/{workspace}/{database_id}?v=...`
3. The database ID is the 32-character code between your workspace name and the `?`
   - Example: `https://www.notion.so/myworkspace/a1b2c3d4e5f6...?v=...`
   - Database ID: `a1b2c3d4e5f6...` (32 characters, no dashes)

## Sample Content Entries

Add these 5 sample entries to test your setup:

### Entry 1: Philosophical Quote (Text)
- **Title**: Leave blank or "Wisdom"
- **Type**: `text`
- **Content**: "The only way to do great work is to love what you do."
- **Attribution**: Steve Jobs
- **Active**: ✓ Checked

### Entry 2: Beautiful Image (Image)
- **Title**: Leave blank or "Nature"
- **Type**: `image`
- **ImageURL**: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4`
- **Attribution**: Unsplash
- **Active**: ✓ Checked

### Entry 3: Image with Caption (Image + Text)
- **Title**: "Mountains"
- **Type**: `image_text`
- **Content**: "Not all who wander are lost."
- **ImageURL**: `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b`
- **Attribution**: J.R.R. Tolkien
- **Active**: ✓ Checked

### Entry 4: YouTube Video (Video)
- **Title**: "Inspiration"
- **Type**: `video`
- **Content**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` (or any YouTube URL)
- **Attribution**: YouTube
- **Active**: ✓ Checked

### Entry 5: Spotify Track (Audio)
- **Title**: "Music"
- **Type**: `audio`
- **Content**: `https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl` (or any Spotify track URL)
- **Attribution**: Spotify
- **Active**: ✓ Checked

## Content Type Guide

### Text Only
- Best for: quotes, poems, short thoughts
- Shows: large, beautiful typography

### Image Only
- Best for: photography, art, visual inspiration
- Shows: centered image, max 800px wide

### Image + Text
- Best for: captioned images, illustrated quotes
- Shows: image above, text below

### Video
- Best for: YouTube or Vimeo videos
- Shows: embedded player, 16:9 aspect ratio

### Audio
- Best for: Spotify tracks, albums, playlists
- Shows: Spotify embed player

### Tweet
- Best for: Twitter/X posts
- Shows: link to tweet (simplified version)

### Link
- Best for: articles, websites
- Shows: clickable card with title and description

## Tips

- Start with 10-20 pieces of content
- Mix different content types for variety
- Use the Active checkbox to curate what's shown
- Update regularly to keep content fresh
- You can uncheck Active to "retire" seasonal content without deleting it

## Troubleshooting

**"Failed to fetch content"**
- Check that your integration has access to the database
- Verify the database ID is correct (32 characters)
- Make sure at least one entry has Active checked

**Content not appearing**
- Ensure property names match exactly (case-sensitive)
- Check that Active checkbox is checked
- Verify Type is spelled correctly (`text`, not `Text`)

**Images not loading**
- Use direct image URLs (not Notion's internal URLs)
- Try Unsplash, GitHub raw URLs, or Imgur
- Make sure URLs start with `https://`

## Next Steps

Once your database is set up:
- **For website**: See [DEPLOY.md](DEPLOY.md)
- **For extension**: See [EXTENSION.md](EXTENSION.md)
