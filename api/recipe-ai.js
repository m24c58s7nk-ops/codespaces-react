export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "AI service is not configured" });

  try {
    const recipe = req.body || {};
    const prompt = `You are Flavorlyst's fast recipe quality checker.

Decide whether the submission is a real, coherent food recipe or gibberish/spam/unrelated text.
Valid means: recognizable food, at least 2 sensible ingredients, at least 2 coherent steps, and the ingredients/steps fit the dish.

If valid, make only small grammar, spelling, capitalization, punctuation, and clarity fixes. Do not change the dish or invent major ingredients.

Return ONLY JSON:
{"valid":true,"reason":"short","title":"...","description":"...","category":"Breakfast|Lunch|Dinner","time":30,"difficulty":"Easy|Medium|Hard","servings":2,"story":"short entertaining background","tags":["tag"],"ingredients":[{"q":1,"u":"cup","n":"flour"}],"steps":["Step one.","Step two."]}

If invalid, return the same shape with valid=false and a short reason.

Submission:
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
        reasoning: { effort: "none" },
        max_output_tokens: 1200,
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
