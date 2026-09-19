import { useState } from "react"
import "./App.css"

const fieldStyle = { width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box" }

export default function App() {
  const [page, setPage] = useState("home")
  const [name, setName] = useState("Your Name")
  const [email, setEmail] = useState("you@example.com")
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const Sidebar = () => (
    <aside className="sidebar">
      <div className="sidebar-brand"><div className="app-logo">✓</div><strong>PARATUS</strong></div>
      <nav className="sidebar-nav">
        <button className={page === "home" ? "active" : ""} onClick={() => setPage("home")}>⌂ <span>Home</span></button>
        <button className={page === "profile" ? "active" : ""} onClick={() => setPage("profile")}>◉ <span>Profile</span></button>
        <button className={page === "settings" ? "active" : ""} onClick={() => setPage("settings")}>⚙ <span>Settings</span></button>
      </nav>
    </aside>
  )

  const Layout = ({ children }) => <main className={`app-shell ${darkMode ? "dark-mode" : ""}`}><Sidebar /><div className="app-content">{children}</div></main>

  if (page === "profile") return <Layout><button className="back-button" onClick={() => setPage("home")}>← Home</button><section className="profile-card"><div className="profile-avatar">{name.charAt(0).toUpperCase()}</div><h1>{name}</h1><p className="date">{email}</p><button className="add-button" onClick={() => setPage("settings")}>Edit profile</button></section><section className="settings-panel"><h2>Account overview</h2><div className="detail-box"><span>MEMBER SINCE</span><strong>September 2026</strong></div><div className="detail-box"><span>PLATFORM</span><strong>Paratus</strong></div></section></Layout>

  if (page === "settings") return <Layout><section className="settings-panel"><h1>Settings</h1><p className="date">Customize your Paratus experience.</p><h2>Profile</h2><label>Name<input style={fieldStyle} value={name} onChange={e => setName(e.target.value)} /></label><label>Email<input style={fieldStyle} value={email} onChange={e => setEmail(e.target.value)} /></label><h2>Preferences</h2><label className="setting-toggle"><span>Dark mode</span><input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} /></label><label className="setting-toggle"><span>Notifications</span><input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} /></label><button className="add-button" onClick={() => setPage("home")}>Save changes</button></section></Layout>

  return <Layout><header className="top-bar"><div className="brand-row"><div><p className="eyebrow">PARATUS</p><h1>Today</h1><p className="date">{new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</p></div></div></header><section className="events-section"><div className="section-heading"><h2>Welcome to Paratus</h2></div><div className="event-empty">Use the sidebar on the left to open your Profile or Settings.</div></section></Layout>
}
