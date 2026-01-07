/**
 * Vercel Serverless Function - Notion API Proxy
 * Fetches active content from Notion database and returns formatted data
 */

const { Client } = require('@notionhq/client');

// Initialize Notion client
// Set these as environment variables in Vercel
const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Check for required environment variables
        if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
            return res.status(500).json({
                error: 'Server configuration error',
                message: 'Please set NOTION_API_KEY and NOTION_DATABASE_ID environment variables'
            });
        }

        // Query Notion database for active content
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Active',
                checkbox: {
                    equals: true
                }
            }
        });

        // Transform Notion data to our format
        const content = response.results.map(page => {
            const props = page.properties;

            return {
                id: page.id,
                title: getPlainText(props.Title),
                type: getSelect(props.Type) || 'text',
                content: getPlainText(props.Content),
                imageUrl: getUrl(props.ImageURL),
                attribution: getPlainText(props.Attribution),
                learnMoreUrl: getUrl(props.LearnMoreURL),
                editorNote: getPlainText(props.EditorNote)
            };
        });

        // Return formatted content
        return res.status(200).json({
            content,
            count: content.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error fetching from Notion:', error);
        return res.status(500).json({
            error: 'Failed to fetch content',
            message: error.message
        });
    }
};

// Helper functions to extract data from Notion property objects
function getPlainText(property) {
    if (!property) return '';

    if (property.type === 'title' && property.title) {
        return property.title.map(t => t.plain_text).join('');
    }

    if (property.type === 'rich_text' && property.rich_text) {
        return property.rich_text.map(t => t.plain_text).join('');
    }

    return '';
}

function getSelect(property) {
    if (!property || property.type !== 'select') return '';
    return property.select ? property.select.name : '';
}

function getUrl(property) {
    if (!property || property.type !== 'url') return '';
    return property.url || '';
}
