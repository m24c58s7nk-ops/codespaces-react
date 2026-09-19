import { useState } from "react"

export default function AuthScreen({ onGuest, onAuthenticated }) {
  const [mode, setMode] = useState("welcome")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function submit(event) {
    event.preventDefault()
    setError("")

    if (!email.trim() || !password.trim() || (mode === "signup" && !name.trim())) {
      setError("Please complete every required field.")
      return
    }

    const accounts = JSON.parse(localStorage.getItem("paratus_demo_accounts") || "{}")

    if (mode === "signup") {
      if (accounts[email.toLowerCase()]) {
        setError("An account with that email already exists.")
        return
      }

      accounts[email.toLowerCase()] = { name: name.trim(), email: email.trim(), password }
      localStorage.setItem("paratus_demo_accounts", JSON.stringify(accounts))
      onAuthenticated(accounts[email.toLowerCase()])
      return
    }

    const account = accounts[email.toLowerCase()]
    if (!account || account.password !== password) {
      setError("Email or password is incorrect.")
      return
    }

    onAuthenticated(account)
  }

  if (mode === "welcome") {
    return (
      <main className="auth-screen">
        <div className="auth-card">
          <p className="eyebrow">PARATUS</p>
          <h1>Be ready for what’s next.</h1>
          <p className="auth-description">Keep your events, reminders, and preparation in one place.</p>
          <button className="add-button" onClick={() => setMode("signup")}>Create account</button>
          <button className="auth-secondary" onClick={() => setMode("login")}>Log in</button>
          <button className="auth-guest" onClick={onGuest}>Continue as guest</button>
          <p className="auth-note">Guest progress is only saved in this browser.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="auth-screen">
      <form className="auth-card" onSubmit={submit}>
        <button type="button" className="back-button" onClick={() => setMode("welcome")}>← Back</button>
        <p className="eyebrow">PARATUS</p>
        <h1>{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
        <p className="auth-description">{mode === "signup" ? "Start keeping your plans organized." : "Log in to continue where you left off."}</p>
        {mode === "signup" && <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />}
        <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="auth-error">{error}</p>}
        <button className="add-button" type="submit">{mode === "signup" ? "Create account" : "Log in"}</button>
        <button type="button" className="auth-secondary" onClick={() => setMode(mode === "signup" ? "login" : "signup")}>{mode === "signup" ? "Already have an account? Log in" : "Need an account? Sign up"}</button>
      </form>
    </main>
  )
}
