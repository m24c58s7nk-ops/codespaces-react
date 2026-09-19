import { useState } from "react"
import "./App.css"

const DAYS = [
  { short: "M", name: "Monday" },
  { short: "Tu", name: "Tuesday" },
  { short: "W", name: "Wednesday" },
  { short: "Th", name: "Thursday" },
  { short: "F", name: "Friday" },
  { short: "Sa", name: "Saturday" },
  { short: "Su", name: "Sunday" }
]

export default function App() {
  const [items, setItems] = useState([])
  const [events, setEvents] = useState([])
  const [itemName, setItemName] = useState("")
  const [itemLocation, setItemLocation] = useState("")

  const [showEventForm, setShowEventForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventStart, setEventStart] = useState("")
  const [eventEnd, setEventEnd] = useState("")
  const [eventLeave, setEventLeave] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventNotes, setEventNotes] = useState("")
  const [repeatDays, setRepeatDays] = useState([])

  const [swipedItem, setSwipedItem] = useState(null)
  const [touchStart, setTouchStart] = useState(null)
  const [touchCurrent, setTouchCurrent] = useState(null)

  function addItem() {
    if (!itemName.trim() || !itemLocation.trim()) return

    setItems([
      ...items,
      {
        name: itemName.trim(),
        location: itemLocation.trim(),
        grabbed: false
      }
    ])

    setItemName("")
    setItemLocation("")
  }

  function toggleItem(index) {
    if (swipedItem !== null) {
      setSwipedItem(null)
      return
    }

    setItems(
      items.map((item, i) =>
        i === index
          ? { ...item, grabbed: !item.grabbed }
          : item
      )
    )
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index))
    setSwipedItem(null)
  }

  function handleTouchStart(event) {
    setTouchStart(event.touches[0].clientX)
    setTouchCurrent(event.touches[0].clientX)
  }

  function handleTouchMove(event) {
    if (touchStart === null) return
    setTouchCurrent(event.touches[0].clientX)
  }

  function handleTouchEnd(index) {
    if (touchStart === null || touchCurrent === null) {
      setTouchStart(null)
      setTouchCurrent(null)
      return
    }

    const distance = touchCurrent - touchStart

    if (distance < -60) {
      setSwipedItem(index)
    } else if (distance > 40) {
      setSwipedItem(null)
    }

    setTouchStart(null)
    setTouchCurrent(null)
  }

  function toggleRepeatDay(day) {
    setRepeatDays(current =>
      current.includes(day)
        ? current.filter(item => item !== day)
        : [...current, day]
    )
  }

  function addEvent() {
    if (
      !eventName.trim() ||
      !eventDate ||
      !eventStart ||
      !eventEnd ||
      !eventLeave
    ) {
      return
    }

    const newEvent = {
      id: Date.now(),
      name: eventName.trim(),
      date: eventDate,
      start: eventStart,
      end: eventEnd,
      leave: eventLeave,
      location: eventLocation.trim(),
      notes: eventNotes.trim(),
      repeatDays
    }

    setEvents([...events, newEvent])

    setEventName("")
    setEventDate("")
    setEventStart("")
    setEventEnd("")
    setEventLeave("")
    setEventLocation("")
    setEventNotes("")
    setRepeatDays([])
    setShowEventForm(false)
  }

  function formatTime(time) {
    if (!time) return ""

    const [hours, minutes] = time.split(":")
    const date = new Date()
    date.setHours(Number(hours), Number(minutes))

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })
  }

  function getTodayDate() {
    const today = new Date()

    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  function getDayName(dateString) {
    if (!dateString) return ""

    const date = new Date(`${dateString}T12:00:00`)

    return date.toLocaleDateString([], {
      weekday: "long"
    })
  }

  function isEventToday(event) {
    const today = getTodayDate()

    if (event.date === today) {
      return true
    }

    const todayName = getDayName(today)

    return event.repeatDays?.includes(todayName)
  }

  function formatEventDate(dateString) {
    if (!dateString) return ""

    const date = new Date(`${dateString}T12:00:00`)

    return date.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric"
    })
  }

  const todayEvents = events.filter(isEventToday)

  const remaining = items.filter(item => !item.grabbed).length

  const today = new Date()

  const todayText = today.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric"
  })

  if (selectedEvent) {
    return (
      <main className="app">
        <button
          className="back-button"
          onClick={() => setSelectedEvent(null)}
        >
          ← Today
        </button>

        <section className="event-detail">
          <div className="event-icon">●</div>

          <h1>{selectedEvent.name}</h1>

          <p className="event-time">
            {formatEventDate(selectedEvent.date)}
          </p>

          <p className="event-time">
            {formatTime(selectedEvent.start)} –{" "}
            {formatTime(selectedEvent.end)}
          </p>

          <div className="event-leave">
            Leave at {formatTime(selectedEvent.leave)}
          </div>

          {selectedEvent.repeatDays?.length > 0 && (
            <div className="detail-box">
              <span>REPEATS</span>
              <strong>
                {selectedEvent.repeatDays.join(", ")}
              </strong>
            </div>
          )}

          {selectedEvent.location && (
            <div className="detail-box">
              <span>LOCATION</span>
              <strong>{selectedEvent.location}</strong>
            </div>
          )}

          {selectedEvent.notes && (
            <div className="detail-box">
              <span>NOTES</span>
              <p>{selectedEvent.notes}</p>
            </div>
          )}

          <section className="event-items">
            <div className="section-heading">
              <h2>Items to bring</h2>
              <span>{items.length}</span>
            </div>

            {items.length === 0 ? (
              <div className="event-empty">
                No items added yet.
              </div>
            ) : (
              <div className="items-list">
                {items.map((item, index) => (
                  <div
                    className={`swipe-wrapper ${
                      swipedItem === index ? "swiped" : ""
                    }`}
                    key={`${item.name}-${index}`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(index)}
                  >
                    <button
                      className="delete-action"
                      onClick={() => removeItem(index)}
                    >
                      <span className="delete-icon">×</span>
                      Delete
                    </button>

                    <button
                      className={`item-row ${
                        item.grabbed ? "grabbed" : ""
                      }`}
                      onClick={() => toggleItem(index)}
                    >
                      <span className="check">
                        {item.grabbed ? "✓" : ""}
                      </span>

                      <span className="item-info">
                        <strong>{item.name}</strong>
                        <span>{item.location}</span>
                      </span>

                      <span className="arrow">›</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </section>
      </main>
    )
  }

  return (
    <main className="app">
      <header className="top-bar">
        <div>
          <p className="eyebrow">PARATUS</p>
          <h1>Today</h1>
          <p className="date">{todayText}</p>
        </div>
      </header>

      <section className="next-card">
        <div className="next-label">
          <span className="status-dot"></span>
          NEXT UP
        </div>

        <div className="routine-info">
          <div>
            <h2>
              {todayEvents.length > 0
                ? todayEvents[0].name
                : "Nothing scheduled"}
            </h2>

            <p>
              {todayEvents.length > 0
                ? formatTime(todayEvents[0].start)
                : "You're all clear"}
            </p>
          </div>

          <div className="item-count">
            <strong>{remaining}</strong>
            <span>left</span>
          </div>
        </div>
      </section>

      <section className="events-section">
        <div className="section-heading">
          <h2>Events today</h2>
          <span>{todayEvents.length}</span>
        </div>

        {todayEvents.length === 0 ? (
          <div className="event-empty">
            No events today.
          </div>
        ) : (
          <div className="events-list">
            {todayEvents.map(event => (
              <button
                className="event-card"
                key={event.id}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="event-card-icon">●</div>

                <div className="event-card-info">
                  <strong>{event.name}</strong>

                  <span>
                    {formatTime(event.start)} –{" "}
                    {formatTime(event.end)}
                  </span>

                  <small>
                    Leave at {formatTime(event.leave)}
                  </small>
                </div>

                <span className="arrow">›</span>
              </button>
            ))}
          </div>
        )}

        <button
          className="add-event-button"
          onClick={() => setShowEventForm(true)}
        >
          + Add event
        </button>
      </section>

      {showEventForm && (
        <section className="event-form">
          <div className="form-header">
            <h2>Add event</h2>

            <button
              className="close-button"
              onClick={() => setShowEventForm(false)}
            >
              ×
            </button>
          </div>

          <input
            type="text"
            placeholder="Event name"
            value={eventName}
            onChange={e => setEventName(e.target.value)}
          />

          <label>
            Date
            <input
              type="date"
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
            />
          </label>

          <div className="time-grid">
            <label>
              Starts
              <input
                type="time"
                value={eventStart}
                onChange={e => setEventStart(e.target.value)}
              />
            </label>

            <label>
              Ends
              <input
                type="time"
                value={eventEnd}
                onChange={e => setEventEnd(e.target.value)}
              />
            </label>
          </div>

          <label>
            Leave at
            <input
              type="time"
              value={eventLeave}
              onChange={e => setEventLeave(e.target.value)}
            />
          </label>

          <div className="repeat-section">
            <div className="repeat-header">
              <span>Repeat</span>

              {repeatDays.length > 0 && (
                <button
                  className="clear-repeat"
                  onClick={() => setRepeatDays([])}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="day-picker">
              {DAYS.map((day, index) => (
                <button
                  key={`${day.name}-${index}`}
                  className={`day-button ${
                    repeatDays.includes(day.name) ? "selected" : ""
                  }`}
                  onClick={() => toggleRepeatDay(day.name)}
                  type="button"
                  aria-label={day.name}
                >
                  <span>{day.short}</span>
                </button>
              ))}
            </div>

            <p className="repeat-help">
              Select the days this event repeats.
            </p>
          </div>

          <input
            type="text"
            placeholder="Location (optional)"
            value={eventLocation}
            onChange={e => setEventLocation(e.target.value)}
          />

          <textarea
            placeholder="Notes (optional)"
            value={eventNotes}
            onChange={e => setEventNotes(e.target.value)}
          />

          <button className="add-button" onClick={addEvent}>
            Create event
          </button>
        </section>
      )}

      <section className="items-section">
        <div className="section-heading">
          <h2>Your items</h2>
          <span>{items.length} total</span>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">+</div>

            <h3>Nothing added yet</h3>

            <p>
              Add the things you need so Paratus can remind you where they are.
            </p>
          </div>
        ) : (
          <div className="items-list">
            {items.map((item, index) => (
              <div
                className={`swipe-wrapper ${
                  swipedItem === index ? "swiped" : ""
                }`}
                key={`${item.name}-${index}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => handleTouchEnd(index)}
              >
                <button
                  className="delete-action"
                  onClick={() => removeItem(index)}
                >
                  <span className="delete-icon">×</span>
                  Delete
                </button>

                <button
                  className={`item-row ${
                    item.grabbed ? "grabbed" : ""
                  }`}
                  onClick={() => toggleItem(index)}
                >
                  <span className="check">
                    {item.grabbed ? "✓" : ""}
                  </span>

                  <span className="item-info">
                    <strong>{item.name}</strong>
                    <span>{item.location}</span>
                  </span>

                  <span className="arrow">›</span>
                </button>
              </div>
            ))}
          </div>
        )}
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
