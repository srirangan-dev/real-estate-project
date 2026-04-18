import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './AuthPage.css'

export default function AuthPage() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [role, setRole] = useState('buyer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(email || 'demo@demo.com', password, role)
    if (result.success) navigate('/')
    else setError('Invalid credentials. Try any email — this is a demo.')
  }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg-text">PropSpace</div>
      </div>
      <div className="auth-panel">
        <div className="auth-logo">
          <div className="auth-logo-icon">P</div>
          <span>PropSpace</span>
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Sign in</button>
            <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Create account</button>
          </div>

          <div className="auth-role-toggle">
            <button className={role === 'buyer' ? 'active' : ''} onClick={() => setRole('buyer')}>
              <span>🏠</span> Buyer
            </button>
            <button className={role === 'agent' ? 'active' : ''} onClick={() => setRole('agent')}>
              <span>👔</span> Agent
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="form-field" style={{ marginBottom: 14 }}>
                <label className="form-label">Full name</label>
                <input className="form-input" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="form-field" style={{ marginBottom: 14 }}>
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} />
            </div>
            <div className="form-field" style={{ marginBottom: 20 }}>
              <label className="form-label">
                Password
                {mode === 'login' && <a className="forgot-link" href="#">Forgot?</a>}
              </label>
              <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <div className="auth-error">{error}</div>}
            <button type="submit" className="btn btn-primary auth-submit">
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="auth-divider"><span>or continue with</span></div>
          <div className="social-btns">
            <button className="social-btn" onClick={handleSubmit}>G Google</button>
            <button className="social-btn" onClick={handleSubmit}>in LinkedIn</button>
          </div>

          <p className="auth-footer-text">
            {mode === 'login' ? "No account? " : "Have an account? "}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

          <p className="demo-hint">Demo: click Sign in with any email — role switching available in the top bar.</p>
        </div>
      </div>
    </div>
  )
}