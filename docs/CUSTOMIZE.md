# Customizing Florilege

This guide covers how to customize colors, fonts, and host your own images.

## Changing Colors

Both the website and extension use CSS variables for easy customization.

### Color Variables

Open `style.css` (in both `website/` and `extension/` folders) and find the `:root` section:

```css
:root {
    /* Colors */
    --bg-color: #faf9f7;          /* Background */
    --text-color: #1a1a1a;        /* Main text */
    --text-muted: #666666;        /* Secondary text */
    --text-subtle: #999999;       /* Subtle text */
    --link-color: #1a1a1a;        /* Link color */
    --link-hover: #444444;        /* Link hover */
}
```

### Example Color Schemes

**Dark Mode:**
```css
:root {
    --bg-color: #1a1a1a;
    --text-color: #f5f5f5;
    --text-muted: #999999;
    --text-subtle: #666666;
    --link-color: #f5f5f5;
    --link-hover: #cccccc;
}
```

**Warm Sepia:**
```css
:root {
    --bg-color: #f4efe4;
    --text-color: #3d3225;
    --text-muted: #6b5f4f;
    --text-subtle: #9a8c7a;
}
```

**Cool Blue:**
```css
:root {
    --bg-color: #f5f7fa;
    --text-color: #1e2a3a;
    --text-muted: #4a5568;
    --text-subtle: #8494a7;
}
```

## Changing Fonts

### Default Fonts

Florilege uses:
- **Newsreader** (serif) - for content/quotes
- **Inter** (sans-serif) - for UI elements

### Using Different Google Fonts

1. Go to [fonts.google.com](https://fonts.google.com)
2. Select your fonts
3. Copy the `<link>` code

4. Update `index.html` / `newtab.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500&display=swap" rel="stylesheet">
```

5. Update `style.css`:
```css
:root {
    --font-serif: 'YourSerifFont', Georgia, serif;
    --font-sans: 'YourSansFont', -apple-system, sans-serif;
}
```

### Recommended Font Pairings

**Classic Elegance:**
- Serif: Playfair Display
- Sans: Source Sans Pro

**Modern Minimal:**
- Serif: Libre Baskerville
- Sans: Work Sans

**Friendly Warmth:**
- Serif: Lora
- Sans: Nunito

**Editorial Style:**
- Serif: Spectral
- Sans: IBM Plex Sans

## Hosting Images in GitHub

You can host images directly in this repository.

### Step 1: Add Images

1. Add images to the `images/` folder
2. Use descriptive names: `sunset-mountains.jpg`

### Step 2: Get Raw URLs

After pushing to GitHub:
1. Navigate to your image in the repository
2. Click the image file
3. Click **"Raw"** button
4. Copy the URL, it looks like:
   ```
   https://raw.githubusercontent.com/username/repo/main/images/sunset-mountains.jpg
   ```

### Step 3: Use in Notion

Paste the raw GitHub URL in the **ImageURL** field of your Notion database.

### Image Tips

- **Optimize images** before uploading (use [squoosh.app](https://squoosh.app))
- **Recommended size**: 800-1200px wide
- **Formats**: JPG for photos, PNG for graphics
- **Keep file sizes** under 500KB for fast loading

## Adjusting Typography

### Text Size

In `style.css`, modify these values:

```css
/* Quote text size */
.content-text {
    font-size: 1.75rem;  /* Normal quotes */
}

.content-text.short {
    font-size: 2.25rem;  /* Short quotes (larger) */
}

/* Short text threshold (in script.js) */
shortTextThreshold: 150,  /* Characters */
```

### Line Height

```css
.content-text {
    line-height: 1.5;  /* Adjust for readability */
}
```

### Content Width

```css
:root {
    --content-max-width: 800px;  /* Max width for images/video */
}

.content-text {
    max-width: 600px;  /* Max width for text */
}
```

## Adjusting Transitions

### Fade Duration

In `style.css`:
```css
:root {
    --fade-duration: 0.4s;  /* Adjust timing */
}
```

In `script.js`:
```js
fadeDuration: 400,  /* Match CSS (in milliseconds) */
```

### Hint Delay

In `script.js`:
```js
hintDelay: 3000,  /* Time before showing "press space" hint */
```

## Hiding Elements

### Hide Branding

In `style.css`:
```css
.branding {
    display: none;
}
```

### Hide Interaction Hint

In `style.css`:
```css
.hint {
    display: none;
}
```

### Hide on Mobile

```css
@media (max-width: 768px) {
    .branding,
    .hint {
        display: none;
    }
}
```

## Advanced Customization

### Adding a Background Image

```css
body {
    background-image: url('your-image-url');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

/* Add overlay for readability */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(250, 249, 247, 0.9);
    z-index: -1;
}
```

### Adding Animation to Content

```css
.oracle-content {
    animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

## Remember to Update Both!

When customizing:
- Update `website/style.css` for the website
- Update `extension/style.css` for the Chrome extension
- Keep them in sync for a consistent experience

---

[← Back to Setup](NOTION-SETUP.md)
