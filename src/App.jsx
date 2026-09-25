import React, { useMemo, useState } from "react";

const starterRecipes = [
  {
    id: "r1", title: "Creamy Tuscan Pasta", category: "Dinner", time: 30, difficulty: "Easy", servings: 2,
    rating: 4.8, ratingCount: 126, author: "Kitchen Collective",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
    description: "Silky pasta with garlic, spinach, tomatoes, and Parmesan.",
    tags: ["pasta", "quick", "vegetarian"],
    ingredients: [{q: 8,u:"oz",n:"pasta"},{q:1,u:"tbsp",n:"olive oil"},{q:2,u:"clove",n:"garlic"},{q:1,u:"cup",n:"cherry tomatoes"},{q:2,u:"cup",n:"spinach"},{q:0.5,u:"cup",n:"heavy cream"},{q:0.5,u:"cup",n:"Parmesan"}],
    steps: ["Cook pasta until al dente and reserve a little pasta water.","Sauté garlic and tomatoes in olive oil.","Add spinach and cream; simmer briefly.","Toss with pasta and Parmesan, adding pasta water as needed."]
  },
  {
    id: "r2", title: "Crispy Honey Chicken", category: "Dinner", time: 35, difficulty: "Medium", servings: 4,
    rating: 4.9, ratingCount: 208, author: "Mia's Kitchen",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85",
    description: "Golden chicken glazed with a sweet, tangy honey sauce.",
    tags: ["chicken", "family", "high-protein"],
    ingredients: [{q:1.5,u:"lb",n:"chicken breast"},{q:0.5,u:"cup",n:"flour"},{q:2,u:"tbsp",n:"olive oil"},{q:0.25,u:"cup",n:"honey"},{q:2,u:"tbsp",n:"soy sauce"},{q:1,u:"tbsp",n:"lemon juice"}],
    steps: ["Cut chicken into bite-size pieces and coat lightly in flour.","Pan-cook until golden and cooked through.","Whisk honey, soy sauce, and lemon juice.","Pour sauce over chicken and toss until glossy."]
  },
  {
    id: "r3", title: "Berry Breakfast Bowl", category: "Breakfast", time: 10, difficulty: "Easy", servings: 1,
    rating: 4.7, ratingCount: 94, author: "Fresh Start",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1200&q=85",
    description: "A bright yogurt bowl loaded with berries, banana, and crunchy toppings.",
    tags: ["breakfast", "fruit", "quick"],
    ingredients: [{q:1,u:"cup",n:"Greek yogurt"},{q:0.5,u:"cup",n:"berries"},{q:0.5,u:"",n:"banana"},{q:2,u:"tbsp",n:"granola"},{q:1,u:"tbsp",n:"honey"}],
    steps: ["Add yogurt to a bowl.","Top with berries and sliced banana.","Finish with granola and honey."]
  },
  {
    id: "r4", title: "Roasted Garlic Tomato Soup", category: "Lunch", time: 45, difficulty: "Easy", servings: 4,
    rating: 4.6, ratingCount: 77, author: "Home Table",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=85",
    description: "Roasted tomatoes and garlic blended into a comforting soup.",
    tags: ["soup", "vegetarian", "comfort"],
    ingredients: [{q:2,u:"lb",n:"tomatoes"},{q:1,u:"head",n:"garlic"},{q:2,u:"tbsp",n:"olive oil"},{q:3,u:"cup",n:"vegetable broth"},{q:0.25,u:"cup",n:"cream"}],
    steps: ["Roast tomatoes and garlic with olive oil until caramelized.","Blend with warm vegetable broth.","Simmer until smooth and season to taste.","Stir in cream before serving."]
  },
  {
    id: "r5", title: "Avocado Toast", category: "Breakfast", time: 8, difficulty: "Easy", servings: 1,
    rating: 4.5, ratingCount: 51, author: "Everyday Eats",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=1200&q=85",
    description: "Creamy avocado on crisp toast with lemon and chili.",
    tags: ["breakfast", "quick"],
    ingredients: [{q:2,u:"slice",n:"bread"},{q:1,u:"",n:"avocado"},{q:1,u:"tsp",n:"lemon juice"},{q:1,u:"pinch",n:"chili flakes"}],
    steps: ["Toast the bread.","Mash avocado with lemon juice.","Spread over toast and finish with chili flakes."]
  },
  {
    id: "r6", title: "Garden Greek Salad", category: "Lunch", time: 15, difficulty: "Easy", servings: 2,
    rating: 4.8, ratingCount: 113, author: "The Green Spoon",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    description: "Crisp vegetables, feta, olives, and a simple lemon dressing.",
    tags: ["salad", "vegetarian", "quick"],
    ingredients: [{q:2,u:"cup",n:"cucumber"},{q:2,u:"cup",n:"tomato"},{q:0.5,u:"cup",n:"feta"},{q:0.25,u:"cup",n:"olives"},{q:2,u:"tbsp",n:"olive oil"},{q:1,u:"tbsp",n:"lemon juice"}],
    steps: ["Chop vegetables and add to a bowl.","Whisk olive oil and lemon juice.","Toss everything together and add feta."]
  }
];

const initialPlanner = {
  Monday: "r1", Tuesday: "r2", Wednesday: null, Thursday: "r4", Friday: null, Saturday: "r6", Sunday: null
};

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }

function App() {
  const [recipes, setRecipes] = useState(() => load("recipe-recipes", starterRecipes));
  const [favorites, setFavorites] = useState(() => load("recipe-favorites", ["r1","r5"]));
  const [planner, setPlanner] = useState(() => load("recipe-planner", initialPlanner));
  const [groceries, setGroceries] = useState(() => load("recipe-groceries", []));
  const [ratings, setRatings] = useState(() => load("recipe-ratings", {}));
  const [comments, setComments] = useState(() => load("recipe-comments", {}));
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Any");
  const [difficultyFilter, setDifficultyFilter] = useState("Any");
  const [sortFilter, setSortFilter] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [ingredientInput, setIngredientInput] = useState("");
  const [servings, setServings] = useState(2);
  const [commentText, setCommentText] = useState("");
  const [showInstall, setShowInstall] = useState(false);
  const [newRecipe, setNewRecipe] = useState({title:"",description:"",category:"Dinner",time:30,servings:2,image:"",ingredients:"",steps:""});
  
  const categories = ["All","Breakfast","Lunch","Dinner"];
  const filtered = useMemo(() => {
    let result = recipes.filter(r => {
      const q = search.toLowerCase().trim();
      const matchesText = !q || r.title.toLowerCase().includes(q) || r.tags.some(t => t.includes(q)) || r.ingredients.some(i => i.n.toLowerCase().includes(q));
      const matchesCategory = category === "All" || r.category === category;
      const matchesTime = timeFilter === "Any" || (timeFilter === "15 min or less" ? r.time <= 15 : timeFilter === "30 min or less" ? r.time <= 30 : r.time <= 60);
      const matchesDifficulty = difficultyFilter === "Any" || r.difficulty === difficultyFilter;
      return matchesText && matchesCategory && matchesTime && matchesDifficulty;
    });
    if (sortFilter === "Rating") result.sort((a,b)=>(b.rating||0)-(a.rating||0));
    if (sortFilter === "Quickest") result.sort((a,b)=>a.time-b.time);
    if (sortFilter === "Newest") result.sort((a,b)=>b.id.localeCompare(a.id));
    return result;
  }, [recipes, search, category, timeFilter, difficultyFilter, sortFilter]);

  const suggestions = useMemo(() => recipes.filter(r => !favorites.includes(r.id)).slice(0,4), [recipes, favorites]);
  const selectedRecipe = recipes.find(r => r.id === selected);
  const ingredientMatches = useMemo(() => {
    const have = ingredientInput.toLowerCase().split(",").map(x=>x.trim()).filter(Boolean);
    if (!have.length) return [];
    return recipes.map(r => {
      const missing = r.ingredients.filter(i => !have.some(h => i.n.toLowerCase().includes(h))).map(i=>i.n);
      return {...r, missing};
    }).sort((a,b)=>a.missing.length-b.missing.length);
  }, [ingredientInput, recipes]);

  const update = (key, value, setter) => { setter(value); save(key,value); };
  const toggleFavorite = id => {
    const next = favorites.includes(id) ? favorites.filter(x=>x!==id) : [...favorites,id];
    update("recipe-favorites", next, setFavorites);
  };
  const addGroceries = (recipe, multiplier = 1) => {
    const additions = recipe.ingredients.map(i => ({id: crypto.randomUUID(), name:i.n, quantity: +(i.q*multiplier).toFixed(2), unit:i.u, recipeId:recipe.id, checked:false}));
    const next = [...groceries, ...additions];
    update("recipe-groceries", next, setGroceries);
  };
  const addComment = () => {
    if (!selectedRecipe || !commentText.trim()) return;
    const next = {...comments, [selectedRecipe.id]: [...(comments[selectedRecipe.id]||[]), {id:crypto.randomUUID(),text:commentText.trim(),author:"You",date:new Date().toLocaleDateString()}]};
    update("recipe-comments",next,setComments); setCommentText("");
  };
  const rate = value => {
    if (!selectedRecipe) return;
    const next = {...ratings,[selectedRecipe.id]:value};
    update("recipe-ratings",next,setRatings);
  };
  const createRecipe = e => {
    e.preventDefault();
    const recipe = {
      id:"u-"+Date.now(), title:newRecipe.title || "Untitled Recipe", description:newRecipe.description,
      category:newRecipe.category, time:Number(newRecipe.time)||30, difficulty:"Easy", servings:Number(newRecipe.servings)||2,
      rating:0, ratingCount:0, author:"You",
      image:newRecipe.image || "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85",
      tags:[], ingredients:newRecipe.ingredients.split("\n").map(line=>{const p=line.split("|"); return {q:Number(p[0])||1,u:p[1]?.trim()||"",n:p[2]?.trim()||p[0]?.trim()||line.trim()};}).filter(i=>i.n),
      steps:newRecipe.steps.split("\n").map(s=>s.trim()).filter(Boolean)
    };
    const next=[recipe,...recipes]; update("recipe-recipes",next,setRecipes); setNewRecipe({title:"",description:"",category:"Dinner",time:30,servings:2,image:"",ingredients:"",steps:""}); setSelected(recipe.id); setView("recipe");
  };
  const scaledIngredients = selectedRecipe?.ingredients.map(i => ({...i, q:i.q*(servings/selectedRecipe.servings)}));
  const plannerGroceries = Object.values(planner).filter(Boolean).map(id=>recipes.find(r=>r.id===id)).filter(Boolean);
  const generateWeekly = () => {
    const items = plannerGroceries.flatMap(r=>r.ingredients.map(i=>({id:crypto.randomUUID(),name:i.n,quantity:i.q,unit:i.u,recipeId:r.id,checked:false})));
    update("recipe-groceries",items,setGroceries);
    setView("planner");
  };

  const hero = recipes[0];
  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={()=>setView("home")}><span className="brand-mark">✦</span><span>Table<span className="brand-accent">ly</span></span></button>
        <div className="desktop-search"><span>⌕</span><input value={search} onChange={e=>{setSearch(e.target.value);setView("explore")}} placeholder="Search recipes, ingredients..." /></div>
        <button className="install-btn" onClick={()=>setShowInstall(true)}>Install App</button>
      </header>

      {view==="home" && <main className="home-page">
        <section className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(12,21,16,.9),rgba(12,21,16,.2)),url(${hero.image})`}}>
          <div className="hero-content"><span className="eyebrow">WELCOME TO TABLELY</span><h1>Good food starts with a great idea.</h1><p>Discover recipes, save favorites, plan your week, and turn every recipe into a shopping list.</p><div className="hero-actions"><button className="primary" onClick={()=>setView("explore")}>Explore recipes</button><button className="glass" onClick={()=>setView("add")}>＋ Add a recipe</button></div></div>
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
          <label>Sort by<select value={sortFilter} onChange={e=>setSortFilter(e.target.value)}><option>Recommended</option><option>Rating</option><option>Quickest</option><option>Newest</option></select></label>
          <button className="clear-filters" onClick={()=>{setCategory("All");setTimeFilter("Any");setDifficultyFilter("Any");setSortFilter("Recommended");setSearch("");}}>Clear all</button>
        </div>}
        <RecipeGrid recipes={filtered} onOpen={id=>{setSelected(id);setServings(recipes.find(r=>r.id===id).servings);setView("recipe")}} favorites={favorites} onFavorite={toggleFavorite}/>
      </main>}

      {view==="recipe" && selectedRecipe && <main className="recipe-page">
        <div className="recipe-cover" style={{backgroundImage:`linear-gradient(0deg,rgba(8,12,10,.78),rgba(8,12,10,.05)),url(${selectedRecipe.image})`}}><button className="back" onClick={()=>setView("home")}>← Back</button><div className="cover-bottom"><span className="pill">{selectedRecipe.category}</span><h1>{selectedRecipe.title}</h1><p>By {selectedRecipe.author} · ★ {selectedRecipe.rating || "New"} {selectedRecipe.ratingCount ? `(${selectedRecipe.ratingCount})` : ""}</p></div></div>
        <div className="recipe-layout"><div><section className="recipe-card"><div className="card-head"><h2>Ingredients</h2><button className="primary small" onClick={()=>addGroceries(selectedRecipe, servings/selectedRecipe.servings)}>＋ Shopping list</button></div><div className="servings"><span>Servings</span><button onClick={()=>setServings(Math.max(1,servings-1))}>−</button><b>{servings}</b><button onClick={()=>setServings(servings+1)}>＋</button><small>Scaled automatically</small></div><ul className="ingredients">{scaledIngredients.map((i,idx)=><li key={idx}><b>{Number.isInteger(i.q)?i.q:i.q.toFixed(1)}</b><span>{i.u}</span><span>{i.n}</span></li>)}</ul></section><section className="recipe-card"><h2>How to make it</h2><div className="steps">{selectedRecipe.steps.map((s,i)=><div className="step" key={i}><span>{i+1}</span><p>{s}</p></div>)}</div></section></div>
        <aside><section className="side-card"><h3>Rate this recipe</h3><div className="stars">{[1,2,3,4,5].map(n=><button key={n} className={ratings[selectedRecipe.id]>=n?"star chosen":"star"} onClick={()=>rate(n)}>★</button>)}</div><p>{ratings[selectedRecipe.id] ? `You rated it ${ratings[selectedRecipe.id]}/5` : "Tap a star to rate"}</p></section><section className="side-card"><h3>Comments</h3><div className="comment-list">{(comments[selectedRecipe.id]||[]).map(c=><div className="comment" key={c.id}><b>{c.author}</b><small>{c.date}</small><p>{c.text}</p></div>)}</div><textarea value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Share what you thought..."/><button className="primary full" onClick={addComment}>Post comment</button></section></aside></div>
      </main>}

      {view==="add" && <main className="page narrow"><div className="page-title"><span className="eyebrow dark">CREATE</span><h1>Add your recipe</h1><p>Share something delicious with the community.</p></div><form className="form-card" onSubmit={createRecipe}><label>Recipe title<input required value={newRecipe.title} onChange={e=>setNewRecipe({...newRecipe,title:e.target.value})} placeholder="e.g. Grandma's Sunday Lasagna"/></label><label>Recipe photo URL<input value={newRecipe.image} onChange={e=>setNewRecipe({...newRecipe,image:e.target.value})} placeholder="Paste an image URL for the recipe background"/></label><div className="two"><label>Category<select value={newRecipe.category} onChange={e=>setNewRecipe({...newRecipe,category:e.target.value})}><option>Breakfast</option><option>Lunch</option><option>Dinner</option></select></label><label>Servings<input type="number" min="1" value={newRecipe.servings} onChange={e=>setNewRecipe({...newRecipe,servings:e.target.value})}/></label></div><label>Description<textarea value={newRecipe.description} onChange={e=>setNewRecipe({...newRecipe,description:e.target.value})} placeholder="What makes this recipe special?"/></label><label>Ingredients <small>One per line: quantity | unit | ingredient</small><textarea required value={newRecipe.ingredients} onChange={e=>setNewRecipe({...newRecipe,ingredients:e.target.value})} placeholder={"2 | cups | flour\n1 | tsp | salt\n3 | | eggs"}/></label><label>Steps <small>One step per line</small><textarea required value={newRecipe.steps} onChange={e=>setNewRecipe({...newRecipe,steps:e.target.value})} placeholder={"Mix the ingredients.\nBake until golden.\nServe warm."}/></label><button className="primary big" type="submit">Publish recipe</button></form></main>}

      {view==="planner" && <main className="page"><div className="page-title"><span className="eyebrow dark">PLAN AHEAD</span><h1>Weekly meal planner</h1><p>Build your week, then turn it into one grocery list.</p></div><div className="planner">{Object.entries(planner).map(([day,id])=><div className="day" key={day}><b>{day}</b>{id ? <div className="planned" style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.62),transparent),url(${recipes.find(r=>r.id===id)?.image})`}}><span>{recipes.find(r=>r.id===id)?.title}</span><button onClick={()=>{const next={...planner,[day]:null};update("recipe-planner",next,setPlanner)}}>×</button></div> : <select value="" onChange={e=>{const next={...planner,[day]:e.target.value};update("recipe-planner",next,setPlanner)}}><option value="">＋ Add recipe</option>{recipes.map(r=><option key={r.id} value={r.id}>{r.title}</option>)}</select>}</div>)}</div><button className="primary big" onClick={generateWeekly}>🛒 Generate weekly grocery list</button></main>}

      {view==="groceries" && <main className="page"><div className="page-title"><span className="eyebrow dark">SHOP</span><h1>Grocery list</h1><p>Your recipe and weekly meal-plan ingredients.</p></div><section className="grocery-card">{groceries.length===0 ? <div className="empty">Your grocery list is empty. Open a recipe and add its ingredients.</div> : groceries.map(item=><label className={item.checked?"grocery done":"grocery"} key={item.id}><input type="checkbox" checked={item.checked} onChange={()=>{const next=groceries.map(x=>x.id===item.id?{...x,checked:!x.checked}:x);update("recipe-groceries",next,setGroceries)}}/><span><b>{item.quantity}</b> {item.unit} {item.name}</span><small>{recipes.find(r=>r.id===item.recipeId)?.title}</small></label>)}{groceries.length>0&&<button className="text-btn" onClick={()=>update("recipe-groceries",[],setGroceries)}>Clear list</button>}</section></main>}

      {view==="ingredients" && <main className="page"><div className="page-title"><span className="eyebrow dark">PANTRY MATCH</span><h1>What can I make?</h1><p>Enter ingredients you already have, separated by commas.</p></div><div className="search-panel"><span>🥕</span><input value={ingredientInput} onChange={e=>setIngredientInput(e.target.value)} placeholder="chicken, tomato, garlic..."/></div><div className="match-grid">{ingredientMatches.map(r=><div className="match-card" key={r.id} onClick={()=>{setSelected(r.id);setServings(r.servings);setView("recipe")}}><img src={r.image}/><div><h3>{r.title}</h3><strong>{r.missing.length===0?"You have everything":`Missing ${r.missing.length}: ${r.missing.slice(0,2).join(", ")}`}</strong><p>{r.missing.length===0?"Ready to cook":"Still a good match"}</p></div></div>)}</div></main>}

      {view==="saved" && <main className="page"><div className="page-title"><span className="eyebrow dark">YOUR COLLECTION</span><h1>Saved recipes</h1><p>Your favorites, all in one place.</p></div><RecipeGrid recipes={recipes.filter(r=>favorites.includes(r.id))} onOpen={id=>{setSelected(id);setServings(recipes.find(r=>r.id===id).servings);setView("recipe")}} favorites={favorites} onFavorite={toggleFavorite}/></main>}

      {showInstall && <div className="modal-wrap" onClick={()=>setShowInstall(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-x" onClick={()=>setShowInstall(false)}>×</button><div className="install-icon">✦</div><h2>Install Tablely</h2><p>Use your browser's <b>Add to Home Screen</b> option to keep your recipe app handy. On supported browsers, use the install button in the address bar.</p><button className="primary full" onClick={()=>setShowInstall(false)}>Got it</button></div></div>}

      <nav className="bottom-nav"><Nav icon="⌂" label="Home" active={view==="home"} onClick={()=>setView("home")}/><Nav icon="⌕" label="Explore" active={view==="explore"} onClick={()=>setView("explore")}/><button className="add-nav" onClick={()=>setView("add")}>＋</button><Nav icon="▣" label="Planner" active={view==="planner"} onClick={()=>setView("planner")}/><Nav icon="♡" label="Saved" active={view==="saved"} onClick={()=>setView("saved")}/></nav>
      <div className="quick-tools"><button onClick={()=>setView("ingredients")}>🥕 What can I make?</button><button onClick={()=>setView("groceries")}>🛒 Grocery list {groceries.length ? `(${groceries.filter(x=>!x.checked).length})` : ""}</button></div>
    </div>
  );
}

function Nav({icon,label,active,onClick}) { return <button className={active?"nav-item active":"nav-item"} onClick={onClick}><span>{icon}</span><small>{label}</small></button>; }

function RecipeGrid({recipes,onOpen,favorites,onFavorite}) {
  if (!recipes.length) return <div className="empty">No recipes found yet.</div>;
  return <div className="recipe-grid">{recipes.map(r=><article className="recipe-card-tile" key={r.id}><button className="tile-image" style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.65),transparent 60%),url(${r.image})`}} onClick={()=>onOpen(r.id)}><span className="tile-time">{r.time} min</span><span className="tile-title">{r.title}</span></button><div className="tile-meta"><div><b>★ {r.rating || "New"}</b><span> · {r.difficulty}</span></div><button onClick={()=>onFavorite(r.id)} className="heart">{favorites.includes(r.id)?"♥":"♡"}</button></div></article>)}</div>;
}

export default App;
