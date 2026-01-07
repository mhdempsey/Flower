# Extension Icons

This folder should contain the following icon files for the Chrome extension:

- `icon16.png` - 16x16 pixels
- `icon48.png` - 48x48 pixels
- `icon128.png` - 128x128 pixels

## Creating Icons

### Quick Option: Use Placeholder

You can use any small square PNG images temporarily. Just rename them to the sizes above.

### Create Custom Icons

**Online Tools**:
1. [Favicon.io](https://favicon.io/favicon-generator/) - Generate simple letter/emoji icons
2. [Canva](https://www.canva.com/) - Create custom graphics
3. [Figma](https://www.figma.com/) - Design professional icons

**Design Tips**:
- Keep it simple and recognizable at small sizes
- Use a symbol, letter, or emoji
- Match the Florilege aesthetic (minimal, clean)
- PNG format with transparent background
- Ideas: Letter "F", flower symbol, book icon, star

### Using Favicon.io (Easiest)

1. Go to https://favicon.io/favicon-generator/
2. Settings:
   - Text: "F" or "🌸"
   - Background: #faf9f7 (or transparent)
   - Font Color: #1a1a1a
   - Font: Your choice (try "Newsreader" or "Inter")
   - Shape: Square
3. Download the generated pack
4. Extract and copy the PNG files to this folder
5. Rename them to match the required sizes

### Temporary Placeholder

If you don't have icons yet, you can temporarily remove the icon references from `manifest.json`:

```json
{
  "icons": {
    "16": "images/icon16.png",
    "48": "images/icon48.png",
    "128": "images/icon128.png"
  }
}
```

Just comment out or remove the `"icons"` section to load the extension without icons.
