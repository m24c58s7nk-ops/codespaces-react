import { useState } from "react"
import App from "./App"
import AuthScreen from "./AuthScreen"

const SESSION_KEY = "paratus_demo_session"

export default function AuthGate() {
  // Always show the login screen when the website is opened.
  // After the user logs in or continues as a guest, show the app.
  const [session, setSession] = useState(null)

  function signIn(account) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(account))
    setSession(account)
  }

  function continueAsGuest() {
    const guest = { name: "Guest", guest: true }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(guest))
    setSession(guest)
  }

  if (!session) {
    return <AuthScreen onGuest={continueAsGuest} onAuthenticated={signIn} />
  }

  return <App />
}
