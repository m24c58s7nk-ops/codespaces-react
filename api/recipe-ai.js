export default async function handler(req, res) {\n  res.setHeader("Access-Control-Allow-Origin", "*");\n  res.setHeader("Access-Control-Allow-Headers", "Content-Type");\n  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "AI service is not configured" });

  try {
    const recipe = req.body || {};
    const prompt = `You are the quality-control editor for a recipe app.

Check whether this submission is a genuine, coherent food recipe rather than gibberish, spam, a joke with no usable cooking instructions, or unrelated text.

A valid recipe should have:
- a recognizable edible dish or food preparation
- at least 2 sensible ingredients
- at least 2 coherent preparation steps
- ingredients and steps that make culinary sense together
- no obvious contradiction between the title, ingredients, and steps

If valid, polish grammar, spelling, capitalization, punctuation, and clarity. Do not turn it into a different dish or invent major ingredients. You may make small wording and formatting corrections.

Return ONLY valid JSON with this exact shape:
{
  "valid": true,
  "reason": "short explanation",
  "title": "polished title",
  "description": "polished description",
  "category": "Breakfast|Lunch|Dinner",
  "time": 30,
  "difficulty": "Easy|Medium|Hard",
  "servings": 2,
  "story": "short entertaining background for the recipe",
  "tags": ["tag1","tag2"],
  "ingredients": [{"q":1,"u":"cup","n":"flour"}],
  "steps": ["Step one.","Step two."]
}

If invalid, set "valid" to false and explain the problem in "reason".

Recipe submission:
${JSON.stringify(recipe)}
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_RECIPE_MODEL || "gpt-5.6-luna",
        input: prompt
      })
    });

    if (!response.ok) return res.status(502).json({ error: "AI request failed" });

    const data = await response.json();
    const text = data.output_text || data.output?.flatMap(x => x.content || []).map(x => x.text || "").join("") || "";
    const cleaned = text.replace(/^\`\`\`json\s*/i, "").replace(/\s*\`\`\`$/i, "").trim();
    const result = JSON.parse(cleaned);

    if (typeof result.valid !== "boolean") return res.status(502).json({ error: "AI returned an invalid result" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Could not check recipe" });
  }
}
