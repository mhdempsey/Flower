# Setting Up Your Notion Database

This guide walks you through creating and configuring your Florilege Notion database.

## Step 1: Create a Notion Integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Give it a name (e.g., "Florilege")
4. Select your workspace
5. Click **"Submit"**
6. Copy the **"Internal Integration Token"** (starts with `secret_`)
7. Save this token securely - you'll need it later

## Step 2: Create Your Database

1. Create a new page in Notion
2. Type `/database` and select **"Database - Full page"**
3. Name it whatever you like (e.g., "Florilege Content" or "Oracle")

## Step 3: Set Up Database Properties

Add these properties to your database (exact names matter!):

| Property Name | Type | Description |
|--------------|------|-------------|
| **Title** | Title | Optional label shown above content |
| **Type** | Select | Content type (see options below) |
| **Content** | Text | Main text content OR embed URL |
| **ImageURL** | URL | External image URL |
| **Attribution** | Text | Source/author credit |
| **LearnMoreURL** | URL | Link for "learn more →" |
| **Active** | Checkbox | Only shows when checked ✓ |

### Type Options

Create these select options for the **Type** property:

- `text` - Text quotes or passages
- `image` - Image only
- `image_text` - Image with caption below
- `video` - YouTube or Vimeo URL
- `audio` - Spotify URL
- `tweet` - Twitter/X URL
- `link` - Link card

## Step 4: Share Database with Integration

**This step is critical!**

1. Open your database page
2. Click **"Share"** (top right)
3. Click **"Invite"**
4. Search for your integration name
5. Click to add it
6. Ensure it has **"Can edit"** access

## Step 5: Get Your Database ID

1. Open your database in Notion
2. Look at the URL in your browser:
   ```
   https://www.notion.so/yourworkspace/abc123def456...?v=...
   ```
3. The Database ID is the 32-character string after your workspace name
4. Copy this ID (just the letters and numbers, no dashes needed)

## Sample Content to Get Started

Here are 5 test entries to add to your database:

### Entry 1: Text Quote
- **Title**: wisdom
- **Type**: text
- **Content**: We do not remember days, we remember moments. The richness of life lies in memories we have forgotten.
- **Attribution**: Cesare Pavese
- **Active**: ✓

### Entry 2: Image
- **Title**:
- **Type**: image
- **ImageURL**: https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800
- **Attribution**: Photo by Samuel Ferrara
- **LearnMoreURL**: https://unsplash.com/photos/1527pjeb6jg
- **Active**: ✓

### Entry 3: Image with Caption
- **Title**: reflection
- **Type**: image_text
- **Content**: The quieter you become, the more you can hear.
- **ImageURL**: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800
- **Attribution**: Ram Dass
- **Active**: ✓

### Entry 4: YouTube Video
- **Title**: watch
- **Type**: video
- **Content**: https://www.youtube.com/watch?v=LXb3EKWsInQ
- **Attribution**: KEXP
- **LearnMoreURL**: https://kexp.org
- **Active**: ✓

### Entry 5: Spotify Track
- **Title**: listen
- **Type**: audio
- **Content**: https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb
- **Attribution**: Nils Frahm - Says
- **LearnMoreURL**: https://www.nilsfrahm.com
- **Active**: ✓

## Tips

- **Use the Active checkbox** to control what appears without deleting content
- **Leave Title empty** for a cleaner look when the content speaks for itself
- **External images work best** - use Unsplash, GitHub raw URLs, or other hosted images
- **Test your URLs** before adding them to make sure embeds work

## Troubleshooting

### "Database not found" error
- Make sure you've shared the database with your integration
- Double-check the database ID

### "Invalid API key" error
- Ensure you copied the full token starting with `secret_`
- Check there are no extra spaces

### Content not showing
- Make sure items have the **Active** checkbox checked
- Verify the **Type** property matches one of the valid options
- Check that Content or ImageURL has a value

---

Next: [Deploy to Vercel →](DEPLOY.md)
