/**
 * Florilege - Notion API Proxy
 *
 * Vercel serverless function that fetches content from a Notion database.
 * This keeps your Notion API key secure on the server side.
 *
 * Environment Variables Required:
 * - NOTION_API_KEY: Your Notion integration token
 * - NOTION_DATABASE_ID: The ID of your Florilege database
 */

// CORS headers for the response
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Cache-Control': 's-maxage=60, stale-while-revalidate=300', // Cache for 1 min, serve stale for 5 min
};

export default async function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).json({});
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Check for required environment variables
    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

    if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
        res.status(500).json({
            error: 'Server configuration error',
            message: 'NOTION_API_KEY and NOTION_DATABASE_ID must be set in environment variables'
        });
        return;
    }

    try {
        // Fetch from Notion API
        const notionResponse = await fetch(
            `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${NOTION_API_KEY}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filter: {
                        property: 'Active',
                        checkbox: {
                            equals: true
                        }
                    }
                })
            }
        );

        if (!notionResponse.ok) {
            const errorData = await notionResponse.json();
            console.error('Notion API error:', errorData);
            res.status(notionResponse.status).json({
                error: 'Notion API error',
                message: errorData.message || 'Failed to fetch from Notion'
            });
            return;
        }

        const data = await notionResponse.json();

        // Transform Notion data to our simpler format
        const items = data.results.map(page => transformNotionPage(page)).filter(Boolean);

        // Set headers and return
        Object.entries(headers).forEach(([key, value]) => {
            res.setHeader(key, value);
        });

        res.status(200).json({
            items,
            count: items.length,
            cached_at: new Date().toISOString()
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
}

/**
 * Transform a Notion page object to our content format
 */
function transformNotionPage(page) {
    try {
        const props = page.properties;

        // Extract properties with null safety
        const title = getNotionTitle(props.Title);
        const type = getNotionSelect(props.Type) || 'text';
        const content = getNotionRichText(props.Content);
        const imageUrl = getNotionUrl(props.ImageURL);
        const attribution = getNotionRichText(props.Attribution);
        const learnMoreUrl = getNotionUrl(props.LearnMoreURL);

        // Skip if no content
        if (!content && !imageUrl) {
            return null;
        }

        return {
            id: page.id,
            title,
            type,
            content,
            imageUrl,
            attribution,
            learnMoreUrl,
        };
    } catch (error) {
        console.error('Error transforming page:', page.id, error);
        return null;
    }
}

// ============================================
// Notion Property Extractors
// ============================================

function getNotionTitle(prop) {
    if (!prop || !prop.title || !prop.title.length) return '';
    return prop.title.map(t => t.plain_text).join('');
}

function getNotionRichText(prop) {
    if (!prop || !prop.rich_text || !prop.rich_text.length) return '';
    return prop.rich_text.map(t => t.plain_text).join('');
}

function getNotionSelect(prop) {
    if (!prop || !prop.select) return null;
    return prop.select.name;
}

function getNotionUrl(prop) {
    if (!prop || !prop.url) return '';
    return prop.url;
}
