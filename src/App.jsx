import { useState } from "react"
import "./App.css"

const fieldStyle = { width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box" }

export default function App() {
  const [page, setPage] = useState("home")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [items, setItems] = useState([])
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [showEventItemForm, setShowEventItemForm] = useState(false)
  const [eventItemName, setEventItemName] = useState("")
  const [eventItemLocation, setEventItemLocation] = useState("")
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventStart, setEventStart] = useState("")
  const [eventEnd, setEventEnd] = useState("")
  const [eventLeave, setEventLeave] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventNotes, setEventNotes] = useState("")
  const [repeat, setRepeat] = useState("none")

  const formatTime = value => value ? new Date(`2000-01-01T${value}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : ""
  const formatDate = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : ""
  const today = new Date().toISOString().slice(0, 10)
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
  function addItemToEvent() {
    if (!selectedEvent || !eventItemName.trim() || !eventItemLocation.trim()) return
    setItems(current => [...current, { id: Date.now(), eventId: selectedEvent.id, name: eventItemName.trim(), location: eventItemLocation.trim(), grabbed: false }])
    setEventItemName(""); setEventItemLocation(""); setShowEventItemForm(false)
  }
  function toggleItem(id) { setItems(current => current.map(item => item.id === id ? { ...item, grabbed: !item.grabbed } : item)) }
  function removeItem(id) { setItems(current => current.filter(item => item.id !== id)) }

  const Sidebar = () => <aside className="sidebar"><div className="sidebar-brand"><div className="app-logo">✓</div><strong>PARATUS</strong></div><nav className="sidebar-nav"><button className={page === "home" ? "active" : ""} onClick={() => { setPage("home"); setSelectedEvent(null) }}>⌂ <span>Home</span></button><button className={page === "profile" ? "active" : ""} onClick={() => { setPage("profile"); setSelectedEvent(null) }}>◉ <span>Profile</span></button><button className={page === "settings" ? "active" : ""} onClick={() => { setPage("settings"); setSelectedEvent(null) }}>⚙ <span>Settings</span></button></nav></aside>
  const Layout = ({ children }) => <main className={`app-shell ${darkMode ? "dark-mode" : ""}`}><Sidebar /><div className="app-content">{children}</div></main>

  if (page === "signin") return <Layout><button className="back-button" onClick={() => setPage("home")}>← Back to home</button><section className="profile-card"><div className="profile-avatar">✓</div><h1>Sign in to Paratus</h1><p className="date">Welcome back</p><form onSubmit={e => { e.preventDefault(); setPage("profile") }}><label>Email<input style={fieldStyle} type="email" placeholder="you@example.com" required /></label><label>Password<input style={fieldStyle} type="password" placeholder="Enter your password" required /></label><button className="add-button" type="submit">Sign in</button></form><p>Don't have an account? <button className="back-button" onClick={() => setPage("profile")}>Create an account</button></p></section></Layout>

  if (page === "profile") return <Layout><button className="back-button" onClick={() => setPage("home")}>← Home</button><section className="profile-card"><div className="profile-avatar">G</div><h1>Guest</h1><p className="date">Guest account</p><p>Sign up to save your events and track your progress across devices.</p><button className="add-button" onClick={() => setPage("signin")}>Sign in</button></section></Layout>

  if (page === "settings") return <Layout><section className="settings-panel"><h1>Settings</h1><p className="date">Customize your Paratus experience.</p><h2>Account</h2><label>Name<input style={fieldStyle} value="Guest" disabled /></label><label>Email<input style={fieldStyle} value="Not connected" disabled /></label><h2>Preferences</h2><label className="setting-toggle"><span>Dark mode</span><input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} /></label><label className="setting-toggle"><span>Notifications</span><input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} /></label><button className="add-button" onClick={() => setPage("home")}>Save changes</button></section></Layout>

  if (selectedEvent) {
    const eventItems = items.filter(item => item.eventId === selectedEvent.id)
    return <Layout><button className="back-button" onClick={() => { setSelectedEvent(null); setShowEventItemForm(false) }}>← Today</button><section className="event-detail"><div className="event-icon">✓</div><h1>{selectedEvent.name}</h1><p className="event-time">{formatDate(selectedEvent.date)}</p><p className="event-time">{formatTime(selectedEvent.start)} – {formatTime(selectedEvent.end)}</p>{selectedEvent.repeat !== "none" && <p className="event-time">Repeats {selectedEvent.repeat}</p>}<div className="event-leave">Leave at {formatTime(selectedEvent.leave)}</div>{selectedEvent.location && <div className="detail-box"><span>LOCATION</span><strong>{selectedEvent.location}</strong></div>}{selectedEvent.notes && <div className="detail-box"><span>NOTES</span><p>{selectedEvent.notes}</p></div>}<section className="event-items"><div className="section-heading"><h2>Items to bring</h2><span>{eventItems.length}</span></div><button className="add-button" onClick={() => setShowEventItemForm(value => !value)}>+ Add item</button>{showEventItemForm && <section className="add-section item-form"><h2>Add an item</h2><input style={fieldStyle} placeholder="What do you need?" value={eventItemName} onChange={e => setEventItemName(e.target.value)} /><input style={fieldStyle} placeholder="Where is it?" value={eventItemLocation} onChange={e => setEventItemLocation(e.target.value)} /><button className="add-button" onClick={addItemToEvent}>Add item to this event</button></section>}{eventItems.length === 0 ? <div className="event-empty">No items added yet.</div> : <div className="items-list">{eventItems.map(item => <div className="item-row" key={item.id}><button className={`item-row ${item.grabbed ? "grabbed" : ""}`} onClick={() => toggleItem(item.id)}><span className="check">{item.grabbed ? "✓" : ""}</span><span className="item-info"><strong>{item.name}</strong><span>{item.location}</span></span><span className="arrow">›</span></button><button className="delete-action" onClick={() => removeItem(item.id)}>Delete</button></div>)}</div>}</section></section></Layout>
  }

  return <Layout><header className="top-bar"><div className="brand-row"><div className="app-logo" aria-label="Paratus logo">✓</div><div><p className="eyebrow">PARATUS</p><h1>Today</h1><p className="date">{new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</p></div></div></header><section className="guest-banner"><div><strong>You're using Paratus as a guest</strong><p>Sign in or create an account to save your events and access them across devices.</p></div><button className="add-button" onClick={() => setPage("signin")}>Sign in</button></section><section className="events-section"><div className="section-heading"><h2>Events today</h2><span>{todayEvents.length}</span></div>{todayEvents.length === 0 ? <div className="event-empty">No events today.</div> : <div className="events-list">{todayEvents.map(event => <button className="event-card" key={event.id} onClick={() => setSelectedEvent(event)}><div className="event-card-icon">●</div><div className="event-card-info"><strong>{event.name}</strong><span>{formatTime(event.start)} – {formatTime(event.end)}</span><small>Leave at {formatTime(event.leave)}</small></div><span className="arrow">›</span></button>)}</div>}<button className="add-event-button" onClick={() => setShowEventForm(true)}>+ Add event</button></section>{showEventForm && <section className="event-form"><h2>Add event</h2><input style={fieldStyle} placeholder="Event name" value={eventName} onChange={e => setEventName(e.target.value)} /><label style={fieldStyle}>Date<input style={fieldStyle} type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} /></label><label style={fieldStyle}>Repeat<select style={fieldStyle} value={repeat} onChange={e => setRepeat(e.target.value)}><option value="none">Does not repeat</option><option value="daily">Every day</option><option value="weekly">Every week</option><option value="monthly">Every month</option><option value="yearly">Every year</option></select></label><div className="time-grid"><label style={fieldStyle}>Starts<input style={fieldStyle} type="time" value={eventStart} onChange={e => setEventStart(e.target.value)} /></label><label style={fieldStyle}>Ends<input style={fieldStyle} type="time" value={eventEnd} onChange={e => setEventEnd(e.target.value)} /></label></div><label style={fieldStyle}>Leave at<input style={fieldStyle} type="time" value={eventLeave} onChange={e => setEventLeave(e.target.value)} /></label><input style={fieldStyle} placeholder="Location (optional)" value={eventLocation} onChange={e => setEventLocation(e.target.value)} /><textarea style={fieldStyle} placeholder="Notes (optional)" value={eventNotes} onChange={e => setEventNotes(e.target.value)} /><button className="add-button" onClick={addEvent}>Create event</button></section>}<section className="items-section"><div className="section-heading"><h2>Your items</h2><span>{items.filter(item => item.eventId === null).length} total</span></div></section></Layout>
}
