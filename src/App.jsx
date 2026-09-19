import { useState } from "react"
import "./App.css"
import PreparationStreak from "./PreparationStreak"

const fieldStyle = { width: "100%", boxSizing: "border-box" }

export default function App() {
  const [page, setPage] = useState("home")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [items, setItems] = useState([])
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [showItemForm, setShowItemForm] = useState(false)
  const [itemName, setItemName] = useState("")
  const [itemLocation, setItemLocation] = useState("")
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventStart, setEventStart] = useState("")
  const [eventEnd, setEventEnd] = useState("")
  const [eventLeave, setEventLeave] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventNotes, setEventNotes] = useState("")
  const [repeat, setRepeat] = useState("none")
  const [completedPrepDays, setCompletedPrepDays] = useState([])

  const today = new Date().toISOString().slice(0, 10)
  const formatTime = value => value ? new Date(`2000-01-01T${value}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : ""
  const formatDate = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : ""
  const isEventToday = event => {
    const start = new Date(`${event.date}T12:00:00`)
    const now = new Date(`${today}T12:00:00`)
    const days = Math.floor((now - start) / 86400000)
    if (days < 0) return false
    if (event.repeat === "daily") return true
    if (event.repeat === "weekly") return days % 7 === 0
    if (event.repeat === "monthly") return start.getDate() === now.getDate()
    if (event.repeat === "yearly") return start.getMonth() === now.getMonth() && start.getDate() === now.getDate()
    return event.date === today
  }
  const todayEvents = events.filter(isEventToday)

  function addEvent() {
    if (!eventName.trim() || !eventDate || !eventStart || !eventEnd || !eventLeave) return
    setEvents(current => [...current, { id: Date.now(), name: eventName.trim(), date: eventDate, start: eventStart, end: eventEnd, leave: eventLeave, location: eventLocation.trim(), notes: eventNotes.trim(), repeat }])
    setEventName(""); setEventDate(""); setEventStart(""); setEventEnd(""); setEventLeave(""); setEventLocation(""); setEventNotes(""); setRepeat("none"); setShowEventForm(false)
  }
  function addItem() {
    if (!selectedEvent || !itemName.trim() || !itemLocation.trim()) return
    setItems(current => [...current, { id: Date.now(), eventId: selectedEvent.id, name: itemName.trim(), location: itemLocation.trim(), grabbed: false }])
    setItemName(""); setItemLocation(""); setShowItemForm(false)
  }
  function completeToday() { if (!completedPrepDays.includes(today)) setCompletedPrepDays(current => [...current, today]) }
  const go = target => { setPage(target); setSelectedEvent(null) }
  const Sidebar = () => <aside className="sidebar"><div className="sidebar-brand"><div className="app-logo">✓</div><strong>PARATUS</strong></div><nav className="sidebar-nav"><button className={page === "home" ? "active" : ""} onClick={() => go("home")}>⌂ <span>Home</span></button><button className={page === "streaks" ? "active" : ""} onClick={() => go("streaks")}>🔥 <span>Preparation Streak</span></button><button className={page === "profile" ? "active" : ""} onClick={() => go("profile")}>◉ <span>Profile</span></button><button className={page === "settings" ? "active" : ""} onClick={() => go("settings")}>⚙ <span>Settings</span></button></nav></aside>
  const Layout = ({ children }) => <main className={`app-shell ${darkMode ? "dark-mode" : ""}`}><Sidebar /><div className="app-content">{children}</div></main>

  if (page === "streaks") return <Layout><PreparationStreak items={items} events={events} completedDays={completedPrepDays} onCompleteToday={completeToday} /></Layout>
  if (page === "profile") return <Layout><button className="back-button" onClick={() => go("home")}>← Home</button><section className="profile-card"><div className="profile-avatar">G</div><h1>Guest</h1><p className="date">Guest account</p><p>Sign in to save your events and progress across devices.</p><button className="add-button" onClick={() => go("home")}>Continue</button></section></Layout>
  if (page === "settings") return <Layout><section className="settings-panel"><h1>Settings</h1><p className="date">Customize your Paratus experience.</p><h2>Preferences</h2><label className="setting-toggle"><span>Dark mode</span><input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} /></label><label className="setting-toggle"><span>Notifications</span><input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} /></label></section></Layout>
  if (selectedEvent) { const eventItems = items.filter(item => item.eventId === selectedEvent.id); return <Layout><button className="back-button" onClick={() => setSelectedEvent(null)}>← Today</button><section className="event-detail"><div className="event-icon">✓</div><h1>{selectedEvent.name}</h1><p className="event-time">{formatDate(selectedEvent.date)}</p><p className="event-time">{formatTime(selectedEvent.start)} – {formatTime(selectedEvent.end)}</p><div className="event-leave">Leave at {formatTime(selectedEvent.leave)}</div>{selectedEvent.location && <div className="detail-box"><span>LOCATION</span><strong>{selectedEvent.location}</strong></div>}<section className="event-items"><div className="section-heading"><h2>Items to bring</h2><span>{eventItems.length}</span></div><button className="add-button" onClick={() => setShowItemForm(v => !v)}>+ Add item</button>{showItemForm && <section className="add-section item-form"><input style={fieldStyle} placeholder="What do you need?" value={itemName} onChange={e => setItemName(e.target.value)} /><input style={fieldStyle} placeholder="Where is it?" value={itemLocation} onChange={e => setItemLocation(e.target.value)} /><button className="add-button" onClick={addItem}>Add item</button></section>}{eventItems.map(item => <div className="item-row" key={item.id}><button className={`item-row ${item.grabbed ? "grabbed" : ""}`} onClick={() => setItems(current => current.map(x => x.id === item.id ? { ...x, grabbed: !x.grabbed } : x))}><span className="check">{item.grabbed ? "✓" : ""}</span><span className="item-info"><strong>{item.name}</strong><span>{item.location}</span></span></button></div>)}</section></section></Layout> }
  return <Layout><header className="top-bar"><div className="brand-row"><div className="app-logo">✓</div><div><p className="eyebrow">PARATUS</p><h1>Today</h1><p className="date">{new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</p></div></div></header><section className="events-section"><div className="section-heading"><h2>Events today</h2><span>{todayEvents.length}</span></div>{todayEvents.length === 0 ? <div className="event-empty">No events today.</div> : todayEvents.map(event => <button className="event-card" key={event.id} onClick={() => setSelectedEvent(event)}><strong>{event.name}</strong><span>{formatTime(event.start)} – {formatTime(event.end)}</span></button>)}<button className="add-event-button" onClick={() => setShowEventForm(true)}>+ Add event</button></section>{showEventForm && <section className="event-form"><h2>Add event</h2><input style={fieldStyle} placeholder="Event name" value={eventName} onChange={e => setEventName(e.target.value)} /><input style={fieldStyle} type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} /><select style={fieldStyle} value={repeat} onChange={e => setRepeat(e.target.value)}><option value="none">Does not repeat</option><option value="daily">Every day</option><option value="weekly">Every week</option><option value="monthly">Every month</option><option value="yearly">Every year</option></select><input style={fieldStyle} type="time" value={eventStart} onChange={e => setEventStart(e.target.value)} /><input style={fieldStyle} type="time" value={eventEnd} onChange={e => setEventEnd(e.target.value)} /><input style={fieldStyle} type="time" value={eventLeave} onChange={e => setEventLeave(e.target.value)} /><input style={fieldStyle} placeholder="Location" value={eventLocation} onChange={e => setEventLocation(e.target.value)} /><textarea style={fieldStyle} placeholder="Notes" value={eventNotes} onChange={e => setEventNotes(e.target.value)} /><button className="add-button" onClick={addEvent}>Create event</button></section>}</Layout>
}
