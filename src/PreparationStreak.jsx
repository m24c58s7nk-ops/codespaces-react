import { useEffect, useMemo } from "react"

export default function PreparationStreak({ items, events, completedDays, onCompleteToday }) {
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

  const todayEventIds = new Set(events.filter(isEventToday).map(event => event.id))
  const todayItems = items.filter(item => todayEventIds.has(item.eventId))
  const preparedCount = todayItems.filter(item => item.grabbed).length
  const allPrepared = todayItems.length > 0 && preparedCount === todayItems.length
  const todayCompleted = completedDays.includes(today)

  useEffect(() => {
    if (allPrepared && !todayCompleted) onCompleteToday()
  }, [allPrepared, todayCompleted, onCompleteToday])

  const currentStreak = useMemo(() => {
    let streak = 0
    const dates = new Set(completedDays)
    const date = new Date()
    while (dates.has(date.toISOString().slice(0, 10))) {
      streak += 1
      date.setDate(date.getDate() - 1)
    }
    return streak
  }, [completedDays])

  const longestStreak = useMemo(() => {
    const sorted = [...new Set(completedDays)].sort()
    let longest = 0
    let run = 0
    let previous = null
    sorted.forEach(value => {
      const date = new Date(`${value}T12:00:00`)
      if (previous && (date - previous) / 86400000 === 1) run += 1
      else run = 1
      longest = Math.max(longest, run)
      previous = date
    })
    return longest
  }, [completedDays])

  return <section className="settings-panel">
    <h1>Preparation Streak 🔥</h1>
    <p className="date">Your streak updates automatically when every item for today's events is prepared.</p>
    <div className="profile-card">
      <h2>{currentStreak} day{currentStreak === 1 ? "" : "s"}</h2>
      <p>Current preparation streak</p>
    </div>
    <div className="section-heading"><h2>Today's progress</h2><span>{preparedCount}/{todayItems.length}</span></div>
    <p>{todayItems.length === 0 ? "No items are scheduled for today's events." : allPrepared ? "Everything is prepared! Today has been added to your streak automatically. ✓" : "Prepare every item for today's events to complete your streak."}</p>
    <div className="detail-box"><span>LONGEST STREAK</span><strong>{longestStreak} day{longestStreak === 1 ? "" : "s"}</strong></div>
    <div className="detail-box"><span>COMPLETED DAYS</span><strong>{completedDays.length}</strong></div>
  </section>
}
