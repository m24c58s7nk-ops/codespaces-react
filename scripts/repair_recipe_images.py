from pathlib import Path
import json, re, subprocess

p = Path("src/App.jsx")
s = p.read_text()

urls = {
"pasta":"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
"chicken":"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85",
"salad":"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
"soup":"https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=85",
"avocado":"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85",
"pancake":"https://images.unsplash.com/photo-1650134973809-d8c3a2da59ba?auto=format&fit=crop&w=1200&q=85",
"french":"https://images.unsplash.com/photo-1740555274750-2ced1ce0fdf3?auto=format&fit=crop&w=1200&q=85",
"burrito":"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=85",
"oatmeal":"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85",
"chia":"https://images.unsplash.com/photo-1605983662255-aa2a612b81a0?auto=format&fit=crop&w=1200&q=85",
"smoothie":"https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=85",
"waffle":"https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1200&q=85",
"yogurt":"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85",
"quesadilla":"https://images.unsplash.com/photo-1647545401800-bd8f77e670ed?auto=format&fit=crop&w=1200&q=85",
"breakfast":"https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85",
"sandwich":"https://images.unsplash.com/photo-1528735602780-2552fd46c7b?auto=format&fit=crop&w=1200&q=85",
"flatbread":"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85",
"shrimp":"https://images.unsplash.com/photo-1644898955763-682dbe5127ac?auto=format&fit=crop&w=1200&q=85",
"salmon":"https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=85",
"rice":"https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=85",
"curry":"https://images.unsplash.com/photo-1627906296851-6d9c5e4db592?auto=format&fit=crop&w=1200&q=85",
"tacos":"https://images.unsplash.com/photo-1552332386-f8dd00dc8f85?auto=format&fit=crop&w=1200&q=85",
"stirfry":"https://images.unsplash.com/photo-1606070781631-a7e961f84c9e?auto=format&fit=crop&w=1200&q=85",
"hash":"https://images.unsplash.com/photo-1712746785233-590cd63d6941?auto=format&fit=crop&w=1200&q=85",
"caesar":"https://images.unsplash.com/photo-1582034986517-30d163aa1da9?auto=format&fit=crop&w=1200&q=85",
"berry":"https://images.unsplash.com/photo-1623052935410-3fca63f73e10?auto=format&fit=crop&w=1200&q=85",
}
m = {"r1":"pasta","r2":"chicken","r3":"berry","r4":"soup","r5":"avocado","r6":"salad","r7":"pancake","r8":"french","r9":"burrito","r10":"oatmeal","r11":"chia","r12":"breakfast","r13":"breakfast","r14":"smoothie","r15":"hash","r16":"waffle","r17":"yogurt","r18":"quesadilla","r19":"oatmeal","r20":"smoothie","r21":"breakfast","r22":"sandwich","r23":"salad","r24":"caesar","r25":"sandwich","r26":"salad","r27":"soup","r28":"sandwich","r29":"salad","r30":"salad","r31":"caesar","r32":"flatbread","r33":"sandwich","r34":"salad","r35":"shrimp","r36":"curry","r37":"stirfry","r38":"salmon","r39":"chicken","r40":"curry","r41":"tacos","r42":"chicken","r43":"pasta","r44":"salmon","r45":"rice","r46":"chicken","r47":"tacos","r48":"chicken","r49":"salad","r50":"pasta","r51":"chicken","r52":"pasta","r53":"rice","r54":"pasta","r55":"curry","r56":"flatbread"}
mapping = {k: urls[v] for k,v in m.items()}
block = "const curatedStarterRecipeImages = " + json.dumps(mapping, indent=2) + ";"
s,n = re.subn(r"const curatedStarterRecipeImages = \{.*?\};", block, s, count=1, flags=re.S)
if n != 1: raise SystemExit("starter mapping not found")

choices = [
("berry breakfast bowl|breakfast bowl","berry"),("french toast","french"),("chia pudding","chia"),
("breakfast quesadilla|quesadilla","quesadilla"),("pancake","pancake"),("waffle","waffle"),
("oatmeal|porridge","oatmeal"),("smoothie","smoothie"),("yogurt parfait|parfait","yogurt"),
("avocado toast","avocado"),("burrito","burrito"),("breakfast hash","hash"),
("pasta|noodle|spaghetti|lasagna|ziti|gnocchi|shells","pasta"),("salmon","salmon"),("shrimp","shrimp"),
("caesar salad","caesar"),("salad|cucumber|greens|hummus|couscous","salad"),
("chicken|turkey|pork|sausage|steak|beef|meat","chicken"),("enchilada|taco","tacos"),
("curry","curry"),("rice|teriyaki|bowl","rice"),("sandwich|wrap|pita","sandwich"),
("flatbread|pizza","flatbread"),("toast|egg","breakfast")
]
choices_js = "const recipeImageChoices = [\n" + ",\n".join(
    f'  {{ words: /{pat}/i, image: "{urls[key]}" }}' for pat,key in choices
) + "\n];"
s,n = re.subn(r"const recipeImageChoices = \[.*?\];", choices_js, s, count=1, flags=re.S)
if n != 1: raise SystemExit("image choices not found")

old = '''function RecipeGrid({recipes,onOpen,favorites,onFavorite}) {
  if (!recipes.length) return <div className="empty">No recipes found yet.</div>;
  return <div className="recipe-grid">{recipes.map(r=><article className="recipe-card-tile" key={r.id}><button className="tile-image" style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.65),transparent 60%),url(${r.image || getAutomaticRecipeImage(r.title, r.ingredients || [])})`}} onClick={()=>onOpen(r.id)}><span className="tile-time">{r.time} min</span><span className="tile-title">{r.title}</span></button><div className="tile-meta"><div><span>{r.difficulty}</span></div><button onClick={()=>onFavorite(r.id)} className="heart">{favorites.includes(r.id)?"♥":"♡"}</button></div></article>)}</div>;
}'''
new = '''function RecipeGrid({recipes,onOpen,favorites,onFavorite}) {
  if (!recipes.length) return <div className="empty">No recipes found yet.</div>;
  return <div className="recipe-grid">{recipes.map(r=><article className="recipe-card-tile" key={r.id}><button className="tile-image" onClick={()=>onOpen(r.id)}>
    <img src={r.image || getAutomaticRecipeImage(r.title, r.ingredients || [])} alt={r.title} loading="lazy"
      onError={e=>{
        const fallback = getAutomaticRecipeImage(r.title, r.ingredients || []);
        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
        else { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("image-fallback"); }
      }} />
    <span className="tile-image-shade" />
    <span className="tile-time">{r.time} min</span><span className="tile-title">{r.title}</span>
  </button><div className="tile-meta"><div><span>{r.difficulty}</span></div><button onClick={()=>onFavorite(r.id)} className="heart">{favorites.includes(r.id)?"♥":"♡"}</button></div></article>)}</div>;
}'''
if old not in s: raise SystemExit("RecipeGrid not found")
s=s.replace(old,new)
p.write_text(s)

css=Path("src/App.css")
css.write_text(css.read_text()+'''\n.tile-image { position: relative; overflow: hidden; }\n.tile-image img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }\n.tile-image-shade { position:absolute; inset:0; background:linear-gradient(0deg,rgba(0,0,0,.65),transparent 60%); pointer-events:none; }\n.tile-image .tile-time,.tile-image .tile-title { position:absolute; z-index:2; }\n.tile-image.image-fallback::after { content:"🍽️"; position:absolute; inset:0; display:grid; place-items:center; font-size:42px; background:linear-gradient(135deg,#ece7dc,#d8d0c0); }\n''')

for x in [Path(".github/workflows/repair-recipe-images.yml"), Path("recipe-image-repair-trigger.txt")]:
    if x.exists(): x.unlink()

subprocess.run(["git","config","user.name","github-actions[bot]"],check=True)
subprocess.run(["git","config","user.email","41898282+github-actions[bot]@users.noreply.github.com"],check=True)
subprocess.run(["git","add","src/App.jsx","src/App.css",".github/workflows/repair-recipe-images.yml","recipe-image-repair-trigger.txt"],check=True)
subprocess.run(["git","commit","-m","Repair recipe images"],check=False)
subprocess.run(["git","push"],check=True)
