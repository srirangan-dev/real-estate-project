import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Topbar.css'

export default function Topbar() {
  const { user, switchRole } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-search">
          <span className="search-icon">⊙</span>
          <input
            placeholder="Search properties, cities..."
            onKeyDown={e => e.key === 'Enter' && navigate('/search')}
          />
        </div>
      </div>
      <div className="topbar-right">
        <div className="role-switcher">
          <span className="role-label">View as:</span>
          <button
            className={`role-btn ${user?.role === 'buyer' ? 'active' : ''}`}
            onClick={() => switchRole('buyer')}
          >Buyer</button>
          <button
            className={`role-btn ${user?.role === 'agent' ? 'active' : ''}`}
            onClick={() => switchRole('agent')}
          >Agent</button>
        </div>
        <button className="notif-btn" title="Notifications">
          <span>🔔</span>
          <span className="notif-dot"></span>
        </button>
        {user ? (
          <div className="topbar-avatar" onClick={() => navigate('/auth')}>
            {user.avatar}
          </div>
        ) : (
          <button className="btn btn-primary" onClick={() => navigate('/auth')} style={{fontSize:13,padding:'7px 14px'}}>
            Sign in
          </button>
        )}
      </div>
    </header>
  )
}