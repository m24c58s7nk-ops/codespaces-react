export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Flavorlyst AI is not configured yet." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const message = String(body.message || "").trim();
    if (!message) return res.status(400).json({ error: "Message is required." });

    const recipes = Array.isArray(body.recipes) ? body.recipes.slice(0, 20) : [];
    const currentRecipe = body.currentRecipe || null;

    const recipeContext = recipes.map(r =>
      `ID: ${r.id}
Title: ${r.title}
Category: ${r.category}
Time: ${r.time} minutes
Ingredients: ${(r.ingredients || []).join(", ")}
Description: ${r.description || ""}`
    ).join("\n\n");

    const prompt = `You are Flavorlyst AI, the cooking assistant built into the Flavorlyst recipe website.

Answer the user's cooking question directly and helpfully. You can:
- recommend recipes from the supplied Flavorlyst recipes
- suggest what to cook based on ingredients, time, or meal type
- explain cooking steps
- suggest reasonable ingredient substitutions
- help improve a recipe
- answer general cooking questions

Stay focused on food and cooking. Do not pretend you performed an action you did not perform. Keep answers concise but useful.

If recommending one supplied recipe, return its exact ID in recipeId. Otherwise use null.

User message:
${message}

Current recipe, if one is open:
${currentRecipe ? JSON.stringify(currentRecipe) : "None"}

Available Flavorlyst recipes:
${recipeContext}

Return ONLY JSON:
{"answer":"string","recipeId":"string or null"}`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_RECIPE_MODEL || "gpt-5.6-luna",
        reasoning: { effort: "none" },
        max_output_tokens: 500,
        input: prompt
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(502).json({ error: data?.error?.message || "AI request failed." });
    }

    const raw = data.output_text || "";
    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      result = { answer: raw || "I couldn't generate an answer.", recipeId: null };
    }

    return res.status(200).json({
      answer: String(result.answer || "I couldn't generate an answer."),
      recipeId: result.recipeId || null
    });
  } catch (error) {
    return res.status(500).json({ error: "Flavorlyst AI request failed." });
  }
}
