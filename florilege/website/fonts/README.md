# Using Custom Fonts in Florilege

This folder is for custom font files that you want to use in your Florilege website.

## Quick Start

### 1. Add Your Font Files

Place your font files in this `/fonts` folder. Supported formats:
- `.woff2` (best, smallest file size)
- `.woff` (good fallback)
- `.ttf` (TrueType, works but larger)

**Example:**
```
/fonts/
  ├── Antiqua.woff2
  ├── Antiqua.woff
  ├── Antiqua.ttf
  └── custom-fonts.css
```

### 2. Convert TTF to WOFF/WOFF2 (Optional but Recommended)

For best performance, convert your `.ttf` files to `.woff2`:

**Online converters:**
- https://cloudconvert.com/ttf-to-woff2
- https://everythingfonts.com/ttf-to-woff2
- https://transfonter.org/

Upload your `.ttf` file and download the `.woff2` and `.woff` versions.

### 3. Edit custom-fonts.css

Open `/fonts/custom-fonts.css` and update the @font-face declarations:

```css
@font-face {
    font-family: 'Antiqua';  /* Your font name */
    src: url('/fonts/Antiqua.woff2') format('woff2'),
         url('/fonts/Antiqua.woff') format('woff'),
         url('/fonts/Antiqua.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
```

### 4. Use Your Font in CSS

In the same file, uncomment or add CSS rules to apply your font:

```css
/* Use Antiqua for "learn more" links */
.content-learn-more a {
    font-family: 'Antiqua', Georgia, serif;
}

/* Use Antiqua for all content text */
.content-text {
    font-family: 'Antiqua', Georgia, serif;
}

/* Use Antiqua for image captions */
.image-caption {
    font-family: 'Antiqua', Georgia, serif;
}
```

### 5. Deploy

Commit and push your changes:

```bash
git add florilege/website/fonts
git commit -m "Add custom Antiqua font"
git push
```

Vercel will automatically redeploy with your new fonts.

## Example: Adding Antiqua Font

Let's say you have `Antiqua.ttf`:

1. **Convert to web fonts** using https://transfonter.org/
   - Upload `Antiqua.ttf`
   - Check "WOFF2" and "WOFF"
   - Download and extract

2. **Place files in /fonts:**
   ```
   /fonts/
     ├── Antiqua.woff2
     ├── Antiqua.woff
     ├── Antiqua.ttf
   ```

3. **Edit custom-fonts.css:**
   ```css
   @font-face {
       font-family: 'Antiqua';
       src: url('/fonts/Antiqua.woff2') format('woff2'),
            url('/fonts/Antiqua.woff') format('woff'),
            url('/fonts/Antiqua.ttf') format('truetype');
       font-weight: normal;
       font-style: normal;
       font-display: swap;
   }

   .content-learn-more a {
       font-family: 'Antiqua', Georgia, serif;
   }
   ```

4. **Test locally** (optional):
   ```bash
   cd florilege/website
   vercel dev
   ```

5. **Deploy:**
   ```bash
   git add .
   git commit -m "Add Antiqua font for learn more links"
   git push
   ```

## Multiple Font Weights

If you have multiple weights (regular, bold, italic):

```css
/* Regular */
@font-face {
    font-family: 'Antiqua';
    src: url('/fonts/Antiqua-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

/* Bold */
@font-face {
    font-family: 'Antiqua';
    src: url('/fonts/Antiqua-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

/* Italic */
@font-face {
    font-family: 'Antiqua';
    src: url('/fonts/Antiqua-Italic.woff2') format('woff2');
    font-weight: 400;
    font-style: italic;
}
```

## Font Licensing

⚠️ **Important**: Make sure you have the right to use and distribute your font files on the web. Check the font's license:

- **Free fonts**: Google Fonts, Font Squirrel (filter by "webfont")
- **Paid fonts**: Check license allows web embedding
- **Custom fonts**: Get permission if not your own creation

## Troubleshooting

**Fonts not loading:**
1. Check file paths are correct (`/fonts/YourFont.woff2`)
2. Verify files are in the `/fonts` folder
3. Check browser console (F12) for 404 errors
4. Make sure fonts are committed to git
5. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

**Fonts look wrong:**
1. Check font-weight matches your font file
2. Try adding only one format (.woff2) for testing
3. Verify font-family name matches in CSS

**Performance issues:**
1. Use .woff2 format (smallest file size)
2. Remove unused font weights
3. Use `font-display: swap` to prevent blocking

## Where to Find Free Fonts

- **Google Fonts**: https://fonts.google.com (can download TTF)
- **Font Squirrel**: https://www.fontsquirrel.com (filter "webfont")
- **DaFont**: https://www.dafont.com (check license)
- **Adobe Fonts**: https://fonts.adobe.com (if you have subscription)

## For Chrome Extension

To use custom fonts in the extension, copy the same approach:

1. Create `/extension/fonts` folder
2. Add your font files
3. Create similar CSS file
4. Link in `newtab.html`
5. Reload extension in Chrome

Note: Font files need to be declared in `manifest.json` as web_accessible_resources for the extension.
