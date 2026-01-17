// File: api/proxy.js
export default async function handler(req, res) {
    const { path } = req.query;

    if (!path) {
        return res.status(400).json({ error: "Path wajib diisi" });
    }

    // Target API Asli
    const targetUrl = `https://api.dramaku.biz.id${path}`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                // Menyamar jadi Browser beneran biar gak diblokir
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://dramaku.biz.id/",
                "Origin": "https://dramaku.biz.id"
            }
        });

        const data = await response.json();

        // Izinkan Website Kamu Mengakses Data Ini (Bypass CORS)
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate"); // Cache 5 menit biar ngebut

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Gagal mengambil data", details: error.message });
    }
}