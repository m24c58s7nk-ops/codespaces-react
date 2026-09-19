import { useState } from "react"
import "./App.css"

const fieldStyle = { width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box" }

export default function App() {
  const [page, setPage] = useState("home")
  const [isGuest, setIsGuest] = useState(true)
  const [name, setName] = useState("Guest")
  const [email, setEmail] = useState("")
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

  const SignupPrompt = () => <div className="signup-prompt"><h2>Track your progress</h2><p>You're currently using Paratus as a guest. Sign up for a free account to save your progress, keep your events, and access your account anywhere.</p><button className="add-button" onClick={() => setPage("settings")}>Sign up to track progress</button></div>

  if (page === "profile") return <Layout><button className="back-button" onClick={() => setPage("home")}>← Home</button><section className="profile-card"><div className="profile-avatar">G</div><h1>Guest</h1><p className="date">Guest account · No email connected</p><SignupPrompt /></section><section className="settings-panel"><h2>Account overview</h2><div className="detail-box"><span>ACCOUNT TYPE</span><strong>Guest</strong></div><div className="detail-box"><span>PROGRESS SAVING</span><strong>Sign up to save your progress</strong></div></section></Layout>

  if (page === "settings") return <Layout><section className="settings-panel"><h1>Settings</h1><p className="date">Customize your Paratus experience.</p><h2>Profile</h2><label>Name<input style={fieldStyle} value="Guest" disabled /></label><p className="date">Guest names cannot be changed. Sign up to create a personal profile.</p><label>Email<input style={fieldStyle} value="" placeholder="No email — guest account" disabled /></label><SignupPrompt /><h2>Preferences</h2><label className="setting-toggle"><span>Dark mode</span><input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} /></label><label className="setting-toggle"><span>Notifications</span><input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} /></label></section></Layout>

  return <Layout><header className="top-bar"><div className="brand-row"><div><p className="eyebrow">PARATUS</p><h1>Today</h1><p className="date">Welcome, Guest</p></div></div></header><section className="events-section"><div className="section-heading"><h2>Welcome to Paratus</h2></div><SignupPrompt /><div className="event-empty">Use the sidebar on the left to open your Profile or Settings.</div></section></Layout>
}
