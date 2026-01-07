# Image & Quote Galleries

Florilege now supports displaying collections of images or quotes in beautiful grid layouts.

## Image Gallery

Display multiple images in a responsive grid format.

### Setup in Notion

1. **Type**: Select `image_gallery`
2. **Content**: Add image URLs, one per line. Example:
   ```
   https://images.unsplash.com/photo-1506905925346-21bda4d32df4
   https://images.unsplash.com/photo-1464822759023-fed622ff2c3b
   https://images.unsplash.com/photo-1506905925346-21bda4d32df4
   https://images.unsplash.com/photo-1501594907352-04cda38ebc29
   ```
3. **Title**: Optional title for the gallery
4. **Attribution**: Optional source credit

### Features

- **Responsive Grid**: Auto-adjusts to 2-3 columns on desktop, 1-2 on tablet, 1 on mobile
- **Fixed Height**: All images displayed at 300px height (200px on mobile)
- **Hover Effect**: Slight scale-up on hover
- **Object Fit**: Images are cropped to fit without distortion

## Quote Gallery

Display multiple quotes in an elegant card grid.

### Setup in Notion

1. **Type**: Select `quote_gallery`
2. **Content**: Add quotes separated by `---` or `|`. Example:
   ```
   The only way to do great work is to love what you do.
   ---
   Innovation distinguishes between a leader and a follower.
   ---
   Stay hungry, stay foolish.
   |
   Your time is limited, don't waste it living someone else's life.
   ```
3. **Title**: Optional title for the collection
4. **Attribution**: Optional - who said these quotes

### Features

- **Card Layout**: Each quote in its own card
- **Responsive Grid**: 2-3 columns on desktop, 1 on mobile
- **Styled Cards**:
  - Light gray background (#f9f9f9)
  - Deep blue left border accent (#1e3a8a)
  - Adobe Caslon Pro font at 1.25rem
  - Comfortable padding
- **Left Aligned**: Better readability for longer quotes

## Tips

### Image Gallery Tips

- **Best image sources**:
  - Unsplash (https://unsplash.com)
  - Your own images uploaded to GitHub
  - Any direct image URL (ends in .jpg, .png, etc.)

- **Recommended number of images**:
  - 4-6 images: Perfect grid
  - 9-12 images: Large collection
  - Odd numbers work fine (grid auto-adjusts)

- **Image quality**:
  - Use high-resolution images (at least 800px wide)
  - Landscape or square images work best
  - Mixed orientations okay (cropped to fit)

### Quote Gallery Tips

- **Separators**: Use either `---` or `|` consistently
  ```
  Quote 1
  ---
  Quote 2
  ---
  Quote 3
  ```
  OR
  ```
  Quote 1 | Quote 2 | Quote 3
  ```

- **Quote length**:
  - Short quotes (1-2 sentences): Best for grid layout
  - Medium quotes (3-4 sentences): Still looks good
  - Long quotes: Consider using single `text` type instead

- **Attribution**:
  - Put in Attribution field, not in quotes themselves
  - Will display below all quotes
  - Example: "Steve Jobs", "Marcus Aurelius", "Various"

## Use Cases

### Image Gallery
- Photography collections
- Travel memories from a trip
- Before/after transformations
- Product showcases
- Inspiration boards
- Art collections

### Quote Gallery
- Favorite quotes from a book
- Wisdom from a philosopher
- Motivational quotes theme
- Life lessons collection
- Daily affirmations
- Movie quotes compilation

## Example Setups

### Photography Collection

**Title**: "Iceland 2024"
**Type**: `image_gallery`
**Content**:
```
https://images.unsplash.com/photo-1583940003490-8e15c2c7e857
https://images.unsplash.com/photo-1504893524553-b855bce32c67
https://images.unsplash.com/photo-1476445704028-a36e0c798192
https://images.unsplash.com/photo-1531168556467-80aace0d0144
```
**Attribution**: "Personal travel photos"

### Stoic Wisdom

**Title**: "Marcus Aurelius - Meditations"
**Type**: `quote_gallery`
**Content**:
```
You have power over your mind - not outside events. Realize this, and you will find strength.
---
The happiness of your life depends upon the quality of your thoughts.
---
Waste no more time arguing about what a good man should be. Be one.
---
If it is not right, do not do it. If it is not true, do not say it.
```
**Attribution**: "Marcus Aurelius"

## Styling Customization

Want to change how galleries look? Edit `/fonts/custom-fonts.css`:

### Change Grid Columns
```css
.image-gallery {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Smaller images */
}
```

### Change Image Height
```css
.gallery-image {
    height: 400px; /* Taller images */
}
```

### Change Quote Card Background
```css
.gallery-quote {
    background-color: #ffffff; /* White background */
    border-left-color: #ff6b6b; /* Red accent */
}
```

### Change Quote Font Size
```css
.gallery-quote {
    font-size: 1.5rem; /* Larger text */
}
```

## Troubleshooting

**Images not loading**:
- Make sure URLs are direct image links (end in .jpg, .png, etc.)
- Test URLs in browser first
- Use HTTPS URLs only
- Avoid Notion internal image URLs

**Quotes displaying as one block**:
- Check you're using `---` or `|` as separator
- Make sure Type is set to `quote_gallery` exactly
- Try adding line breaks between quotes

**Gallery looks cramped on mobile**:
- This is normal - mobile shows 1 column
- Test on actual device, not just browser resize
- Consider using fewer items (4-6) for mobile-first collections

**Mixed layouts**:
- Can't mix images and quotes in one gallery
- Create separate entries for different types
- Use sidebar to navigate between related galleries

## Advanced: Hosting Your Own Images

Instead of external URLs, host images in your repo:

1. Create `/images` folder in your repo
2. Add your images there
3. Get GitHub raw URLs:
   ```
   https://raw.githubusercontent.com/username/repo/main/images/photo.jpg
   ```
4. Use these URLs in Content field

Benefits:
- Full control over images
- No external dependencies
- Works offline (in extension)
- Never breaks if external site changes
