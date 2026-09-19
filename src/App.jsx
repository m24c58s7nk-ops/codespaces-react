import { useState } from "react"
import "./App.css"

const DAYS = [
  { short: "M", name: "Monday" }, { short: "Tu", name: "Tuesday" },
  { short: "W", name: "Wednesday" }, { short: "Th", name: "Thursday" },
  { short: "F", name: "Friday" }, { short: "Sa", name: "Saturday" },
  { short: "Su", name: "Sunday" }
]

const fieldStyle = { width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box" }

export default function App() {
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
  const [repeatDays, setRepeatDays] = useState([])

  const formatTime = value => value ? new Date(`2000-01-01T${value}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : ""
  const formatDate = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : ""
  const today = new Date().toISOString().slice(0, 10)
  const todayEvents = events.filter(event => event.date === today || repeatDays.includes(new Date().toLocaleDateString([], { weekday: "long" })))

  function addItemToEvent() {
    if (!selectedEvent || !eventItemName.trim() || !eventItemLocation.trim()) return
    setItems(current => [...current, { id: Date.now(), eventId: selectedEvent.id, name: eventItemName.trim(), location: eventItemLocation.trim(), grabbed: false }])
    setEventItemName(""); setEventItemLocation(""); setShowEventItemForm(false)
  }

  function toggleItem(id) { setItems(current => current.map(item => item.id === id ? { ...item, grabbed: !item.grabbed } : item)) }
  function removeItem(id) { setItems(current => current.filter(item => item.id !== id)) }
  function toggleDay(day) { setRepeatDays(current => current.includes(day) ? current.filter(value => value !== day) : [...current, day]) }

  function addEvent() {
    if (!eventName.trim() || !eventDate || !eventStart || !eventEnd || !eventLeave) return
    setEvents(current => [...current, { id: Date.now(), name: eventName.trim(), date: eventDate, start: eventStart, end: eventEnd, leave: eventLeave, location: eventLocation.trim(), notes: eventNotes.trim(), repeatDays }])
    setEventName(""); setEventDate(""); setEventStart(""); setEventEnd(""); setEventLeave(""); setEventLocation(""); setEventNotes(""); setRepeatDays([]); setShowEventForm(false)
  }

  if (selectedEvent) {
    const eventItems = items.filter(item => item.eventId === selectedEvent.id)
    return <main className="app">
      <button className="back-button" onClick={() => { setSelectedEvent(null); setShowEventItemForm(false) }}>← Today</button>
      <section className="event-detail">
        <div className="event-icon">●</div><h1>{selectedEvent.name}</h1>
        <p className="event-time">{formatDate(selectedEvent.date)}</p>
        <p className="event-time">{formatTime(selectedEvent.start)} – {formatTime(selectedEvent.end)}</p>
        <div className="event-leave">Leave at {formatTime(selectedEvent.leave)}</div>
        {selectedEvent.location && <div className="detail-box"><span>LOCATION</span><strong>{selectedEvent.location}</strong></div>}
        {selectedEvent.notes && <div className="detail-box"><span>NOTES</span><p>{selectedEvent.notes}</p></div>}
        <section className="event-items">
          <div className="section-heading"><h2>Items to bring</h2><span>{eventItems.length}</span></div>
          <button className="add-button" onClick={() => setShowEventItemForm(value => !value)}>+ Add item</button>
          {showEventItemForm && <section className="add-section item-form"><h2>Add an item</h2><input style={fieldStyle} placeholder="What do you need?" value={eventItemName} onChange={e => setEventItemName(e.target.value)} /><input style={fieldStyle} placeholder="Where is it?" value={eventItemLocation} onChange={e => setEventItemLocation(e.target.value)} /><button className="add-button" onClick={addItemToEvent}>Add item to this event</button></section>}
          {eventItems.length === 0 ? <div className="event-empty">No items added yet.</div> : <div className="items-list">{eventItems.map(item => <div className="item-row" key={item.id}><button className={`item-row ${item.grabbed ? "grabbed" : ""}`} onClick={() => toggleItem(item.id)}><span className="check">{item.grabbed ? "✓" : ""}</span><span className="item-info"><strong>{item.name}</strong><span>{item.location}</span></span><span className="arrow">›</span></button><button className="delete-action" onClick={() => removeItem(item.id)}>Delete</button></div>)}</div>}
        </section>
      </section>
    </main>
  }

  return <main className="app">
    <header className="top-bar"><div><p className="eyebrow">PARATUS</p><h1>Today</h1><p className="date">{new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</p></div></header>
    <section className="events-section"><div className="section-heading"><h2>Events today</h2><span>{todayEvents.length}</span></div>{todayEvents.length === 0 ? <div className="event-empty">No events today.</div> : <div className="events-list">{todayEvents.map(event => <button className="event-card" key={event.id} onClick={() => setSelectedEvent(event)}><div className="event-card-icon">●</div><div className="event-card-info"><strong>{event.name}</strong><span>{formatTime(event.start)} – {formatTime(event.end)}</span><small>Leave at {formatTime(event.leave)}</small></div><span className="arrow">›</span></button>)}</div>}<button className="add-event-button" onClick={() => setShowEventForm(true)}>+ Add event</button></section>
    {showEventForm && <section className="event-form"><h2>Add event</h2><input style={fieldStyle} placeholder="Event name" value={eventName} onChange={e => setEventName(e.target.value)} /><label style={fieldStyle}>Date<input style={fieldStyle} type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} /></label><div className="time-grid"><label style={fieldStyle}>Starts<input style={fieldStyle} type="time" value={eventStart} onChange={e => setEventStart(e.target.value)} /></label><label style={fieldStyle}>Ends<input style={fieldStyle} type="time" value={eventEnd} onChange={e => setEventEnd(e.target.value)} /></label></div><label style={fieldStyle}>Leave at<input style={fieldStyle} type="time" value={eventLeave} onChange={e => setEventLeave(e.target.value)} /></label><input style={fieldStyle} placeholder="Location (optional)" value={eventLocation} onChange={e => setEventLocation(e.target.value)} /><textarea style={fieldStyle} placeholder="Notes (optional)" value={eventNotes} onChange={e => setEventNotes(e.target.value)} /><button className="add-button" onClick={addEvent}>Create event</button></section>}
    <section className="items-section"><div className="section-heading"><h2>Your items</h2><span>{items.filter(item => item.eventId === null).length} total</span></div>{items.filter(item => item.eventId === null).map(item => <div className="item-row" key={item.id}><button className={`item-row ${item.grabbed ? "grabbed" : ""}`} onClick={() => toggleItem(item.id)}><span className="check">{item.grabbed ? "✓" : ""}</span><span className="item-info"><strong>{item.name}</strong><span>{item.location}</span></span></button><button className="delete-action" onClick={() => removeItem(item.id)}>Delete</button></div>)}</section>
  </main>
}
