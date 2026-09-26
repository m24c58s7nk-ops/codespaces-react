import React, { useMemo, useState, useEffect } from "react";


const starterRecipes = [
  {
    id: "r1", title: "Creamy Tuscan Pasta", category: "Dinner", time: 30, difficulty: "Easy", servings: 2,
    story: "Legend has it that this pasta began in a tiny kitchen in Tuscany, where a home cook was trying to turn a handful of tomatoes, spinach, and leftover cream into dinner for unexpected guests. The dish became a family favorite, eventually making its way onto neighborhood tables. Flavorlyst's version keeps that same cozy, make-it-tonight spirit.", author: "Kitchen Collective",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
    description: "Silky pasta with garlic, spinach, tomatoes, and Parmesan.",
    tags: ["pasta", "quick", "vegetarian"],
    ingredients: [{q: 8,u:"oz",n:"pasta"},{q:1,u:"tbsp",n:"olive oil"},{q:2,u:"clove",n:"garlic"},{q:1,u:"cup",n:"cherry tomatoes"},{q:2,u:"cup",n:"spinach"},{q:0.5,u:"cup",n:"heavy cream"},{q:0.5,u:"cup",n:"Parmesan"}],
    steps: ["Cook pasta until al dente and reserve a little pasta water.","Sauté garlic and tomatoes in olive oil.","Add spinach and cream; simmer briefly.","Toss with pasta and Parmesan, adding pasta water as needed."]
  },
  {
    id: "r2", title: "Crispy Honey Chicken", category: "Dinner", time: 35, difficulty: "Medium", servings: 4,
    story: "This recipe was inspired by the kind of weeknight dinner that disappears from the table before anyone remembers to take a photo. Mia's Kitchen imagined a simple honey glaze that could turn golden chicken into something special without making dinner complicated. The sweet-and-tangy sauce became the signature.", author: "Mia's Kitchen",
    image: "https://cdn.emmasrezepte.de/images/7759f88f-8cf7-4fb6-9af8-1404c00c07c7_U3_b2988d31.webp",
    description: "Golden chicken glazed with a sweet, tangy honey sauce.",
    tags: ["chicken", "family", "high-protein"],
    ingredients: [{q:1.5,u:"lb",n:"chicken breast"},{q:0.5,u:"cup",n:"flour"},{q:2,u:"tbsp",n:"olive oil"},{q:0.25,u:"cup",n:"honey"},{q:2,u:"tbsp",n:"soy sauce"},{q:1,u:"tbsp",n:"lemon juice"}],
    steps: ["Cut chicken into bite-size pieces and coat lightly in flour.","Pan-cook until golden and cooked through.","Whisk honey, soy sauce, and lemon juice.","Pour sauce over chicken and toss until glossy."]
  },
  {
    id: "r3", title: "Berry Breakfast Bowl", category: "Breakfast", time: 10, difficulty: "Easy", servings: 1,
    story: "The breakfast bowl has roots in the sunny idea that breakfast should feel like a fresh start. Fresh Start's original version was assembled from whatever berries and fruit were in season, with yogurt and granola added for crunch. It became a morning ritual because it takes only a few minutes but still feels like a little celebration.", author: "Fresh Start",
    image: "https://images.unsplash.com/photo-1623052935410-3fca63f73e10?auto=format&fit=crop&w=1200&q=85",
    description: "A bright yogurt bowl loaded with berries, banana, and crunchy toppings.",
    tags: ["breakfast", "fruit", "quick"],
    ingredients: [{q:1,u:"cup",n:"Greek yogurt"},{q:0.5,u:"cup",n:"berries"},{q:0.5,u:"",n:"banana"},{q:2,u:"tbsp",n:"granola"},{q:1,u:"tbsp",n:"honey"}],
    steps: ["Add yogurt to a bowl.","Top with berries and sliced banana.","Finish with granola and honey."]
  },
  {
    id: "r4", title: "Roasted Garlic Tomato Soup", category: "Lunch", time: 45, difficulty: "Easy", servings: 4,
    story: "On a chilly afternoon, the Home Table kitchen filled with the smell of tomatoes and garlic roasting in the oven. What started as an experiment to deepen the flavor of an ordinary tomato soup became a recipe people asked for again and again. The secret, according to the story, was giving the garlic and tomatoes enough time to caramelize.", author: "Home Table",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=85",
    description: "Roasted tomatoes and garlic blended into a comforting soup.",
    tags: ["soup", "vegetarian", "comfort"],
    ingredients: [{q:2,u:"lb",n:"tomatoes"},{q:1,u:"head",n:"garlic"},{q:2,u:"tbsp",n:"olive oil"},{q:3,u:"cup",n:"vegetable broth"},{q:0.25,u:"cup",n:"cream"}],
    steps: ["Roast tomatoes and garlic with olive oil until caramelized.","Blend with warm vegetable broth.","Simmer until smooth and season to taste.","Stir in cream before serving."]
  },
  {
    id: "r5", title: "Avocado Toast", category: "Breakfast", time: 8, difficulty: "Easy", servings: 1,
    story: "Everyday Eats traces this toast to slow weekend mornings, when there was just enough time to mash a ripe avocado and experiment with whatever was in the spice drawer. Lemon brought brightness, chili added a little spark, and a simple slice of toast became a breakfast staple.", author: "Everyday Eats",
    image: "https://images.unsplash.com/photo-1741732666754-392caf4bea63?auto=format&fit=crop&w=1200&q=85",
    description: "Creamy avocado on crisp toast with lemon and chili.",
    tags: ["breakfast", "quick"],
    ingredients: [{q:2,u:"slice",n:"bread"},{q:1,u:"",n:"avocado"},{q:1,u:"tsp",n:"lemon juice"},{q:1,u:"pinch",n:"chili flakes"}],
    steps: ["Toast the bread.","Mash avocado with lemon juice.","Spread over toast and finish with chili flakes."]
  },
  {
    id: "r6", title: "Garden Greek Salad", category: "Lunch", time: 15, difficulty: "Easy", servings: 2,
    story: "The Green Spoon says this salad was born from a garden table in the middle of summer. Cucumbers, tomatoes, herbs, olives, and feta were gathered as they became ready, then tossed together with a quick lemon dressing. No complicated recipe was planned—the garden practically wrote it itself.", author: "The Green Spoon",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    description: "Crisp vegetables, feta, olives, and a simple lemon dressing.",
    tags: ["salad", "vegetarian", "quick"],
    ingredients: [{q:2,u:"cup",n:"cucumber"},{q:2,u:"cup",n:"tomato"},{q:0.5,u:"cup",n:"feta"},{q:0.25,u:"cup",n:"olives"},{q:2,u:"tbsp",n:"olive oil"},{q:1,u:"tbsp",n:"lemon juice"}],
    steps: ["Chop vegetables and add to a bowl.","Whisk olive oil and lemon juice.","Toss everything together and add feta."]
  },
  { id: "r7", title: "Blueberry Lemon Pancakes", category: "Breakfast", time: 20, difficulty: "Easy", servings: 2, story: "The story of Blueberry Lemon Pancakes started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://homesteadspoon.com/assets/images/1768874996392-7p5atynu.webp", description: "A bright, comforting recipe made for easy home cooking.", tags: ["breakfast","blueberry","flavorlyst"], ingredients: [{"q":1.5,"u":"cup","n":"flour"},{"q":1,"u":"cup","n":"milk"},{"q":1,"u":"egg","n":"egg"},{"q":0.5,"u":"cup","n":"fruit"},{"q":1,"u":"tbsp","n":"butter"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r8", title: "Classic French Toast", category: "Breakfast", time: 15, difficulty: "Easy", servings: 2, story: "The story of Classic French Toast started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://art.whisk.com/image/upload/fl_progressive%2Ch_560%2Cw_560%2Cc_fill%2Cdpr_2/v1762905710741/recipe/ae1148058a132ff01eaabc8a703c818a.jpg", description: "A simple favorite designed for relaxed meals and busy days.", tags: ["breakfast","classic","flavorlyst"], ingredients: [{"q":2,"u":"slice","n":"bread"},{"q":2,"u":"egg","n":"eggs"},{"q":0.5,"u":"cup","n":"milk"},{"q":1,"u":"tsp","n":"cinnamon"},{"q":1,"u":"tbsp","n":"maple syrup"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r9", title: "Veggie Breakfast Burrito", category: "Breakfast", time: 18, difficulty: "Easy", servings: 2, story: "The story of Veggie Breakfast Burrito started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=85", description: "A colorful dish that turns everyday ingredients into something special.", tags: ["breakfast","veggie","flavorlyst"], ingredients: [{"q":2,"u":"large","n":"tortillas"},{"q":3,"u":"egg","n":"eggs"},{"q":0.5,"u":"cup","n":"vegetables"},{"q":0.5,"u":"cup","n":"cheese"},{"q":1,"u":"tbsp","n":"oil"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r10", title: "Cinnamon Apple Oatmeal", category: "Breakfast", time: 12, difficulty: "Easy", servings: 2, story: "The story of Cinnamon Apple Oatmeal started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://img.siterank.app/topic/cinnamon-apple-oatmeal-bowl-recipe.png", description: "A cozy recipe with familiar flavors and a little Flavorlyst magic.", tags: ["breakfast","cinnamon","flavorlyst"], ingredients: [{"q":1,"u":"cup","n":"oats"},{"q":2,"u":"cup","n":"milk"},{"q":1,"u":"","n":"apple"},{"q":1,"u":"tsp","n":"cinnamon"},{"q":1,"u":"tbsp","n":"honey"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r11", title: "Strawberry Chia Pudding", category: "Breakfast", time: 10, difficulty: "Easy", servings: 2, story: "The story of Strawberry Chia Pudding started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://static.wixstatic.com/media/a59d97_0f014a03ee1c4006baf5db02e476d6be~mv2.png/v1/fill/w_800%2Ch_1000%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01/a59d97_0f014a03ee1c4006baf5db02e476d6be~mv2.png", description: "A fresh, satisfying idea that is easy to make and fun to share.", tags: ["breakfast","strawberry","flavorlyst"], ingredients: [{"q":0.25,"u":"cup","n":"chia seeds"},{"q":1,"u":"cup","n":"milk"},{"q":0.5,"u":"cup","n":"berries"},{"q":1,"u":"tsp","n":"honey"},{"q":0.25,"u":"tsp","n":"vanilla"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r12", title: "Peanut Butter Banana Toast", category: "Breakfast", time: 7, difficulty: "Easy", servings: 2, story: "The story of Peanut Butter Banana Toast started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://pbs.twimg.com/media/F_Zbjw4XAAAEmVy.jpg", description: "A bright, comforting recipe made for easy home cooking.", tags: ["breakfast","peanut","flavorlyst"], ingredients: [{"q":1.5,"u":"cup","n":"flour"},{"q":1,"u":"cup","n":"milk"},{"q":1,"u":"egg","n":"egg"},{"q":0.5,"u":"cup","n":"fruit"},{"q":1,"u":"tbsp","n":"butter"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r13", title: "Spinach Feta Omelet", category: "Breakfast", time: 12, difficulty: "Medium", servings: 2, story: "The story of Spinach Feta Omelet started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/omelette_with_spinach_and_feta.jpg", description: "A simple favorite designed for relaxed meals and busy days.", tags: ["breakfast","spinach","flavorlyst"], ingredients: [{"q":2,"u":"slice","n":"bread"},{"q":2,"u":"egg","n":"eggs"},{"q":0.5,"u":"cup","n":"milk"},{"q":1,"u":"tsp","n":"cinnamon"},{"q":1,"u":"tbsp","n":"maple syrup"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r14", title: "Mango Coconut Smoothie", category: "Breakfast", time: 6, difficulty: "Medium", servings: 2, story: "The story of Mango Coconut Smoothie started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://naoq8gawh7kpd7sm.public.blob.vercel-storage.com/Mango%20smoothie%20recept-bqWDFsk2mMmQ8Hj988d1goAhD78u1O.webp", description: "A colorful dish that turns everyday ingredients into something special.", tags: ["breakfast","mango","flavorlyst"], ingredients: [{"q":2,"u":"large","n":"tortillas"},{"q":3,"u":"egg","n":"eggs"},{"q":0.5,"u":"cup","n":"vegetables"},{"q":0.5,"u":"cup","n":"cheese"},{"q":1,"u":"tbsp","n":"oil"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r15", title: "Savory Breakfast Hash", category: "Breakfast", time: 25, difficulty: "Easy", servings: 2, story: "The story of Savory Breakfast Hash started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://cupofyum.com/uploads/images/000/074/422/74422-breakfast-hash-cb64e195f782bfe4564a78a5af177b09.jpg", description: "A cozy recipe with familiar flavors and a little Flavorlyst magic.", tags: ["breakfast","savory","flavorlyst"], ingredients: [{"q":1,"u":"cup","n":"oats"},{"q":2,"u":"cup","n":"milk"},{"q":1,"u":"","n":"apple"},{"q":1,"u":"tsp","n":"cinnamon"},{"q":1,"u":"tbsp","n":"honey"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r16", title: "Chocolate Chip Waffles", category: "Breakfast", time: 22, difficulty: "Medium", servings: 2, story: "The story of Chocolate Chip Waffles started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto%2Cq_auto%2Cfl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2025/5/30/2884d4ad-64ab-44f3-9329-f6f27f1657f2_1093096.jpg", description: "A fresh, satisfying idea that is easy to make and fun to share.", tags: ["breakfast","chocolate","flavorlyst"], ingredients: [{"q":0.25,"u":"cup","n":"chia seeds"},{"q":1,"u":"cup","n":"milk"},{"q":0.5,"u":"cup","n":"berries"},{"q":1,"u":"tsp","n":"honey"},{"q":0.25,"u":"tsp","n":"vanilla"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r17", title: "Greek Yogurt Parfait", category: "Breakfast", time: 8, difficulty: "Medium", servings: 2, story: "The story of Greek Yogurt Parfait started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/greek_yogurt_parfait.jpg", description: "A bright, comforting recipe made for easy home cooking.", tags: ["breakfast","greek","flavorlyst"], ingredients: [{"q":1.5,"u":"cup","n":"flour"},{"q":1,"u":"cup","n":"milk"},{"q":1,"u":"egg","n":"egg"},{"q":0.5,"u":"cup","n":"fruit"},{"q":1,"u":"tbsp","n":"butter"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r18", title: "Breakfast Quesadilla", category: "Breakfast", time: 15, difficulty: "Easy", servings: 2, story: "The story of Breakfast Quesadilla started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://www.tastingtable.com/img/gallery/the-best-way-to-cook-your-eggs-for-a-savory-breakfast-quesadilla/intro-1713881170.jpg", description: "A simple favorite designed for relaxed meals and busy days.", tags: ["breakfast","breakfast","flavorlyst"], ingredients: [{"q":2,"u":"slice","n":"bread"},{"q":2,"u":"egg","n":"eggs"},{"q":0.5,"u":"cup","n":"milk"},{"q":1,"u":"tsp","n":"cinnamon"},{"q":1,"u":"tbsp","n":"maple syrup"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r19", title: "Maple Pecan Oatmeal", category: "Breakfast", time: 12, difficulty: "Medium", servings: 2, story: "The story of Maple Pecan Oatmeal started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/recipe_pics_v2/medium/maple_brown_sugar_oatmeal.jpg", description: "A colorful dish that turns everyday ingredients into something special.", tags: ["breakfast","maple","flavorlyst"], ingredients: [{"q":2,"u":"large","n":"tortillas"},{"q":3,"u":"egg","n":"eggs"},{"q":0.5,"u":"cup","n":"vegetables"},{"q":0.5,"u":"cup","n":"cheese"},{"q":1,"u":"tbsp","n":"oil"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r20", title: "Berry Banana Smoothie", category: "Breakfast", time: 7, difficulty: "Easy", servings: 2, story: "The story of Berry Banana Smoothie started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://forktionary.s3.us-east-2.amazonaws.com/prod/images/recipe-image-16158.png", description: "A cozy recipe with familiar flavors and a little Flavorlyst magic.", tags: ["breakfast","berry","flavorlyst"], ingredients: [{"q":1,"u":"cup","n":"oats"},{"q":2,"u":"cup","n":"milk"},{"q":1,"u":"","n":"apple"},{"q":1,"u":"tsp","n":"cinnamon"},{"q":1,"u":"tbsp","n":"honey"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r21", title: "Tomato Egg Toast", category: "Breakfast", time: 12, difficulty: "Easy", servings: 2, story: "The story of Tomato Egg Toast started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://mealprepedia.com/wp-content/uploads/2025/06/Tomato-Basil-Egg-Toast.webp", description: "A fresh, satisfying idea that is easy to make and fun to share.", tags: ["breakfast","tomato","flavorlyst"], ingredients: [{"q":0.25,"u":"cup","n":"chia seeds"},{"q":1,"u":"cup","n":"milk"},{"q":0.5,"u":"cup","n":"berries"},{"q":1,"u":"tsp","n":"honey"},{"q":0.25,"u":"tsp","n":"vanilla"}], steps: ["Prepare the ingredients and mix the base until combined.","Cook or assemble until warm, golden, or creamy.","Add the toppings and serve fresh."] },
  { id: "r22", title: "Turkey Pesto Sandwich", category: "Lunch", time: 12, difficulty: "Medium", servings: 2, story: "The story of Turkey Pesto Sandwich started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://d1w7312wesee68.cloudfront.net/uHCHaSjsChGJoBO2piPvxwnQ_PEntfm_JsYabDeBsDc/resize%3Afit%3A720%3A720/plain/s3%3A/toasttab/menu_service/restaurants/ccbe2d96-d203-46b9-a3dc-f86ca6184c6e/MenuItem/46a91df6-1b6f-44b1-bdad-1985da30d465.jpg", description: "A bright, comforting recipe made for easy home cooking.", tags: ["lunch","turkey","flavorlyst"], ingredients: [{"q":4,"u":"slice","n":"bread"},{"q":4,"u":"oz","n":"turkey"},{"q":2,"u":"tbsp","n":"pesto"},{"q":0.5,"u":"cup","n":"tomato"},{"q":1,"u":"cup","n":"greens"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r23", title: "Caprese Pasta Salad", category: "Lunch", time: 18, difficulty: "Medium", servings: 2, story: "The story of Caprese Pasta Salad started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://www.feastingathome.com/wp-content/uploads/2023/06/caprese-pasta-salad-11.jpg", description: "A simple favorite designed for relaxed meals and busy days.", tags: ["lunch","caprese","flavorlyst"], ingredients: [{"q":8,"u":"oz","n":"pasta"},{"q":1,"u":"cup","n":"tomatoes"},{"q":1,"u":"cup","n":"mozzarella"},{"q":0.25,"u":"cup","n":"basil"},{"q":2,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r24", title: "Chicken Caesar Wrap", category: "Lunch", time: 20, difficulty: "Medium", servings: 2, story: "The story of Chicken Caesar Wrap started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://www.therandomrecipe.com/_next/image?q=75&url=https%3A%2F%2Fd2aq0yf1s46hyj.cloudfront.net%2Ftherandomrecipe%2F205.png&w=3840", description: "A colorful dish that turns everyday ingredients into something special.", tags: ["lunch","chicken","flavorlyst"], ingredients: [{"q":2,"u":"large","n":"tortillas"},{"q":8,"u":"oz","n":"chicken"},{"q":2,"u":"cup","n":"romaine"},{"q":0.25,"u":"cup","n":"Parmesan"},{"q":3,"u":"tbsp","n":"dressing"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r25", title: "Tomato Basil Grilled Cheese", category: "Lunch", time: 15, difficulty: "Easy", servings: 2, story: "The story of Tomato Basil Grilled Cheese started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1606070781631-a7e961f84c9e?auto=format&fit=crop&w=1200&q=85", description: "A cozy recipe with familiar flavors and a little Flavorlyst magic.", tags: ["lunch","tomato","flavorlyst"], ingredients: [{"q":4,"u":"slice","n":"bread"},{"q":2,"u":"slice","n":"cheese"},{"q":1,"u":"","n":"tomato"},{"q":0.25,"u":"cup","n":"basil"},{"q":1,"u":"tbsp","n":"butter"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r26", title: "Mediterranean Hummus Bowl", category: "Lunch", time: 15, difficulty: "Easy", servings: 2, story: "The story of Mediterranean Hummus Bowl started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85", description: "A fresh, satisfying idea that is easy to make and fun to share.", tags: ["lunch","mediterranean","flavorlyst"], ingredients: [{"q":1,"u":"cup","n":"cooked grains"},{"q":0.5,"u":"cup","n":"hummus"},{"q":0.5,"u":"cup","n":"cucumber"},{"q":0.5,"u":"cup","n":"tomato"},{"q":1,"u":"tbsp","n":"lemon juice"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r27", title: "Creamy Broccoli Soup", category: "Lunch", time: 30, difficulty: "Easy", servings: 2, story: "The story of Creamy Broccoli Soup started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7b?auto=format&fit=crop&w=1200&q=85", description: "A bright, comforting recipe made for easy home cooking.", tags: ["lunch","creamy","flavorlyst"], ingredients: [{"q":4,"u":"slice","n":"bread"},{"q":4,"u":"oz","n":"turkey"},{"q":2,"u":"tbsp","n":"pesto"},{"q":0.5,"u":"cup","n":"tomato"},{"q":1,"u":"cup","n":"greens"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r28", title: "Tuna Crunch Sandwich", category: "Lunch", time: 10, difficulty: "Easy", servings: 2, story: "The story of Tuna Crunch Sandwich started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1582034986517-30d163aa1da9?auto=format&fit=crop&w=1200&q=85", description: "A simple favorite designed for relaxed meals and busy days.", tags: ["lunch","tuna","flavorlyst"], ingredients: [{"q":8,"u":"oz","n":"pasta"},{"q":1,"u":"cup","n":"tomatoes"},{"q":1,"u":"cup","n":"mozzarella"},{"q":0.25,"u":"cup","n":"basil"},{"q":2,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r29", title: "Rainbow Veggie Wrap", category: "Lunch", time: 12, difficulty: "Easy", servings: 2, story: "The story of Rainbow Veggie Wrap started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=85", description: "A colorful dish that turns everyday ingredients into something special.", tags: ["lunch","rainbow","flavorlyst"], ingredients: [{"q":2,"u":"large","n":"tortillas"},{"q":8,"u":"oz","n":"chicken"},{"q":2,"u":"cup","n":"romaine"},{"q":0.25,"u":"cup","n":"Parmesan"},{"q":3,"u":"tbsp","n":"dressing"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r30", title: "Lemon Herb Couscous", category: "Lunch", time: 15, difficulty: "Easy", servings: 2, story: "The story of Lemon Herb Couscous started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://domesticate-me.com/wp-content/uploads/2021/04/Lemon-Herb-Couscous-1.jpg", description: "A cozy recipe with familiar flavors and a little Flavorlyst magic.", tags: ["lunch","lemon","flavorlyst"], ingredients: [{"q":4,"u":"slice","n":"bread"},{"q":2,"u":"slice","n":"cheese"},{"q":1,"u":"","n":"tomato"},{"q":0.25,"u":"cup","n":"basil"},{"q":1,"u":"tbsp","n":"butter"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r31", title: "Southwest Chicken Salad", category: "Lunch", time: 20, difficulty: "Easy", servings: 2, story: "The story of Southwest Chicken Salad started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://recipesbybianca.com/assets/images/1768707024409-4ujxiae4.webp", description: "A fresh, satisfying idea that is easy to make and fun to share.", tags: ["lunch","southwest","flavorlyst"], ingredients: [{"q":1,"u":"cup","n":"cooked grains"},{"q":0.5,"u":"cup","n":"hummus"},{"q":0.5,"u":"cup","n":"cucumber"},{"q":0.5,"u":"cup","n":"tomato"},{"q":1,"u":"tbsp","n":"lemon juice"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r32", title: "Margherita Flatbread", category: "Lunch", time: 20, difficulty: "Easy", servings: 2, story: "The story of Margherita Flatbread started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://storage.googleapis.com/fpoo-public-bucket/img/Recipes/flatbread-margherita.jpg", description: "A bright, comforting recipe made for easy home cooking.", tags: ["lunch","margherita","flavorlyst"], ingredients: [{"q":4,"u":"slice","n":"bread"},{"q":4,"u":"oz","n":"turkey"},{"q":2,"u":"tbsp","n":"pesto"},{"q":0.5,"u":"cup","n":"tomato"},{"q":1,"u":"cup","n":"greens"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r33", title: "Greek Chicken Pita", category: "Lunch", time: 25, difficulty: "Easy", servings: 2, story: "The story of Greek Chicken Pita started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://cdn.juliesdish.com/images/featured_image_row_4_a490f1a7-dc.jpg?w=1920", description: "A simple favorite designed for relaxed meals and busy days.", tags: ["lunch","greek","flavorlyst"], ingredients: [{"q":8,"u":"oz","n":"pasta"},{"q":1,"u":"cup","n":"tomatoes"},{"q":1,"u":"cup","n":"mozzarella"},{"q":0.25,"u":"cup","n":"basil"},{"q":2,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r34", title: "Cucumber Feta Salad", category: "Lunch", time: 10, difficulty: "Easy", servings: 2, story: "The story of Cucumber Feta Salad started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7a?auto=format&fit=crop&w=1200&q=85", description: "A colorful dish that turns everyday ingredients into something special.", tags: ["lunch","cucumber","flavorlyst"], ingredients: [{"q":2,"u":"large","n":"tortillas"},{"q":8,"u":"oz","n":"chicken"},{"q":2,"u":"cup","n":"romaine"},{"q":0.25,"u":"cup","n":"Parmesan"},{"q":3,"u":"tbsp","n":"dressing"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r35", title: "Garlic Butter Shrimp", category: "Dinner", time: 15, difficulty: "Medium", servings: 2, story: "The story of Garlic Butter Shrimp started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1644898955763-682dbe5127ac?auto=format&fit=crop&w=1200&q=85", description: "A cozy recipe with familiar flavors and a little Flavorlyst magic.", tags: ["dinner","garlic","flavorlyst"], ingredients: [{"q":8,"u":"oz","n":"pasta"},{"q":1,"u":"cup","n":"sauce"},{"q":1,"u":"cup","n":"vegetables"},{"q":0.5,"u":"cup","n":"cheese"},{"q":1,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r36", title: "Chicken Tikka Rice Bowls", category: "Dinner", time: 35, difficulty: "Medium", servings: 2, story: "The story of Chicken Tikka Rice Bowls started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://sweetbananachef.com/wp-content/uploads/2025/06/0-1-640-N-151.jpg", description: "A fresh, satisfying idea that is easy to make and fun to share.", tags: ["dinner","chicken","flavorlyst"], ingredients: [{"q":1,"u":"can","n":"chickpeas"},{"q":1,"u":"cup","n":"coconut milk"},{"q":1,"u":"cup","n":"tomato sauce"},{"q":1,"u":"cup","n":"spinach"},{"q":1,"u":"tbsp","n":"curry powder"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r37", title: "Beef & Broccoli Stir-Fry", category: "Dinner", time: 25, difficulty: "Medium", servings: 2, story: "The story of Beef & Broccoli Stir-Fry started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://eatthegains.com/wp-content/uploads/2018/09/Beef-and-Broccoli-10.jpg", description: "A bright, comforting recipe made for easy home cooking.", tags: ["dinner","beef","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"chicken"},{"q":1,"u":"cup","n":"rice"},{"q":1,"u":"cup","n":"vegetables"},{"q":2,"u":"tbsp","n":"sauce"},{"q":1,"u":"tbsp","n":"oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r38", title: "Baked Pesto Salmon", category: "Dinner", time: 25, difficulty: "Medium", servings: 2, story: "The story of Baked Pesto Salmon started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://cupofyum.com/uploads/images/000/021/579/21579-pesto-salmon-sheet-pan-meal-4fe8f82801c910660a5d4a8c40a55abd.jpg", description: "A simple favorite designed for relaxed meals and busy days.", tags: ["dinner","baked","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"salmon"},{"q":2,"u":"tbsp","n":"glaze"},{"q":2,"u":"cup","n":"vegetables"},{"q":1,"u":"tbsp","n":"lemon juice"},{"q":1,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r39", title: "One-Pan Sausage & Peppers", category: "Dinner", time: 30, difficulty: "Medium", servings: 2, story: "The story of One-Pan Sausage & Peppers started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://i.pinimg.com/736x/3e/1c/23/3e1c23c98e9fe96a1fe4454224eaacf4.jpg", description: "A colorful dish that turns everyday ingredients into something special.", tags: ["dinner","one-pan","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"ground beef"},{"q":8,"u":"small","n":"tortillas"},{"q":1,"u":"tbsp","n":"seasoning"},{"q":1,"u":"cup","n":"lettuce"},{"q":0.5,"u":"cup","n":"cheese"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r40", title: "Vegetable Curry", category: "Dinner", time: 35, difficulty: "Medium", servings: 2, story: "The story of Vegetable Curry started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://itsonly.recipes/images/recipeimages/vegetable-curry.webp", description: "A cozy recipe with familiar flavors and a little Flavorlyst magic.", tags: ["dinner","vegetable","flavorlyst"], ingredients: [{"q":8,"u":"oz","n":"pasta"},{"q":1,"u":"cup","n":"sauce"},{"q":1,"u":"cup","n":"vegetables"},{"q":0.5,"u":"cup","n":"cheese"},{"q":1,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r41", title: "Classic Beef Tacos", category: "Dinner", time: 20, difficulty: "Medium", servings: 2, story: "The story of Classic Beef Tacos started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://myhomemademeal.com/assets/images/1747159667177-7jkkf3cv.webp", description: "A fresh, satisfying idea that is easy to make and fun to share.", tags: ["dinner","classic","flavorlyst"], ingredients: [{"q":1,"u":"can","n":"chickpeas"},{"q":1,"u":"cup","n":"coconut milk"},{"q":1,"u":"cup","n":"tomato sauce"},{"q":1,"u":"cup","n":"spinach"},{"q":1,"u":"tbsp","n":"curry powder"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r42", title: "Creamy Lemon Chicken", category: "Dinner", time: 30, difficulty: "Medium", servings: 2, story: "The story of Creamy Lemon Chicken started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://img.siterank.app/topic/home-cooked-lemon-chicken-dish-recipe.png", description: "A bright, comforting recipe made for easy home cooking.", tags: ["dinner","creamy","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"chicken"},{"q":1,"u":"cup","n":"rice"},{"q":1,"u":"cup","n":"vegetables"},{"q":2,"u":"tbsp","n":"sauce"},{"q":1,"u":"tbsp","n":"oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r43", title: "Spinach Ricotta Stuffed Shells", category: "Dinner", time: 50, difficulty: "Medium", servings: 2, story: "The story of Spinach Ricotta Stuffed Shells started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://d1yfn1dfres2va.cloudfront.net/013/e1/16/e116e9908d54fc540870bdf16ffb4d60_640m.jpg", description: "A simple favorite designed for relaxed meals and busy days.", tags: ["dinner","spinach","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"salmon"},{"q":2,"u":"tbsp","n":"glaze"},{"q":2,"u":"cup","n":"vegetables"},{"q":1,"u":"tbsp","n":"lemon juice"},{"q":1,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r44", title: "Honey Garlic Salmon", category: "Dinner", time: 25, difficulty: "Medium", servings: 2, story: "The story of Honey Garlic Salmon started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://hips.hearstapps.com/hmg-prod/images/1506456214-delish-honey-garlic-glazed-salmon-1662057850.jpg?crop=1xw%3A1xh%3Bcenter%2Ctop&resize=980%3A%2A", description: "A colorful dish that turns everyday ingredients into something special.", tags: ["dinner","honey","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"ground beef"},{"q":8,"u":"small","n":"tortillas"},{"q":1,"u":"tbsp","n":"seasoning"},{"q":1,"u":"cup","n":"lettuce"},{"q":0.5,"u":"cup","n":"cheese"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r45", title: "Veggie Fried Rice", category: "Dinner", time: 20, difficulty: "Medium", servings: 2, story: "The story of Veggie Fried Rice started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/veg_fried_rice.jpg", description: "A cozy recipe with familiar flavors and a little Flavorlyst magic.", tags: ["dinner","veggie","flavorlyst"], ingredients: [{"q":8,"u":"oz","n":"pasta"},{"q":1,"u":"cup","n":"sauce"},{"q":1,"u":"cup","n":"vegetables"},{"q":0.5,"u":"cup","n":"cheese"},{"q":1,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r46", title: "Chicken Parmesan", category: "Dinner", time: 45, difficulty: "Medium", servings: 2, story: "The story of Chicken Parmesan started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://itsonly.recipes/images/recipeimages/heritage-chicken-parmigiana.webp", description: "A fresh, satisfying idea that is easy to make and fun to share.", tags: ["dinner","chicken","flavorlyst"], ingredients: [{"q":1,"u":"can","n":"chickpeas"},{"q":1,"u":"cup","n":"coconut milk"},{"q":1,"u":"cup","n":"tomato sauce"},{"q":1,"u":"cup","n":"spinach"},{"q":1,"u":"tbsp","n":"curry powder"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r47", title: "Black Bean Enchiladas", category: "Dinner", time: 40, difficulty: "Medium", servings: 2, story: "The story of Black Bean Enchiladas started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85", description: "A bright, comforting recipe made for easy home cooking.", tags: ["dinner","black","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"chicken"},{"q":1,"u":"cup","n":"rice"},{"q":1,"u":"cup","n":"vegetables"},{"q":2,"u":"tbsp","n":"sauce"},{"q":1,"u":"tbsp","n":"oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r48", title: "Creamy Garlic Parmesan Chicken", category: "Dinner", time: 30, difficulty: "Medium", servings: 2, story: "The story of Creamy Garlic Parmesan Chicken started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://www.thecookingrecipes.com/wp-content/uploads/2025/07/creamy-garlic-chicken-skillet-recipe-with-herb-sauce.webp", description: "A simple favorite designed for relaxed meals and busy days.", tags: ["dinner","creamy","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"salmon"},{"q":2,"u":"tbsp","n":"glaze"},{"q":2,"u":"cup","n":"vegetables"},{"q":1,"u":"tbsp","n":"lemon juice"},{"q":1,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r49", title: "Miso Glazed Eggplant", category: "Dinner", time: 30, difficulty: "Medium", servings: 2, story: "The story of Miso Glazed Eggplant started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.mrcook.app/recipe-image/018fd9d1-0e95-7d40-b5c2-da70f64e5502", description: "A colorful dish that turns everyday ingredients into something special.", tags: ["dinner","miso","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"ground beef"},{"q":8,"u":"small","n":"tortillas"},{"q":1,"u":"tbsp","n":"seasoning"},{"q":1,"u":"cup","n":"lettuce"},{"q":0.5,"u":"cup","n":"cheese"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r50", title: "Pesto Gnocchi", category: "Dinner", time: 20, difficulty: "Medium", servings: 2, story: "The story of Pesto Gnocchi started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://bitsandbitesblog.com/wp-content/uploads/2023/04/pesto-gnocchi-recipe-5-of-6-700x1050.jpg", description: "A cozy recipe with familiar flavors and a little Flavorlyst magic.", tags: ["dinner","pesto","flavorlyst"], ingredients: [{"q":8,"u":"oz","n":"pasta"},{"q":1,"u":"cup","n":"sauce"},{"q":1,"u":"cup","n":"vegetables"},{"q":0.5,"u":"cup","n":"cheese"},{"q":1,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r51", title: "Sheet-Pan Lemon Chicken", category: "Dinner", time: 35, difficulty: "Medium", servings: 2, story: "The story of Sheet-Pan Lemon Chicken started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://v.cdn.ww.com/media/system/wine/625d997905d20000104b3464/4075a9f9-eb2a-41a5-b295-21f8b7f0a6c2/y9kcevu6v0ubvlfwcykx.jpg?auto=webp&enable=upscale&fit=crop&height=800&optimize=medium&quality=80&width=800", description: "A fresh, satisfying idea that is easy to make and fun to share.", tags: ["dinner","sheet-pan","flavorlyst"], ingredients: [{"q":1,"u":"can","n":"chickpeas"},{"q":1,"u":"cup","n":"coconut milk"},{"q":1,"u":"cup","n":"tomato sauce"},{"q":1,"u":"cup","n":"spinach"},{"q":1,"u":"tbsp","n":"curry powder"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r52", title: "Butternut Squash Pasta", category: "Dinner", time: 35, difficulty: "Medium", servings: 2, story: "The story of Butternut Squash Pasta started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/recipe_pics_v2/medium/pasta_with_roasted_butternut_squash_and_sage.jpg", description: "A bright, comforting recipe made for easy home cooking.", tags: ["dinner","butternut","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"chicken"},{"q":1,"u":"cup","n":"rice"},{"q":1,"u":"cup","n":"vegetables"},{"q":2,"u":"tbsp","n":"sauce"},{"q":1,"u":"tbsp","n":"oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r53", title: "Teriyaki Chicken Bowls", category: "Dinner", time: 30, difficulty: "Medium", servings: 2, story: "The story of Teriyaki Chicken Bowls started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://melorecipes.com/wp-content/uploads/2025/06/teriyaki-chicken-bowl-2025-06-11-105009.webp", description: "A simple favorite designed for relaxed meals and busy days.", tags: ["dinner","teriyaki","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"salmon"},{"q":2,"u":"tbsp","n":"glaze"},{"q":2,"u":"cup","n":"vegetables"},{"q":1,"u":"tbsp","n":"lemon juice"},{"q":1,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r54", title: "Baked Ziti", category: "Dinner", time: 50, difficulty: "Medium", servings: 2, story: "The story of Baked Ziti started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1677511084683-0eba66ebaa7c?auto=format&fit=crop&w=1200&q=85", description: "A colorful dish that turns everyday ingredients into something special.", tags: ["dinner","baked","flavorlyst"], ingredients: [{"q":1,"u":"lb","n":"ground beef"},{"q":8,"u":"small","n":"tortillas"},{"q":1,"u":"tbsp","n":"seasoning"},{"q":1,"u":"cup","n":"lettuce"},{"q":0.5,"u":"cup","n":"cheese"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r55", title: "Coconut Chickpea Curry", category: "Dinner", time: 30, difficulty: "Easy", servings: 2, story: "The story of Coconut Chickpea Curry started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1627906296851-6d9c5e4db592?auto=format&fit=crop&w=1200&q=85", description: "A cozy recipe with familiar flavors and a little Flavorlyst magic.", tags: ["dinner","coconut","flavorlyst"], ingredients: [{"q":8,"u":"oz","n":"pasta"},{"q":1,"u":"cup","n":"sauce"},{"q":1,"u":"cup","n":"vegetables"},{"q":0.5,"u":"cup","n":"cheese"},{"q":1,"u":"tbsp","n":"olive oil"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
  { id: "r56", title: "BBQ Chicken Flatbread", category: "Dinner", time: 25, difficulty: "Easy", servings: 2, story: "The story of BBQ Chicken Flatbread started with a home cook looking for a meal that felt special without being complicated. It became a repeat favorite because the ingredients are familiar, the process is approachable, and the finished dish is worth gathering around the table for. This Flavorlyst version keeps that easygoing spirit.", author: "Flavorlyst Kitchen", image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85", description: "A fresh, satisfying idea that is easy to make and fun to share.", tags: ["dinner","bbq","flavorlyst"], ingredients: [{"q":1,"u":"can","n":"chickpeas"},{"q":1,"u":"cup","n":"coconut milk"},{"q":1,"u":"cup","n":"tomato sauce"},{"q":1,"u":"cup","n":"spinach"},{"q":1,"u":"tbsp","n":"curry powder"}], steps: ["Prepare and season the ingredients.","Cook everything until tender, golden, or fully cooked.","Combine the finished ingredients and serve warm."] },
];

const curatedStarterRecipeImages = {
  "r1": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
  "r2": "https://cdn.emmasrezepte.de/images/7759f88f-8cf7-4fb6-9af8-1404c00c07c7_U3_b2988d31.webp",
  "r3": "https://images.unsplash.com/photo-1623052935410-3fca63f73e10?auto=format&fit=crop&w=1200&q=85",
  "r4": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=85",
  "r5": "https://images.unsplash.com/photo-1741732666754-392caf4bea63?auto=format&fit=crop&w=1200&q=85",
  "r6": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
  "r7": "https://homesteadspoon.com/assets/images/1768874996392-7p5atynu.webp",
  "r8": "https://art.whisk.com/image/upload/fl_progressive%2Ch_560%2Cw_560%2Cc_fill%2Cdpr_2/v1762905710741/recipe/ae1148058a132ff01eaabc8a703c818a.jpg",
  "r9": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=85",
  "r10": "https://img.siterank.app/topic/cinnamon-apple-oatmeal-bowl-recipe.png",
  "r11": "https://static.wixstatic.com/media/a59d97_0f014a03ee1c4006baf5db02e476d6be~mv2.png/v1/fill/w_800%2Ch_1000%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01/a59d97_0f014a03ee1c4006baf5db02e476d6be~mv2.png",
  "r12": "https://pbs.twimg.com/media/F_Zbjw4XAAAEmVy.jpg",
  "r13": "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/omelette_with_spinach_and_feta.jpg",
  "r14": "https://naoq8gawh7kpd7sm.public.blob.vercel-storage.com/Mango%20smoothie%20recept-bqWDFsk2mMmQ8Hj988d1goAhD78u1O.webp",
  "r15": "https://cupofyum.com/uploads/images/000/074/422/74422-breakfast-hash-cb64e195f782bfe4564a78a5af177b09.jpg",
  "r16": "https://media-assets.swiggy.com/swiggy/image/upload/f_auto%2Cq_auto%2Cfl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2025/5/30/2884d4ad-64ab-44f3-9329-f6f27f1657f2_1093096.jpg",
  "r17": "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/greek_yogurt_parfait.jpg",
  "r18": "https://www.tastingtable.com/img/gallery/the-best-way-to-cook-your-eggs-for-a-savory-breakfast-quesadilla/intro-1713881170.jpg",
  "r19": "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/recipe_pics_v2/medium/maple_brown_sugar_oatmeal.jpg",
  "r20": "https://forktionary.s3.us-east-2.amazonaws.com/prod/images/recipe-image-16158.png",
  "r21": "https://mealprepedia.com/wp-content/uploads/2025/06/Tomato-Basil-Egg-Toast.webp",
  "r22": "https://d1w7312wesee68.cloudfront.net/uHCHaSjsChGJoBO2piPvxwnQ_PEntfm_JsYabDeBsDc/resize%3Afit%3A720%3A720/plain/s3%3A/toasttab/menu_service/restaurants/ccbe2d96-d203-46b9-a3dc-f86ca6184c6e/MenuItem/46a91df6-1b6f-44b1-bdad-1985da30d465.jpg",
  "r23": "https://www.feastingathome.com/wp-content/uploads/2023/06/caprese-pasta-salad-11.jpg",
  "r24": "https://www.therandomrecipe.com/_next/image?q=75&url=https%3A%2F%2Fd2aq0yf1s46hyj.cloudfront.net%2Ftherandomrecipe%2F205.png&w=3840",
  "r25": "https://images.unsplash.com/photo-1606070781631-a7e961f84c9e?auto=format&fit=crop&w=1200&q=85",
  "r26": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85",
  "r27": "https://images.unsplash.com/photo-1528735602780-2552fd46c7b?auto=format&fit=crop&w=1200&q=85",
  "r28": "https://images.unsplash.com/photo-1582034986517-30d163aa1da9?auto=format&fit=crop&w=1200&q=85",
  "r29": "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=85",
  "r30": "https://domesticate-me.com/wp-content/uploads/2021/04/Lemon-Herb-Couscous-1.jpg",
  "r31": "https://recipesbybianca.com/assets/images/1768707024409-4ujxiae4.webp",
  "r32": "https://storage.googleapis.com/fpoo-public-bucket/img/Recipes/flatbread-margherita.jpg",
  "r33": "https://cdn.juliesdish.com/images/featured_image_row_4_a490f1a7-dc.jpg?w=1920",
  "r34": "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7a?auto=format&fit=crop&w=1200&q=85",
  "r35": "https://images.unsplash.com/photo-1644898955763-682dbe5127ac?auto=format&fit=crop&w=1200&q=85",
  "r36": "https://sweetbananachef.com/wp-content/uploads/2025/06/0-1-640-N-151.jpg",
  "r37": "https://eatthegains.com/wp-content/uploads/2018/09/Beef-and-Broccoli-10.jpg",
  "r38": "https://cupofyum.com/uploads/images/000/021/579/21579-pesto-salmon-sheet-pan-meal-4fe8f82801c910660a5d4a8c40a55abd.jpg",
  "r39": "https://i.pinimg.com/736x/3e/1c/23/3e1c23c98e9fe96a1fe4454224eaacf4.jpg",
  "r40": "https://itsonly.recipes/images/recipeimages/vegetable-curry.webp",
  "r41": "https://myhomemademeal.com/assets/images/1747159667177-7jkkf3cv.webp",
  "r42": "https://img.siterank.app/topic/home-cooked-lemon-chicken-dish-recipe.png",
  "r43": "https://d1yfn1dfres2va.cloudfront.net/013/e1/16/e116e9908d54fc540870bdf16ffb4d60_640m.jpg",
  "r44": "https://hips.hearstapps.com/hmg-prod/images/1506456214-delish-honey-garlic-glazed-salmon-1662057850.jpg?crop=1xw%3A1xh%3Bcenter%2Ctop&resize=980%3A%2A",
  "r45": "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/veg_fried_rice.jpg",
  "r46": "https://itsonly.recipes/images/recipeimages/heritage-chicken-parmigiana.webp",
  "r47": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85",
  "r48": "https://www.thecookingrecipes.com/wp-content/uploads/2025/07/creamy-garlic-chicken-skillet-recipe-with-herb-sauce.webp",
  "r49": "https://images.mrcook.app/recipe-image/018fd9d1-0e95-7d40-b5c2-da70f64e5502",
  "r50": "https://bitsandbitesblog.com/wp-content/uploads/2023/04/pesto-gnocchi-recipe-5-of-6-700x1050.jpg",
  "r51": "https://v.cdn.ww.com/media/system/wine/625d997905d20000104b3464/4075a9f9-eb2a-41a5-b295-21f8b7f0a6c2/y9kcevu6v0ubvlfwcykx.jpg?auto=webp&enable=upscale&fit=crop&height=800&optimize=medium&quality=80&width=800",
  "r52": "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/recipe_pics_v2/medium/pasta_with_roasted_butternut_squash_and_sage.jpg",
  "r53": "https://melorecipes.com/wp-content/uploads/2025/06/teriyaki-chicken-bowl-2025-06-11-105009.webp",
  "r54": "https://images.unsplash.com/photo-1677511084683-0eba66ebaa7c?auto=format&fit=crop&w=1200&q=85",
  "r55": "https://images.unsplash.com/photo-1627906296851-6d9c5e4db592?auto=format&fit=crop&w=1200&q=85",
  "r56": "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85"
};

const recipeImageChoices = [
  { words: /strawberry.*chia|chia.*pudding/i, image: "https://images.unsplash.com/photo-1618798513386-fedeb5c30d39?auto=format&fit=crop&w=1200&q=85" },
  { words: /berry.*breakfast|breakfast.*berry/i, image: "https://images.unsplash.com/photo-1623052935410-3fca63f73e10?auto=format&fit=crop&w=1200&q=85" },
  { words: /french toast/i, image: "https://images.unsplash.com/photo-1740555274750-2ced1ce0fdf3?auto=format&fit=crop&w=1200&q=85" },
  { words: /quesadilla/i, image: "https://images.unsplash.com/photo-1647545401800-bd8f77e670ed?auto=format&fit=crop&w=1200&q=85" },
  { words: /breakfast hash|hash/i, image: "https://images.unsplash.com/photo-1712746785233-590cd63d6941?auto=format&fit=crop&w=1200&q=85" },
  { words: /blueberry.*pancake|pancake/i, image: "https://images.unsplash.com/photo-1650134973809-d8c3a2da59ba?auto=format&fit=crop&w=1200&q=85" },
  { words: /waffle/i, image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1200&q=85" },
  { words: /oatmeal|porridge/i, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85" },
  { words: /smoothie/i, image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=85" },
  { words: /avocado toast/i, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85" },
  { words: /peanut butter.*banana.*toast|banana.*toast/i, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85" },
  { words: /omelet|omelette/i, image: "https://images.unsplash.com/photo-1510696512221-31c1f5e2f7f7?auto=format&fit=crop&w=1200&q=85" },
  { words: /greek yogurt parfait|parfait/i, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85" },
  { words: /tomato.*egg.*toast|egg.*toast/i, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85" },
  { words: /caesar.*wrap|caesar.*salad/i, image: "https://images.unsplash.com/photo-1582034986517-30d163aa1da9?auto=format&fit=crop&w=1200&q=85" },
  { words: /hummus bowl|hummus/i, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85" },
  { words: /garlic butter shrimp|shrimp/i, image: "https://images.unsplash.com/photo-1644898955763-682dbe5127ac?auto=format&fit=crop&w=1200&q=85" },
  { words: /chicken tikka/i, image: "https://images.unsplash.com/photo-1757715377671-01c20cfa1880?auto=format&fit=crop&w=1200&q=85" },
  { words: /beef.*broccoli|broccoli.*beef|stir.?fry/i, image: "https://images.unsplash.com/photo-1606070781631-a7e961f84c9e?auto=format&fit=crop&w=1200&q=85" },
  { words: /pesto salmon|honey garlic salmon|salmon/i, image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=85" },
  { words: /vegetable curry|chickpea curry|curry/i, image: "https://images.unsplash.com/photo-1627906296851-6d9c5e4db592?auto=format&fit=crop&w=1200&q=85" },
  { words: /taco|enchilada/i, image: "https://images.unsplash.com/photo-1552332386-f8dd00dc8f85?auto=format&fit=crop&w=1200&q=85" },
  { words: /pasta|noodle|spaghetti|lasagna|ziti|gnocchi|stuffed shells/i, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85" },
  { words: /salad|cucumber|greens|couscous|eggplant/i, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85" },
  { words: /chicken|turkey|pork|sausage|steak|beef|meat/i, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85" },
  { words: /rice|teriyaki|bowl/i, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=85" },
  { words: /sandwich|wrap|pita/i, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7b?auto=format&fit=crop&w=1200&q=85" },
  { words: /flatbread|pizza/i, image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85" },
  { words: /toast|egg/i, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85" }
];

const getAutomaticRecipeImage = (title, ingredients = []) => {
  const searchText = ((title || "") + " " + ingredients.map(i => i.n || "").join(" ")).toLowerCase();
  const match = recipeImageChoices.find(choice => choice.words.test(searchText));
  return match?.image || "https://images.unsplash.com/photo-1623052935410-3fca63f73e10?auto=format&fit=crop&w=1200&q=85";
};

const addMissingRecipeImages = list => Array.isArray(list)
  ? list.map(recipe => {
      if (!recipe) return recipe;
      if (curatedStarterRecipeImages[recipe.id]) return {...recipe, image: curatedStarterRecipeImages[recipe.id]};
      return recipe.image ? recipe : {...recipe, image: getAutomaticRecipeImage(recipe.title || "", recipe.ingredients || [])};
    })
  : list;

const initialPlanner = {
  Monday: "r1", Tuesday: "r2", Wednesday: null, Thursday: "r4", Friday: null, Saturday: "r6", Sunday: null
};

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }

function App() {
  const [recipes, setRecipes] = useState(() => addMissingRecipeImages(load("recipe-recipes", starterRecipes)));
  const [favorites, setFavorites] = useState(() => load("recipe-favorites", ["r1","r5"]));
  const [planner, setPlanner] = useState(() => load("recipe-planner", initialPlanner));
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Any");
  const [difficultyFilter, setDifficultyFilter] = useState("Any");
  const [dietFilter, setDietFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [servings, setServings] = useState(2);
  const [showInstall, setShowInstall] = useState(false);
  const [darkMode, setDarkMode] = useState(() => load("flavorlyst-dark-mode", false));
  const [newRecipe, setNewRecipe] = useState({title:"",description:"",category:"Dinner",time:30,servings:2,image:"",ingredients:"",steps:""});
  const [aiStatus, setAiStatus] = useState("");

  useEffect(() => {
    const current = load("recipe-recipes", starterRecipes);
    const upgraded = addMissingRecipeImages(current);
    if (JSON.stringify(upgraded) !== JSON.stringify(current)) {
      save("recipe-recipes", upgraded);
      setRecipes(upgraded);
    }
  }, []);

  
  const categories = ["All","Breakfast","Lunch","Dinner"];
  const filtered = useMemo(() => {
    let result = recipes.filter(r => {
      const q = search.toLowerCase().trim();
      const matchesText = !q || r.title.toLowerCase().includes(q) || r.tags.some(t => t.includes(q)) || r.ingredients.some(i => i.n.toLowerCase().includes(q));
      const matchesCategory = category === "All" || r.category === category;
      const matchesTime = timeFilter === "Any" || (timeFilter === "15 min or less" ? r.time <= 15 : timeFilter === "30 min or less" ? r.time <= 30 : r.time <= 60);
      const matchesDifficulty = difficultyFilter === "Any" || r.difficulty === difficultyFilter;
      const ingredientText = (r.ingredients || []).map(i => (i.n || "").toLowerCase()).join(" ");
      const meatWords = /chicken|beef|pork|turkey|bacon|ham|sausage|salmon|tuna|shrimp|fish|meat|anchovy|gelatin|lamb|steak|prosciutto/.test(ingredientText);
      const animalProductWords = /milk|cream|cheese|parmesan|feta|yogurt|butter|egg|honey|whey|mozzarella|ghee|mayonnaise|mayo/.test(ingredientText);
      const isVegetarian = !meatWords;
      const isVegan = !meatWords && !animalProductWords;
      const matchesDiet = dietFilter === "All" || (dietFilter === "Vegetarian" ? isVegetarian : isVegan);
      return matchesText && matchesCategory && matchesTime && matchesDifficulty && matchesDiet;
    });
    if (sortFilter === "Rating") result.sort((a,b)=>(b.rating||0)-(a.rating||0));
    if (sortFilter === "Quickest") result.sort((a,b)=>a.time-b.time);
    if (sortFilter === "Newest") result.sort((a,b)=>b.id.localeCompare(a.id));
    return result;
  }, [recipes, search, category, timeFilter, difficultyFilter, dietFilter, sortFilter]);

  const suggestions = useMemo(() => recipes.filter(r => !favorites.includes(r.id)).slice(0,4), [recipes, favorites]);
  const selectedRecipe = recipes.find(r => r.id === selected);

  const update = (key, value, setter) => { setter(value); save(key,value); };
  const toggleFavorite = id => {
    const next = favorites.includes(id) ? favorites.filter(x=>x!==id) : [...favorites,id];
    update("recipe-favorites", next, setFavorites);
  };
  const localRecipeCheck = (recipe, ingredients, steps) => {
    const clean = text => text.trim().replace(/\s+/g, " ");
    const title = clean(recipe.title || "");
    const description = clean(recipe.description || "");
    const ingredientNames = ingredients.map(i => clean(i.n).toLowerCase()).filter(Boolean);
    const stepText = steps.map(clean).filter(Boolean);
    const titleWords = title.toLowerCase().split(/\s+/).filter(Boolean);

    const foodWords = /chicken|beef|pork|turkey|bacon|ham|sausage|salmon|tuna|shrimp|fish|steak|pasta|noodle|rice|potato|bread|toast|sandwich|soup|salad|pizza|taco|burrito|curry|pancake|waffle|cake|cookie|brownie|muffin|oatmeal|egg|cheese|chocolate|apple|banana|berry|berries|tomato|bean|beans|lentil|vegetable|avocado|yogurt|smoothie|chili|stew|casserole|lasagna|burger|wrap|chicken|garlic|lemon/.test((title + " " + ingredientNames.join(" ")).toLowerCase());

    const nonsense = /^(asdf|qwerty|test|hello|blah|lorem|abc|123)+$/i.test(title.replace(/\s/g, ""));
    const hasQuantity = ingredients.some(i => Number(i.q) > 0);
    const hasAction = stepText.some(s => /add|mix|stir|cook|bake|boil|fry|heat|bowl|serve|chop|slice|blend|whisk|combine|season|place|pour|toast|grill|roast|preheat/i.test(s));

    const valid = title.length >= 3 &&
      ingredients.length >= 2 &&
      stepText.length >= 2 &&
      hasQuantity &&
      hasAction &&
      foodWords &&
      !nonsense;

    const polishedTitle = title
      .replace(/\s+/g, " ")
      .replace(/(^|[.!?]\s+)([a-z])/g, (_, p, ch) => p + ch.toUpperCase());

    return {
      valid,
      reason: valid ? "Recipe check passed." : "Please enter a real, coherent recipe with a food title, at least two ingredients, quantities, and at least two cooking steps.",
      title: polishedTitle,
      description,
      category: recipe.category,
      time: Number(recipe.time) || 30,
      difficulty: "Easy",
      servings: Number(recipe.servings) || 2,
      story: buildRecipeStory(polishedTitle, recipe.category),
      tags: titleWords.slice(0, 4),
      ingredients: ingredients.map(i => ({...i, n: clean(i.n)})),
      steps: stepText.map(s => s.charAt(0).toUpperCase() + s.slice(1).replace(/(?<![.!?])$/, "."))
    };
  };

  const buildRecipeStory = (title, category) => {
    const meal = category === "Breakfast" ? "morning" : category === "Lunch" ? "midday" : "dinner";
    return `This Flavorlyst recipe, ${title}, was made for a ${meal} when you want something delicious without overcomplicating the kitchen. It brings familiar ingredients together in a simple way that is easy to make, share, and remember.`;
  };

  const isAppropriateRecipeImageUrl = value => {
    if (!value) return true;
    try {
      const url = new URL(value);
      const allowedHost = /(^|\.)images\.unsplash\.com$/i.test(url.hostname);
      const blockedText = /porn|xxx|nsfw|nude|nudity|sex|violence|gore|blood|weapon|gun|drug|cocaine|marijuana|alcohol|beer|wine|casino|gambling/i.test(value);
      return url.protocol === "https:" && allowedHost && !blockedText;
    } catch {
      return false;
    }
  };

  const createRecipe = e => {
    e.preventDefault();
    if (aiStatus === "Checking recipe…") return;

    setAiStatus("Checking recipe…");

    const parsedIngredients = newRecipe.ingredients.split("\n").map(line => {
      const p = line.split("|");
      return { q: Number(p[0]) || 1, u: p[1]?.trim() || "", n: p[2]?.trim() || p[0]?.trim() || line.trim() };
    }).filter(i => i.n);

    const parsedSteps = newRecipe.steps.split("\n").map(s => s.trim()).filter(Boolean);
    const checked = localRecipeCheck(newRecipe, parsedIngredients, parsedSteps);

    if (!checked.valid) {
      setAiStatus("⚠️ " + checked.reason);
      return;
    }

    const suppliedImage = newRecipe.image.trim();
    if (suppliedImage && !isAppropriateRecipeImageUrl(suppliedImage)) {
      setAiStatus("⚠️ That photo URL isn't an accepted food-image source. Leave it blank and Flavorlyst will choose a safe food photo automatically.");
      return;
    }

    const selectedImage = suppliedImage || getAutomaticRecipeImage(checked.title, checked.ingredients);

    const recipe = {
      id:"u-"+Date.now(),
      title:checked.title,
      description:checked.description,
      category:checked.category,
      time:checked.time,
      difficulty:checked.difficulty,
      servings:checked.servings,
      author:"You",
      story:checked.story,
      image:selectedImage,
      tags:checked.tags,
      ingredients:checked.ingredients,
      steps:checked.steps
    };

    const next=[recipe,...recipes];
    update("recipe-recipes",next,setRecipes);
    setNewRecipe({title:"",description:"",category:"Dinner",time:30,servings:2,image:"",ingredients:"",steps:""});
    setAiStatus("");
    setSelected(recipe.id);
    setServings(recipe.servings);
    setView("recipe");
  };

  const scaledIngredients = selectedRecipe?.ingredients.map(i => ({...i, q:i.q*(servings/selectedRecipe.servings)}));

  const hero = recipes[0];
  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <header className="topbar">
        <button className="brand" onClick={()=>setView("home")}><span className="brand-mark">✦</span><span>Flavor<span className="brand-accent">lyst</span></span></button>
        <div className="desktop-search"><span>⌕</span><input value={search} onChange={e=>{setSearch(e.target.value);setView("explore")}} placeholder="Search recipes, ingredients..." /></div>
<button className="theme-btn" onClick={() => { const next = !darkMode; setDarkMode(next); save("flavorlyst-dark-mode", next); }} aria-label="Toggle dark mode">{darkMode ? "☀" : "☾"}</button><button className="install-btn" onClick={()=>setShowInstall(true)}>Install App</button>
      </header>

      {view==="home" && <main className="home-page">
        <section className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(12,21,16,.9),rgba(12,21,16,.2)),url(${hero.image})`}}>
          <div className="hero-content"><span className="eyebrow">WELCOME TO FLAVORLYST</span><h1>Good food starts with a great idea.</h1><p>Discover recipes, save favorites, and plan your week.</p><div className="hero-actions"><button className="primary" onClick={()=>setView("explore")}>Explore recipes</button><button className="glass" onClick={()=>setView("add")}>＋ Add a recipe</button></div></div>
        </section>
        <section className="section"><div className="section-head"><div><span className="eyebrow dark">DISCOVER</span><h2>What are you craving?</h2></div><button className="text-btn" onClick={()=>setView("explore")}>See all →</button></div>
          <div className="chips">{categories.map(c=><button className={category===c?"chip active":"chip"} key={c} onClick={()=>{setCategory(c);setView("explore")}}>{c}</button>)}</div>
          <RecipeGrid recipes={filtered.slice(0,4)} onOpen={id=>{setSelected(id);setServings(recipes.find(r=>r.id===id).servings);setView("recipe")}} favorites={favorites} onFavorite={toggleFavorite}/>
        </section>
        <section className="section soft"><div className="section-head"><div><span className="eyebrow dark">PERSONALIZED</span><h2>Picked for you</h2></div></div><RecipeGrid recipes={suggestions} onOpen={id=>{setSelected(id);setView("recipe")}} favorites={favorites} onFavorite={toggleFavorite}/></section>
      </main>}

      {view==="explore" && <main className="page explore-page">
        <div className="explore-heading"><div><span className="eyebrow dark">EXPLORE</span><h1>Find something delicious</h1><p>Search by recipe, ingredient, or tag.</p></div><span className="result-count">{filtered.length} recipes</span></div>
        <div className="search-panel large-search"><span>⌕</span><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search chicken, pasta, quick meals..."/><button className="filter-toggle" onClick={()=>setShowFilters(!showFilters)}>☷ Filters</button></div>
        <div className="chips category-row">{categories.map(c=><button className={category===c?"chip active":"chip"} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
        {showFilters && <div className="filter-panel">
          <label>Cooking time<select value={timeFilter} onChange={e=>setTimeFilter(e.target.value)}><option>Any</option><option>15 min or less</option><option>30 min or less</option><option>60 min or less</option></select></label>
          <label>Difficulty<select value={difficultyFilter} onChange={e=>setDifficultyFilter(e.target.value)}><option>Any</option><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
          <label>Diet<select value={dietFilter} onChange={e=>setDietFilter(e.target.value)}><option>All</option><option>Vegetarian</option><option>Vegan</option></select></label>
          <label>Sort by<select value={sortFilter} onChange={e=>setSortFilter(e.target.value)}><option>Recommended</option><option>Quickest</option><option>Newest</option></select></label>
          <button className="clear-filters" onClick={()=>{setCategory("All");setTimeFilter("Any");setDifficultyFilter("Any");setDietFilter("All");setSortFilter("Recommended");setSearch("");}}>Clear all</button>
        </div>}
        <RecipeGrid recipes={filtered} onOpen={id=>{setSelected(id);setServings(recipes.find(r=>r.id===id).servings);setView("recipe")}} favorites={favorites} onFavorite={toggleFavorite}/>
      </main>}

      {view==="recipe" && selectedRecipe && <main className="recipe-page">
        <div className="recipe-cover" style={{backgroundImage:`linear-gradient(0deg,rgba(8,12,10,.78),rgba(8,12,10,.05)),url(${selectedRecipe.image || getAutomaticRecipeImage(selectedRecipe.title, selectedRecipe.ingredients || [])})`}}><button className="back" onClick={()=>setView("home")}>← Back</button><div className="cover-bottom"><span className="pill">{selectedRecipe.category}</span><h1>{selectedRecipe.title}</h1><p>By {selectedRecipe.author}</p></div></div>
        <div className="recipe-layout"><div><section className="recipe-card story-card"><span className="eyebrow dark">THE STORY BEHIND IT</span><h2>A little history with your meal</h2><p>{selectedRecipe.story || `Every recipe has a story. This one was created by ${selectedRecipe.author || "a home cook"} and shared with the Flavorlyst community as a recipe worth passing along.`}</p></section><section className="recipe-card"><div className="card-head"><h2>Ingredients</h2></div><div className="servings"><span>Servings</span><button onClick={()=>setServings(Math.max(1,servings-1))}>−</button><b>{servings}</b><button onClick={()=>setServings(servings+1)}>＋</button><small>Scaled automatically</small></div><ul className="ingredients">{scaledIngredients.map((i,idx)=><li key={idx}><b>{Number.isInteger(i.q)?i.q:i.q.toFixed(1)}</b><span>{i.u}</span><span>{i.n}</span></li>)}</ul></section><section className="recipe-card"><h2>How to make it</h2><div className="steps">{selectedRecipe.steps.map((s,i)=><div className="step" key={i}><span>{i+1}</span><p>{s}</p></div>)}</div></section></div></div>
      </main>}

      {view==="add" && <main className="page narrow"><div className="page-title"><span className="eyebrow dark">CREATE</span><h1>Add your recipe</h1><p>Share something delicious with the community.</p></div><form className="form-card" onSubmit={createRecipe}><label>Recipe title<input required value={newRecipe.title} onChange={e=>setNewRecipe({...newRecipe,title:e.target.value})} placeholder="e.g. Grandma's Sunday Lasagna"/></label><label>Recipe photo URL <small>Optional — leave blank and Flavorlyst will choose a food photo automatically.</small><input value={newRecipe.image} onChange={e=>setNewRecipe({...newRecipe,image:e.target.value})} placeholder="Optional: paste an Unsplash food-image URL"/></label><div className="two"><label>Category<select value={newRecipe.category} onChange={e=>setNewRecipe({...newRecipe,category:e.target.value})}><option>Breakfast</option><option>Lunch</option><option>Dinner</option></select></label><label>Servings<input type="number" min="1" value={newRecipe.servings} onChange={e=>setNewRecipe({...newRecipe,servings:e.target.value})}/></label></div><label>Description<textarea value={newRecipe.description} onChange={e=>setNewRecipe({...newRecipe,description:e.target.value})} placeholder="What makes this recipe special?"/></label><label>Ingredients <small>One per line: quantity | unit | ingredient</small><textarea required value={newRecipe.ingredients} onChange={e=>setNewRecipe({...newRecipe,ingredients:e.target.value})} placeholder={"2 | cups | flour\n1 | tsp | salt\n3 | | eggs"}/></label><label>Steps <small>One step per line</small><textarea required value={newRecipe.steps} onChange={e=>setNewRecipe({...newRecipe,steps:e.target.value})} placeholder={"Mix the ingredients.\nBake until golden.\nServe warm."}/></label><button className="primary big" type="submit" disabled={aiStatus==="Checking recipe…"}>{aiStatus==="Checking recipe…" ? "✨ AI is checking…" : "✨ Check recipe with AI & publish"}</button>{aiStatus && <p className="ai-status">{aiStatus}</p>}</form></main>}

      {view==="planner" && <main className="page"><div className="page-title"><span className="eyebrow dark">PLAN AHEAD</span><h1>Weekly meal planner</h1><p>Build your week with your favorite recipes.</p></div><div className="planner">{Object.entries(planner).map(([day,id])=><div className="day" key={day}><b>{day}</b>{id ? <div className="planned" style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.62),transparent),url(${recipes.find(r=>r.id===id)?.image || getAutomaticRecipeImage(recipes.find(r=>r.id===id)?.title || "", recipes.find(r=>r.id===id)?.ingredients || [])})`}}><span>{recipes.find(r=>r.id===id)?.title}</span><button onClick={()=>{const next={...planner,[day]:null};update("recipe-planner",next,setPlanner)}}>×</button></div> : <select value="" onChange={e=>{const next={...planner,[day]:e.target.value};update("recipe-planner",next,setPlanner)}}><option value="">＋ Add recipe</option>{recipes.map(r=><option key={r.id} value={r.id}>{r.title}</option>)}</select>}</div>)}</div></main>}

      {view==="saved" && <main className="page"><div className="page-title"><span className="eyebrow dark">YOUR COLLECTION</span><h1>Saved recipes</h1><p>Your favorites, all in one place.</p></div><RecipeGrid recipes={recipes.filter(r=>favorites.includes(r.id))} onOpen={id=>{setSelected(id);setServings(recipes.find(r=>r.id===id).servings);setView("recipe")}} favorites={favorites} onFavorite={toggleFavorite}/></main>}

      {showInstall && <div className="modal-wrap" onClick={()=>setShowInstall(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-x" onClick={()=>setShowInstall(false)}>×</button><div className="install-icon">✦</div><h2>Install Flavorlyst</h2><p>Use your browser's <b>Add to Home Screen</b> option to keep your recipe app handy. On supported browsers, use the install button in the address bar.</p><button className="primary full" onClick={()=>setShowInstall(false)}>Got it</button></div></div>}


      <nav className="bottom-nav"><Nav icon="⌂" label="Home" active={view==="home"} onClick={()=>setView("home")}/><Nav icon="⌕" label="Explore" active={view==="explore"} onClick={()=>setView("explore")}/><button className="add-nav" onClick={()=>setView("add")}>＋</button><Nav icon="▣" label="Planner" active={view==="planner"} onClick={()=>setView("planner")}/><Nav icon="♡" label="Saved" active={view==="saved"} onClick={()=>setView("saved")}/></nav>
    </div>
  );
}

function Nav({icon,label,active,onClick}) { return <button className={active?"nav-item active":"nav-item"} onClick={onClick}><span>{icon}</span><small>{label}</small></button>; }

function RecipeGrid({recipes,onOpen,favorites,onFavorite}) {
  if (!recipes.length) return <div className="empty">No recipes found yet.</div>;
  return <div className="recipe-grid">{recipes.map(r=><article className="recipe-card-tile" key={r.id}>
    <button className="tile-image" onClick={()=>onOpen(r.id)}>
      <img src={r.image || getAutomaticRecipeImage(r.title, r.ingredients || [])} alt={r.title} loading="lazy"
        onError={e=>{
          const fallback=getAutomaticRecipeImage(r.title,r.ingredients||[]);
          if(e.currentTarget.dataset.fallback!=="1" && e.currentTarget.src!==fallback){
            e.currentTarget.dataset.fallback="1";
            e.currentTarget.src=fallback;
          } else {
            e.currentTarget.style.display="none";
            e.currentTarget.parentElement.classList.add("image-fallback");
          }
        }} />
      <span className="tile-image-shade" />
      <span className="tile-time">{r.time} min</span>
      <span className="tile-title">{r.title}</span>
    </button>
    <div className="tile-meta"><div><span>{r.difficulty}</span></div><button onClick={()=>onFavorite(r.id)} className="heart">{favorites.includes(r.id)?"♥":"♡"}</button></div>
  </article>)}</div>;
}

export default App;
