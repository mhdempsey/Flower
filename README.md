# Florilege

A personal oracle — a minimalist content surfacing system that displays random curated pieces from your Notion database.

Inspired by [collected.li](https://collected.li), [minimalmaxims.com](https://minimalmaxims.com), and [goodbyejohndoe.com](https://goodbyejohndoe.com).

## What is Florilege?

*Florilège* (French): a collection of flowers, an anthology of literary excerpts.

Each visit shows you a random piece of curated content — a quote, image, video, or song — floating peacefully in the center of your screen. Press space for another.

## Features

- **Website** — Deploy to Vercel, works on any device
- **Chrome Extension** — Replace your new tab with curated content
- **7 Content Types** — Text, images, video, audio, tweets, and links
- **Notion-Powered** — Manage content in a simple database
- **Minimal Design** — Beautiful typography, generous whitespace
- **Offline Support** — Extension caches content locally

## Content Types

| Type | Description |
|------|-------------|
| `text` | Styled blockquote with beautiful typography |
| `image` | Centered image |
| `image_text` | Image with caption below |
| `video` | YouTube or Vimeo embed |
| `audio` | Spotify embed player |
| `tweet` | Embedded tweet |
| `link` | Clean card with title and description |

## Quick Start

### 1. Set Up Notion

1. Create a [Notion integration](https://www.notion.so/my-integrations)
2. Create a database with required properties
3. Share the database with your integration
4. Add some content and mark as Active

→ [Detailed Notion Setup Guide](docs/NOTION-SETUP.md)

### 2. Deploy Website

1. Fork this repository
2. Connect to [Vercel](https://vercel.com)
3. Set root directory to `website`
4. Add environment variables:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
5. Deploy!

→ [Detailed Deploy Guide](docs/DEPLOY.md)

### 3. Install Extension

1. Go to `chrome://extensions`
2. Enable Developer mode
3. Load unpacked → select `extension` folder
4. Enter your Notion credentials in settings

→ [Detailed Extension Guide](docs/EXTENSION.md)

## Notion Database Structure

| Property | Type | Description |
|----------|------|-------------|
| Title | Title | Optional label above content |
| Type | Select | `text`, `image`, `image_text`, `video`, `audio`, `tweet`, `link` |
| Content | Text | Main text or embed URL |
| ImageURL | URL | External image URL |
| Attribution | Text | Source/author credit |
| LearnMoreURL | URL | "Learn more →" link |
| Active | Checkbox | Only shows if checked |

## Project Structure

```
/website
  index.html          # Main page
  style.css           # Styles
  script.js           # Client-side logic
  vercel.json         # Vercel configuration
  /api
    content.js        # Serverless API proxy

/extension
  manifest.json       # Chrome extension manifest
  newtab.html         # New tab page
  style.css           # Extension styles
  script.js           # Extension logic
  options.html        # Settings page
  options.js          # Settings logic
  /icons              # Extension icons

/images               # Self-hosted images
/docs                 # Documentation
```

## Customization

- [Change colors and fonts](docs/CUSTOMIZE.md)
- [Host your own images](docs/CUSTOMIZE.md#hosting-images-in-github)

## Design Principles

- Single piece of content, dead center
- Serif font (Newsreader) for content
- Sans-serif font (Inter) for UI
- Off-white background (#faf9f7)
- Near-black text (#1a1a1a)
- Subtle fade transitions
- Nothing competes for attention

## License

MIT
