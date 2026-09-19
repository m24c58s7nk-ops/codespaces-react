import { useMemo, useState } from "react"
import "./App.css"

const initialItems = [
  { id: 1, name: "Keys", location: "Entry table", done: false },
  { id: 2, name: "Wallet", location: "Desk drawer", done: false },
  { id: 3, name: "Backpack", location: "Closet", done: false },
]

export default function App() {
  const [items, setItems] = useState(initialItems)
  const [itemName, setItemName] = useState("")
  const [itemLocation, setItemLocation] = useState("")
  const [search, setSearch] = useState("")

  function addItem() {
    const name = itemName.trim()
    const location = itemLocation.trim()
    if (!name || !location) return

    setItems(current => [
      ...current,
      { id: Date.now(), name, location, done: false },
    ])
    setItemName("")
    setItemLocation("")
  }

  function toggleItem(id) {
    setItems(current =>
      current.map(item =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    )
  }

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return items
    return items.filter(item =>
      `${item.name} ${item.location}`.toLowerCase().includes(query),
    )
  }, [items, search])

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">PARATUS</p>
          <h1>Stay ready.</h1>
          <p className="subtitle">Keep track of what matters and where it belongs.</p>
        </div>
      </header>

      <section className="search-section">
        <input
          type="search"
          placeholder="Search your items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </section>

      <section className="items-section">
        <div className="section-heading">
          <h2>Your items</h2>
          <span>{filteredItems.length}</span>
        </div>

        <div className="items-list">
          {filteredItems.map(item => (
            <button
              className={`item-card ${item.done ? "completed" : ""}`}
              key={item.id}
              onClick={() => toggleItem(item.id)}
            >
              <span className="item-check">{item.done ? "✓" : "○"}</span>
              <span className="item-copy">
                <strong>{item.name}</strong>
                <small>{item.location}</small>
              </span>
            </button>
          ))}
          {filteredItems.length === 0 && <p className="empty-state">No items found.</p>}
        </div>
      </section>

      <section className="add-section">
        <h2>Add an item</h2>

        <input
          type="text"
          placeholder="What do you need?"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Where is it usually?"
          value={itemLocation}
          onChange={e => setItemLocation(e.target.value)}
        />

        <button className="add-button" onClick={addItem}>
          Add item
        </button>
      </section>
    </main>
  )
}
