export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { title, ingredients = [], category } = req.body || {};
    const ingredientNames = ingredients.slice(0, 8).map(i => i.n).filter(Boolean).join(", ");
    const query = encodeURIComponent(`${title || "food"} ${category || ""} ${ingredientNames} recipe food`.trim());

    const response = await fetch(`https://api.openverse.org/v1/images/?q=${query}&page_size=10&license_type=commercial`, {
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) return res.status(502).json({ error: "Image search failed" });

    const data = await response.json();
    const result = (data.results || []).find(item => item.thumbnail || item.url);
    if (!result) return res.status(404).json({ error: "No suitable image found" });

    return res.status(200).json({ url: result.thumbnail || result.url, source: result.creator || "Openverse" });
  } catch (error) {
    return res.status(500).json({ error: "Could not find recipe image" });
  }
}
