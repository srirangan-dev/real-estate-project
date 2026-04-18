import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { PROPERTIES, USERS, APPOINTMENTS, LEADS, MONTHLY_ENQUIRIES } from '../data/mockData'
import './Dashboard.css'

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div className="bar-chart">
      {data.map((d, i) => (
        <div key={d.month} className="bar-col">
          <div className="bar-val">{d.value}</div>
          <div
            className={`bar-fill ${i === data.length - 1 ? 'current' : ''}`}
            style={{ height: `${Math.round((d.value / max) * 100)}%` }}
          />
          <div className="bar-lbl">{d.month}</div>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const isAgent = user?.role === 'agent'

  const myProps  = PROPERTIES.filter(p => p.agentId === user?.id)
  const allProps = PROPERTIES

  const agentStats = [
    { label: 'Active listings', value: 24, delta: '+3 this month', up: true },
    { label: 'Total leads', value: 138, delta: '+12 this week', up: true },
    { label: 'Viewings booked', value: 47, delta: '+5 this week', up: true },
    { label: 'Properties sold', value: 9, delta: '-2 vs last month', up: false },
  ]

  const buyerStats = [
    { label: 'Saved properties', value: 2, delta: 'Browse more →', up: true },
    { label: 'Viewings scheduled', value: 1, delta: 'This week', up: true },
    { label: 'Messages', value: 3, delta: '2 unread', up: true },
    { label: 'Enquiries sent', value: 4, delta: 'This month', up: true },
  ]

  const stats = isAgent ? agentStats : buyerStats

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">
            {isAgent ? 'Agent dashboard' : 'My account'}
          </h1>
          <p className="page-subtitle">
            Welcome back, <strong>{user?.name}</strong>
          </p>
        </div>
        <div className="dashboard-actions">
          <select className="form-input" style={{ width: 'auto', fontSize: 13 }}>
            <option>This month</option>
            <option>Last month</option>
            <option>This quarter</option>
          </select>
          {isAgent && (
            <button className="btn btn-primary" onClick={() => navigate('/create-listing')}>
              + New listing
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-delta ${s.up ? 'up' : 'down'}`}>{s.delta}</div>
          </div>
        ))}
      </div>

      {isAgent ? (
        <>
          {/* Chart + Leads */}
          <div className="dash-two-col">
            <div className="card dash-chart">
              <div className="card-head">
                <span>Monthly enquiries</span>
                <span className="card-sub">Last 6 months</span>
              </div>
              <BarChart data={MONTHLY_ENQUIRIES} />
            </div>
            <div className="card dash-leads">
              <div className="card-head">
                <span>Hot leads</span>
                <span className="card-sub">{LEADS.length} active</span>
              </div>
              {LEADS.map(lead => {
                const buyer = USERS.find(u => u.id === lead.buyerId)
                const prop  = PROPERTIES.find(p => p.id === lead.propertyId)
                return (
                  <div key={lead.buyerId + lead.propertyId} className="lead-row">
                    <div className="lead-av">{buyer?.avatar}</div>
                    <div className="lead-info">
                      <div className="lead-name">{buyer?.name}</div>
                      <div className="lead-prop">{prop?.title}</div>
                    </div>
                    <span className={`badge badge-${lead.heat}`}>{lead.heat}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Approvals + Upcoming */}
          <div className="dash-two-col">
            <div className="card">
              <div className="card-head"><span>Pending approvals</span><span className="card-sub">Admin review</span></div>
              <table className="dash-table">
                <thead>
                  <tr><th>Property</th><th>Agent</th><th>Status</th><th></th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12 Oak Lane</td><td>James D.</td>
                    <td><span className="badge badge-pending">In review</span></td>
                    <td><button className="link-btn" onClick={() => navigate('/property/p2')}>View</button></td>
                  </tr>
                  <tr>
                    <td>5 River View</td><td>Sarah M.</td>
                    <td><span className="badge badge-active">Approved</span></td>
                    <td><button className="link-btn" onClick={() => navigate('/property/p4')}>View</button></td>
                  </tr>
                  <tr>
                    <td>88 Pine Rd</td><td>Tom K.</td>
                    <td><span className="badge badge-pending">In review</span></td>
                    <td><button className="link-btn">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <div className="card-head"><span>Upcoming viewings</span><span className="card-sub">Next 7 days</span></div>
              {APPOINTMENTS.map(apt => {
                const buyer = USERS.find(u => u.id === apt.buyerId)
                const prop  = PROPERTIES.find(p => p.id === apt.propertyId)
                return (
                  <div key={apt.id} className={`apt-row ${apt.status}`}>
                    <div className="apt-time">{apt.date} · {apt.time}</div>
                    <div className="apt-prop">{prop?.title}</div>
                    <div className="apt-buyer">
                      Buyer: {buyer?.name}
                      {apt.status === 'pending' && <span className="badge badge-pending" style={{marginLeft:6}}>Pending</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* My listings */}
          <div className="card">
            <div className="card-head"><span>My listings</span><button className="link-btn" onClick={() => navigate('/create-listing')}>+ Add new</button></div>
            <table className="dash-table">
              <thead><tr><th>Property</th><th>Type</th><th>Price</th><th>Status</th><th>Enquiries</th></tr></thead>
              <tbody>
                {allProps.slice(0, 4).map(p => (
                  <tr key={p.id} style={{cursor:'pointer'}} onClick={() => navigate(`/property/${p.id}`)}>
                    <td style={{fontWeight:500}}>{p.title}</td>
                    <td>{p.type}</td>
                    <td>{p.priceLabel}</td>
                    <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
                    <td>{Math.floor(Math.random() * 20) + 5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Buyer dashboard */
        <>
          <div className="dash-two-col">
            <div className="card">
              <div className="card-head"><span>Saved properties</span></div>
              <div className="saved-props">
                {PROPERTIES.slice(0, 2).map(p => (
                  <div key={p.id} className="saved-row" onClick={() => navigate(`/property/${p.id}`)}>
                    <div className="saved-img" style={{background: p.color}}><span>{p.images[0]}</span></div>
                    <div className="saved-info">
                      <div className="saved-title">{p.title}</div>
                      <div className="saved-price">{p.priceLabel}</div>
                      <div className="saved-addr">{p.address}</div>
                    </div>
                    <span className={`badge badge-${p.status}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-head"><span>My viewings</span></div>
              {APPOINTMENTS.slice(0, 2).map(apt => {
                const prop = PROPERTIES.find(p => p.id === apt.propertyId)
                return (
                  <div key={apt.id} className={`apt-row ${apt.status}`}>
                    <div className="apt-time">{apt.date} · {apt.time}</div>
                    <div className="apt-prop">{prop?.title}</div>
                    <div className="apt-buyer"><span className={`badge badge-${apt.status === 'confirmed' ? 'active' : 'pending'}`}>{apt.status}</span></div>
                  </div>
                )
              })}
              <button className="btn btn-outline" style={{width:'100%',marginTop:12,justifyContent:'center'}} onClick={() => navigate('/appointments')}>
                View all appointments
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-head"><span>Recommended for you</span><button className="link-btn" onClick={() => navigate('/search')}>Browse all</button></div>
            <div className="rec-grid">
              {PROPERTIES.filter(p => p.status === 'active').slice(0, 3).map(p => (
                <div key={p.id} className="rec-card" onClick={() => navigate(`/property/${p.id}`)}>
                  <div className="rec-img" style={{background:p.color}}>{p.images[0]}</div>
                  <div className="rec-body">
                    <div className="rec-price">{p.priceLabel}</div>
                    <div className="rec-title">{p.title}</div>
                    <div className="rec-addr">{p.city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}