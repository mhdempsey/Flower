# Customizing Florilege

This guide shows you how to customize the look and feel of Florilege to match your personal aesthetic.

## Table of Contents
- [Colors](#colors)
- [Fonts](#fonts)
- [Typography Sizes](#typography-sizes)
- [Spacing and Layout](#spacing-and-layout)
- [Transitions](#transitions)
- [Footer Text](#footer-text)
- [Hosting Images](#hosting-images)

---

## Colors

### Background and Text Colors

**File**: `style.css` (same for website and extension)

```css
/* Around line 17 */
body {
    background-color: #faf9f7;  /* Off-white background */
    color: #1a1a1a;             /* Near-black text */
}
```

**Popular Color Schemes**:

1. **Dark Mode**:
   ```css
   background-color: #1a1a1a;  /* Dark background */
   color: #faf9f7;             /* Light text */
   ```

2. **Pure Minimal**:
   ```css
   background-color: #ffffff;  /* Pure white */
   color: #000000;             /* Pure black */
   ```

3. **Warm Cream**:
   ```css
   background-color: #f5f1e8;  /* Warm cream */
   color: #2d2d2d;             /* Soft black */
   ```

4. **Cool Gray**:
   ```css
   background-color: #f0f2f5;  /* Cool gray */
   color: #1c1e21;             /* Facebook-style dark */
   ```

### Accent Colors

**Labels** (around line 46):
```css
.content-label {
    color: #666;  /* Change to match your theme */
}
```

**Links** (around line 144):
```css
.content-learn-more a {
    color: #666;           /* Default link color */
}

.content-learn-more a:hover {
    color: #1a1a1a;       /* Hover color */
    border-bottom-color: #1a1a1a;
}
```

**Footer** (around line 157):
```css
footer {
    color: #ccc;  /* Footer text color */
}
```

---

## Fonts

### Changing Font Families

**Website**: Edit `index.html` (around line 7)

**Extension**: Edit `newtab.html` (around line 7)

```html
<!-- Current setup -->
<link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@300;400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

**Popular Font Combinations**:

1. **Classic Serif**:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600&family=Work+Sans:wght@400;500&display=swap" rel="stylesheet">
   ```
   Then in CSS:
   ```css
   .content-text { font-family: 'Crimson Text', Georgia, serif; }
   body { font-family: 'Work Sans', sans-serif; }
   ```

2. **Modern Sans**:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
   ```
   Then in CSS:
   ```css
   .content-text { font-family: 'Inter', sans-serif; }
   body { font-family: 'Inter', sans-serif; }
   ```

3. **Elegant & Minimal**:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400&family=Lato:wght@300;400&display=swap" rel="stylesheet">
   ```
   Then in CSS:
   ```css
   .content-text { font-family: 'Libre Baskerville', serif; }
   body { font-family: 'Lato', sans-serif; }
   ```

4. **Typewriter Style**:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
   ```
   Then in CSS:
   ```css
   .content-text { font-family: 'Courier Prime', monospace; }
   ```

### System Fonts (No External Loading)

```css
/* In style.css */
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.content-text {
    font-family: Georgia, 'Times New Roman', serif;
}
```

---

## Typography Sizes

**File**: `style.css`

### Content Text Sizes

```css
/* Around line 56 - Default text */
.content-text {
    font-size: 1.75rem;  /* 28px - Change this */
    line-height: 1.6;
}

/* Around line 62 - Large text (for short quotes) */
.content-text.large {
    font-size: 2.25rem;  /* 36px - Change this */
    line-height: 1.5;
}
```

**Suggested sizes**:
- Subtle: `1.5rem` and `2rem`
- Default: `1.75rem` and `2.25rem` (current)
- Bold: `2rem` and `2.75rem`
- Dramatic: `2.5rem` and `3.5rem`

### Other Text Elements

```css
/* Content labels */
.content-label {
    font-size: 0.75rem;  /* Small uppercase label */
}

/* Attribution */
.content-attribution {
    font-size: 0.875rem;  /* Source/author */
}

/* Learn more link */
.content-learn-more a {
    font-size: 0.875rem;
}
```

---

## Spacing and Layout

### Maximum Content Width

```css
/* Around line 32 */
#content-container {
    max-width: 900px;  /* Change to make wider/narrower */
}
```

Try:
- Narrow: `700px`
- Default: `900px`
- Wide: `1200px`

### Padding Around Content

```css
/* Around line 17 */
body {
    padding: 2rem;  /* Space around edges */
}
```

### Vertical Spacing

```css
/* Around line 51 */
.content-main {
    margin: 2rem 0;  /* Space above/below main content */
}

/* Around line 118 */
.content-attribution {
    margin-top: 2rem;  /* Space before attribution */
}
```

---

## Transitions

### Fade Speed

```css
/* Around line 40-41 */
.fade-in {
    animation: fadeIn 0.6s ease-in;  /* Slower: 0.8s, Faster: 0.4s */
}

.fade-out {
    animation: fadeOut 0.3s ease-out;  /* Slower: 0.5s, Faster: 0.2s */
}
```

### Disable Transitions

```css
/* Remove or comment out animations */
.fade-in {
    /* animation: fadeIn 0.6s ease-in; */
    opacity: 1;
}

.fade-out {
    /* animation: fadeOut 0.3s ease-out; */
    opacity: 0;
}
```

### Custom Animation

```css
/* Add at the bottom of style.css */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.fade-in {
    animation: slideIn 0.6s ease-out;
}
```

---

## Footer Text

### Change "Florilege" Branding

**File**: `index.html` or `newtab.html` (around line 17)

```html
<!-- Current -->
<span class="branding">Florilege</span>

<!-- Change to anything -->
<span class="branding">My Oracle</span>
<span class="branding">Daily Dose</span>
<span class="branding">Inspiration</span>
```

### Change Instruction Text

```html
<!-- Current -->
<span class="instruction">Press spacebar for new content</span>

<!-- Alternatives -->
<span class="instruction">Press space to shuffle</span>
<span class="instruction">Space for more</span>
<span class="instruction">Shuffle with spacebar</span>
```

### Remove Footer Entirely

**File**: `style.css`

```css
/* Around line 157 */
footer {
    display: none;  /* Add this line */
}
```

---

## Hosting Images

Instead of using external URLs, you can host images in your repository.

### For Website (Vercel)

1. **Create an images folder**:
   ```
   website/
   ├── images/
   │   ├── photo1.jpg
   │   ├── photo2.jpg
   │   └── artwork.png
   ```

2. **In Notion, use relative URLs**:
   - ImageURL: `/images/photo1.jpg`
   - Or full URL: `https://yourdomain.vercel.app/images/photo1.jpg`

3. **Commit and push to GitHub**:
   ```bash
   git add website/images
   git commit -m "Add images"
   git push
   ```

4. Vercel will automatically serve them

### For Chrome Extension

1. **Create images folder**:
   ```
   extension/
   ├── images/
   │   └── content/
   │       ├── photo1.jpg
   │       └── photo2.jpg
   ```

2. **Update manifest.json** to allow file access:
   ```json
   "web_accessible_resources": [
     {
       "resources": ["images/content/*"],
       "matches": ["<all_urls>"]
     }
   ]
   ```

3. **In Notion, use extension URLs**:
   - ImageURL: `chrome-extension://__MSG_@@extension_id__/images/content/photo1.jpg`
   - Or use a script to convert relative paths

**Note**: Using external URLs (Unsplash, Imgur, GitHub) is usually easier.

### Using GitHub for Images

1. **Upload to your repo**:
   ```
   florilege/
   └── images/
       └── content/
           └── photo.jpg
   ```

2. **Get the raw URL**:
   - Push to GitHub
   - Navigate to the file
   - Click "Raw"
   - Copy the URL: `https://raw.githubusercontent.com/username/repo/main/images/content/photo.jpg`

3. **Use in Notion**:
   - Paste the raw URL in ImageURL field

---

## Mobile Responsive Adjustments

### Tablet Sizes

```css
/* Around line 178 */
@media (max-width: 768px) {
    body {
        padding: 1.5rem;  /* Less padding on tablet */
    }

    .content-text {
        font-size: 1.35rem;  /* Smaller text */
    }
}
```

### Phone Sizes

```css
/* Around line 195 */
@media (max-width: 480px) {
    .content-text {
        font-size: 1.15rem;  /* Even smaller */
    }
}
```

---

## Advanced Customizations

### Add a Subtle Texture

```css
/* In style.css, around line 17 */
body {
    background-color: #faf9f7;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><circle fill="rgba(0,0,0,0.02)" cx="16" cy="16" r="1"/></svg>');
}
```

### Add a Gradient Background

```css
body {
    background: linear-gradient(135deg, #faf9f7 0%, #f0ebe5 100%);
}
```

### Rounded Corners on Images

```css
/* Around line 69 */
.content-image {
    border-radius: 8px;  /* Add rounded corners */
}
```

### Drop Shadow on Content

```css
.content-main {
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.05));
}
```

---

## Testing Changes

### For Website
1. Edit `website/style.css` or `website/index.html`
2. Commit and push to GitHub
3. Vercel auto-deploys in ~30 seconds
4. Refresh your site

### For Extension
1. Edit `extension/style.css` or `extension/newtab.html`
2. Go to `chrome://extensions/`
3. Click reload (⟳) on Florilege
4. Open new tab to see changes

---

## Tips

- **Start small**: Change one thing at a time
- **Use browser DevTools**: Press F12 to experiment live
- **Save backups**: Keep copies of files before major changes
- **Test on mobile**: Check how it looks on different screen sizes
- **Consistency**: Keep the same colors/fonts across all elements

## Examples from Similar Sites

- **collected.li**: Pure white, black text, Tiempos font
- **minimalmaxims.com**: Off-white, large serif quotes
- **goodbyejohndoe.com**: Dark mode, sans-serif, tight spacing

## Need Help?

If you break something:
1. Check browser console (F12) for errors
2. Compare with original files
3. Restore from backup
4. Start fresh and apply changes incrementally
