import { createContext, useContext, useState } from 'react'
import { USERS } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(USERS[0]) // Default: agent James

  const login = (email, password, role) => {
    const found = USERS.find(u => u.email === email && u.role === role)
    if (found) { setUser(found); return { success: true } }
    // demo: just pick first matching role
    const demo = USERS.find(u => u.role === role)
    if (demo) { setUser(demo); return { success: true } }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => setUser(null)

  const switchRole = (role) => {
    const demo = USERS.find(u => u.role === role)
    if (demo) setUser(demo)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}