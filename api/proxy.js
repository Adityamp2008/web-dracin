// api/proxy.js
export default async function handler(req, res) {
    const { path } = req.query;

    if (!path) {
        return res.status(400).json({ error: 'Path is required' });
    }

    // Target API Asli
    const targetUrl = `https://api.dramaku.biz.id${path}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.json();

        // Set Header supaya browser kamu (Frontend) diizinkan akses
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
}