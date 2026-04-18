import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Sidebar.css'

const NAV_AGENT = [
  { path: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { path: '/', label: 'Home', icon: '⌂' },
  { path: '/search', label: 'Browse', icon: '⊙' },
  { path: '/create-listing', label: 'List Property', icon: '+' },
  { path: '/appointments', label: 'Schedule', icon: '◷' },
  { path: '/messages', label: 'Messages', icon: '✉' },
]

const NAV_BUYER = [
  { path: '/', label: 'Home', icon: '⌂' },
  { path: '/search', label: 'Browse', icon: '⊙' },
  { path: '/appointments', label: 'My Viewings', icon: '◷' },
  { path: '/messages', label: 'Messages', icon: '✉' },
  { path: '/dashboard', label: 'My Account', icon: '⊞' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const nav = user?.role === 'agent' ? NAV_AGENT : NAV_BUYER

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">P</div>
        <span className="brand-name">PropSpace</span>
      </div>

      <nav className="sidebar-nav">
        {nav.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {user && (
          <div className="user-info">
            <div className="user-avatar">{user.avatar}</div>
            <div className="user-meta">
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
          </div>
        )}
        <button className="logout-btn" onClick={() => { logout(); navigate('/auth'); }}>
          Sign out
        </button>
      </div>
    </aside>
  )
}