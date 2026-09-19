import { useMemo } from "react"

export default function PreparationStreak({ items, events, completedDays, onCompleteToday }) {
  const today = new Date().toISOString().slice(0, 10)
  const todayItems = items.filter(item => events.some(event => event.id === item.eventId))
  const preparedCount = todayItems.filter(item => item.grabbed).length
  const allPrepared = todayItems.length > 0 && preparedCount === todayItems.length

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
    <p className="date">Build consistency by preparing everything you need.</p>
    <div className="profile-card">
      <h2>{currentStreak} day{currentStreak === 1 ? "" : "s"}</h2>
      <p>Current preparation streak</p>
    </div>
    <div className="section-heading"><h2>Today's progress</h2><span>{preparedCount}/{todayItems.length}</span></div>
    <p>{todayItems.length === 0 ? "Add items to your events to start tracking preparation." : allPrepared ? "Everything is prepared. Great work!" : "Check off every item for your events, then complete today."}</p>
    <button className="add-button" disabled={!allPrepared || completedDays.includes(today)} onClick={onCompleteToday}>{completedDays.includes(today) ? "Today completed ✓" : "Mark today complete"}</button>
    <div className="detail-box"><span>LONGEST STREAK</span><strong>{longestStreak} day{longestStreak === 1 ? "" : "s"}</strong></div>
    <div className="detail-box"><span>COMPLETED DAYS</span><strong>{completedDays.length}</strong></div>
  </section>
}
