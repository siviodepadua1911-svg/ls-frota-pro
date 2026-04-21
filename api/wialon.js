// Vercel serverless proxy para Wialon API
// Resolve CORS: browser chama /api/wialon (mesmo dominio),
// esta funcao repassa para hst-api.wialon.us no servidor.

export default async function handler(req, res) {
    const params = new URLSearchParams(req.query);
    const wialonUrl = `https://hst-api.wialon.us/wialon/ajax.html?${params.toString()}`;

  try {
        const response = await fetch(wialonUrl, { method: req.method });
        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
  } catch (err) {
        res.status(502).json({ error: -1, reason: err.message });
  }
}
