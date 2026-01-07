# 🌸 Florilege

> *A personal oracle that surfaces curated content when you need it most*

**Florilege** (French: "anthology" or "collection of flowers") is a minimalist content surfacing system that displays random pieces of curated content from your Notion database. Available as both a website and Chrome extension.

![Florilege Preview](https://via.placeholder.com/800x400/faf9f7/1a1a1a?text=Florilege)

## ✨ Features

- **Beautiful & Minimal**: Inspired by collected.li, minimalmaxims.com, and goodbyejohndoe.com
- **Multiple Content Types**: Text, images, videos, audio, tweets, and links
- **Notion-Powered**: Manage all content in a simple Notion database
- **Two Experiences**:
  - 🌐 **Website**: Deploy to Vercel, share with anyone
  - 🔖 **Chrome Extension**: Replace your new tab page
- **Offline Support**: Extension caches content for offline access
- **Privacy-First**: No tracking, no analytics, your data stays yours
- **Easy to Customize**: Change colors, fonts, and layout with simple CSS edits

## 🎨 Aesthetic

- Single piece of content, centered on the page
- Serif font for content (Newsreader), sans-serif for UI (Inter)
- Off-white background (#faf9f7), near-black text (#1a1a1a)
- Generous whitespace
- Subtle fade transitions
- Keyboard-driven (spacebar to shuffle)

## 📦 What's Included

```
florilege/
├── website/              # Web app deployable to Vercel
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── api/
│   │   └── content.js    # Notion API proxy
│   ├── vercel.json
│   └── package.json
│
├── extension/            # Chrome extension
│   ├── manifest.json
│   ├── newtab.html
│   ├── options.html
│   ├── script.js
│   ├── options.js
│   ├── style.css
│   └── images/          # Extension icons
│
└── docs/                # Comprehensive guides
    ├── NOTION-SETUP.md  # Setting up Notion database
    ├── DEPLOY.md        # Deploying to Vercel
    ├── EXTENSION.md     # Installing Chrome extension
    └── CUSTOMIZE.md     # Customization guide
```

## 🚀 Quick Start

### 1. Set Up Notion Database

Create a Notion database with these properties:

| Property | Type | Description |
|----------|------|-------------|
| **Title** | Title | Optional label for content |
| **Type** | Select | `text`, `image`, `image_text`, `video`, `audio`, `tweet`, `link` |
| **Content** | Text | Main text or URL |
| **ImageURL** | URL | External image URL |
| **Attribution** | Text | Source/author |
| **LearnMoreURL** | URL | Optional link |
| **Active** | Checkbox | Only show if checked |

See [docs/NOTION-SETUP.md](docs/NOTION-SETUP.md) for detailed instructions.

### 2. Choose Your Platform

#### Option A: Website

1. Push the `website` folder to GitHub
2. Deploy to Vercel (free)
3. Add Notion credentials as environment variables
4. Visit your live site!

See [docs/DEPLOY.md](docs/DEPLOY.md) for step-by-step guide.

#### Option B: Chrome Extension

1. Load the `extension` folder in Chrome
2. Configure Notion credentials in extension settings
3. Open a new tab to see your content

See [docs/EXTENSION.md](docs/EXTENSION.md) for installation guide.

### 3. Add Sample Content

Here are 5 entries to test your setup:

#### 1. Philosophical Quote
- Type: `text`
- Content: "The only way to do great work is to love what you do."
- Attribution: Steve Jobs
- Active: ✓

#### 2. Beautiful Image
- Type: `image`
- ImageURL: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4`
- Attribution: Unsplash
- Active: ✓

#### 3. Image + Caption
- Type: `image_text`
- Content: "Not all who wander are lost."
- ImageURL: `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b`
- Attribution: J.R.R. Tolkien
- Active: ✓

#### 4. YouTube Video
- Type: `video`
- Content: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Attribution: YouTube
- Active: ✓

#### 5. Spotify Track
- Type: `audio`
- Content: `https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl`
- Attribution: Spotify
- Active: ✓

## 🎯 Content Types

| Type | Best For | What It Shows |
|------|----------|---------------|
| `text` | Quotes, poems, thoughts | Large, beautiful typography |
| `image` | Photography, art | Centered image, max 800px |
| `image_text` | Captioned images | Image above, caption below |
| `video` | YouTube, Vimeo | Embedded player, 16:9 |
| `audio` | Spotify tracks | Spotify embed player |
| `tweet` | Twitter/X posts | Link to tweet |
| `link` | Articles, websites | Clickable card |

## ⚙️ Customization

Florilege is designed to be easy to customize. Change:

- **Colors**: Edit background and text colors
- **Fonts**: Swap Google Fonts or use system fonts
- **Spacing**: Adjust padding and margins
- **Animations**: Speed up, slow down, or disable
- **Footer**: Change or remove branding

See [docs/CUSTOMIZE.md](docs/CUSTOMIZE.md) for detailed customization guide.

## 🔧 Technology

- **Frontend**: Vanilla HTML, CSS, JavaScript (no frameworks!)
- **Backend**: Vercel Serverless Functions
- **Database**: Notion API
- **Deployment**: Vercel (free tier)
- **Extension**: Chrome Extension Manifest V3

## 📖 Documentation

- **[NOTION-SETUP.md](docs/NOTION-SETUP.md)**: Create and configure your Notion database
- **[DEPLOY.md](docs/DEPLOY.md)**: Deploy the website to Vercel
- **[EXTENSION.md](docs/EXTENSION.md)**: Install and configure the Chrome extension
- **[CUSTOMIZE.md](docs/CUSTOMIZE.md)**: Customize colors, fonts, and layout

## 🤔 Why Florilege?

In an age of algorithmic feeds and endless scrolling, Florilege brings back **intentional curation**.

- Curate content that matters to you
- Rediscover forgotten wisdom
- One thing at a time, no distractions
- Your personal oracle, always available

## 🛠️ Development

### Website Local Development
```bash
cd website
npm install
vercel dev
```

Visit `http://localhost:3000`

### Extension Development
1. Make changes to `extension/` files
2. Go to `chrome://extensions/`
3. Click reload (⟳) on Florilege
4. Open new tab to test

## 🔒 Privacy

- **No tracking**: No analytics, no telemetry
- **Your data**: Everything stays in your Notion and browser
- **Open source**: Inspect the code, modify as you wish
- **No server**: Extension talks directly to Notion API

## 📝 License

MIT License - feel free to use, modify, and share!

## 🌟 Inspiration

- [collected.li](https://collected.li) - Minimalist quote display
- [minimalmaxims.com](https://minimalmaxims.com) - Daily maxims
- [goodbyejohndoe.com](https://goodbyejohndoe.com) - Clean design aesthetic
- The concept of a "personal oracle" - algorithmic serendipity meets intentional curation

## 🤝 Contributing

This is a personal project, but feel free to:
- Fork and customize for your own use
- Share your customizations
- Report bugs or suggest improvements
- Create your own content curation system inspired by this

## 💡 Ideas for Content

- **Quotes**: Philosophical, motivational, funny
- **Images**: Art, photography, memes
- **Music**: Favorite tracks, albums to revisit
- **Videos**: TED talks, music videos, tutorials
- **Poems**: Favorite verses, haikus
- **Links**: Articles to read, projects to check out
- **Reminders**: Personal mantras, goals, values
- **Memories**: Photos with captions, journal entries

## 🙏 Credits

Built with:
- [Notion API](https://developers.notion.com/)
- [Google Fonts](https://fonts.google.com/) (Newsreader, Inter)
- [Vercel](https://vercel.com/) for hosting
- Inspired by minimalist web design and the serendipity of random discovery

---

**Start curating your personal oracle today.** ✨

For questions or issues, see the documentation in the `docs/` folder.
