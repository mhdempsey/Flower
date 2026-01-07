# Editor's Note Feature

The Florilege system now supports an optional "Editor's Note" field for each piece of content.

## Notion Database Setup

Add a new property to your Notion database:

**Property Name**: `EditorNote`
**Property Type**: Text (Rich Text)

This field is **optional** - if left empty, no editor's note will be displayed.

## How It Works

When viewing content that has an editor's note:

1. Below the title, you'll see "editor's note" in italics
2. Click on "editor's note" to expand and read the note
3. Click again to collapse it

## Use Cases

- **Context**: Provide background information about the piece
- **Personal reflection**: Add your thoughts on why this matters
- **Updates**: Note changes since you first saved this content
- **Warnings**: Alert about content that may be outdated
- **Connections**: Link this piece to other ideas or content

## Example

**Title**: The Power of Habits

**EditorNote**:
```
I first read this in 2019 during a difficult transition period. The concept of "keystone habits" completely changed how I approach personal change. Re-reading in 2024, it still holds up but feels less revolutionary now that these ideas are mainstream.
```

**Content**: "We are what we repeatedly do. Excellence, then, is not an act, but a habit."

**Attribution**: Aristotle

## Styling

The editor's note appears in:
- **Font**: Adobe Caslon Pro (same as body text)
- **Size**: Slightly smaller than main content (0.95rem)
- **Style**: Italic
- **Color**: Muted gray (#555)
- **Position**: Between title and main content
- **Expandable**: Hidden by default, click to reveal

## Tips

- Keep notes concise (1-3 sentences ideal)
- Use for context that enhances but isn't essential
- Great for timestamp-sensitive information
- Perfect for capturing "why I saved this"
- Add connections to other pieces in your collection

## Technical Details

The editor's note:
- Supports line breaks (preserved as entered in Notion)
- Expands/collapses with smooth CSS transition
- Works on both website and Chrome extension
- Cached along with other content in extension
- Optional field - works fine if left empty
