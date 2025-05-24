// /api/proxy.js

export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Missing address parameter" });
  }

  try {
    const apiUrl = `https://mainnet.airdrop.huma.finance/wallets/${address}`;
    const response = await fetch(apiUrl, {
      headers: {
        'Origin': 'https://claim.huma.finance',
        'Referer': 'https://claim.huma.finance',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error", detail: err.message });
  }
}
