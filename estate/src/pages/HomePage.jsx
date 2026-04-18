import { useNavigate } from 'react-router-dom'
import { PROPERTIES } from '../data/mockData'
import PropertyCard from '../components/PropertyCard'
import './HomePage.css'

const STATS = [
  { label: 'Properties listed', value: '2,400+' },
  { label: 'Happy buyers', value: '1,800+' },
  { label: 'Cities covered', value: '32' },
  { label: 'Verified agents', value: '340+' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const featured = PROPERTIES.filter(p => p.featured)

  return (
    <div className="home-page">
      {/* Hero */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-tag">Trusted Real Estate Portal</div>
          <h1 className="hero-title">Find Your<br /><span className="gold-text">Dream Home</span></h1>
          <p className="hero-sub">Browse thousands of verified listings across India. Connect with top agents and schedule viewings instantly.</p>
          <div className="hero-search">
            <input className="hero-input" placeholder="Search city, area, or property name..." />
            <select className="hero-select">
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
            <button className="btn btn-gold hero-search-btn" onClick={() => navigate('/search')}>
              Search
            </button>
          </div>
          <div className="hero-tags">
            {['Coimbatore','Chennai','Bangalore','Hyderabad','Pune','Goa'].map(city => (
              <button key={city} className="city-tag" onClick={() => navigate('/search')}>{city}</button>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hc-img">🏡</div>
            <div className="hc-body">
              <div className="hc-price">₹1,20,00,000</div>
              <div className="hc-title">Luxury 4BR Villa with Pool</div>
              <div className="hc-addr">12 Oak Lane, Chennai</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="home-stats">
        {STATS.map(s => (
          <div key={s.label} className="home-stat">
            <div className="home-stat-value">{s.value}</div>
            <div className="home-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Featured */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-sub">Handpicked listings in prime locations</p>
          </div>
          <button className="btn btn-outline" onClick={() => navigate('/search')}>View all →</button>
        </div>
        <div className="featured-grid">
          {featured.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="home-section how-it-works">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 8 }}>How PropSpace works</h2>
        <p className="section-sub" style={{ textAlign: 'center', marginBottom: 36 }}>Three simple steps to your next property</p>
        <div className="steps-grid">
          {[
            { n: '01', icon: '⊙', title: 'Search & discover', desc: 'Use advanced filters to find properties that match your exact requirements across India.' },
            { n: '02', icon: '◷', title: 'Book a viewing', desc: 'Schedule appointments directly with verified agents at your preferred time.' },
            { n: '03', icon: '✓', title: 'Close the deal', desc: 'Chat with agents, review documents, and finalise your property with confidence.' },
          ].map(step => (
            <div key={step.n} className="step-card">
              <div className="step-number">{step.n}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="cta-content">
          <h2>Are you a real estate agent?</h2>
          <p>List your properties on PropSpace and connect with thousands of verified buyers.</p>
          <button className="btn btn-gold" onClick={() => navigate('/create-listing')}>List your property →</button>
        </div>
      </section>
    </div>
  )
}