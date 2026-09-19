import { useState } from "react"
import "./App.css"

const fieldStyle = { width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box" }

export default function App() {
  const [page, setPage] = useState("home")
  const [name, setName] = useState("Your Name")
  const [email, setEmail] = useState("you@example.com")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  if (page === "profile") return <main className={`app ${darkMode ? "dark-mode" : ""}`}><button className="back-button" onClick={() => setPage("home")}>← Home</button><section className="profile-card"><div className="profile-avatar">{name.charAt(0).toUpperCase()}</div><h1>{name}</h1><p className="date">{email}</p><button className="add-button" onClick={() => setPage("settings")}>Edit profile</button></section><section className="settings-panel"><h2>Account overview</h2><div className="detail-box"><span>MEMBER SINCE</span><strong>September 2026</strong></div><div className="detail-box"><span>PLATFORM</span><strong>Paratus</strong></div></section></main>

  if (page === "settings") return <main className={`app ${darkMode ? "dark-mode" : ""}`}><button className="back-button" onClick={() => setPage("home")}>← Home</button><section className="settings-panel"><h1>Settings</h1><p className="date">Customize your Paratus experience.</p><h2>Profile</h2><label>Name<input style={fieldStyle} value={name} onChange={e => setName(e.target.value)} /></label><label>Email<input style={fieldStyle} value={email} onChange={e => setEmail(e.target.value)} /></label><h2>Preferences</h2><label className="setting-toggle"><span>Dark mode</span><input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} /></label><label className="setting-toggle"><span>Notifications</span><input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} /></label><button className="add-button" onClick={() => setPage("home")}>Save changes</button></section></main>

  return <main className={`app ${darkMode ? "dark-mode" : ""}`}><header className="top-bar"><div className="brand-row"><div className="app-logo">✓</div><div><p className="eyebrow">PARATUS</p><h1>Today</h1><p className="date">{new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</p></div></div></header><section className="events-section"><div className="section-heading"><h2>Quick access</h2></div><div className="quick-actions"><button className="event-card" onClick={() => setPage("profile")}><div className="event-card-icon">◉</div><div className="event-card-info"><strong>Profile</strong><span>View and edit your account</span></div><span className="arrow">›</span></button><button className="event-card" onClick={() => setPage("settings")}><div className="event-card-icon">⚙</div><div className="event-card-info"><strong>Settings</strong><span>Manage preferences and notifications</span></div><span className="arrow">›</span></button></div></section><section className="items-section"><div className="section-heading"><h2>Welcome to Paratus</h2></div><div className="event-empty">Your personal organization space.</div></section></main>
}
