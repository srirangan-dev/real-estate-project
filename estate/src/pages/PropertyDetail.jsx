import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PROPERTIES, USERS, TIME_SLOTS, BOOKED_SLOTS } from '../data/mockData'
import './PropertyDetail.css'

function CalendarMini({ selectedDay, onSelect }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const highlighted = [5, 10, 12, 17, 19, 22, 25]
  return (
    <div className="cal-mini">
      <div className="cal-header">
        <button className="cal-nav">‹</button>
        <span className="cal-month">April 2026</span>
        <button className="cal-nav">›</button>
      </div>
      <div className="cal-grid">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="cal-day-name">{d}</div>
        ))}
        {/* offset for April 2026 starting on Wednesday */}
        {[0,1,2].map(i => <div key={`e${i}`} />)}
        {days.map(d => (
          <button
            key={d}
            className={`cal-day ${d === 18 ? 'today' : ''} ${selectedDay === d ? 'selected' : ''} ${highlighted.includes(d) ? 'has-apt' : ''}`}
            onClick={() => onSelect(d)}
          >{d}</button>
        ))}
      </div>
    </div>
  )
}

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES[0]
  const agent = USERS.find(u => u.id === property.agentId)

  const [selectedDay, setSelectedDay] = useState(18)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [booked, setBooked] = useState(false)
  const [msgText, setMsgText] = useState('')
  const [msgSent, setMsgSent] = useState(false)

  const { title, priceLabel, address, beds, baths, sqft, parking, yearBuilt, type, status, images, color, amenities, description, listingType } = property

  const handleBook = () => {
    if (!selectedSlot) return
    setBooked(true)
    setTimeout(() => navigate('/appointments'), 1200)
  }

  const handleMsg = () => {
    if (!msgText.trim()) return
    setMsgSent(true)
    setTimeout(() => navigate('/messages'), 1000)
  }

  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => navigate('/')}>Home</button>
        <span>›</span>
        <button onClick={() => navigate('/search')}>Browse</button>
        <span>›</span>
        <span>{title}</span>
      </div>

      <div className="detail-layout">
        {/* Left column */}
        <div className="detail-main">
          {/* Image */}
          <div className="detail-img" style={{ background: color }}>
            <span className="detail-emoji">{images[0]}</span>
            <span className={`badge badge-${status} detail-status`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className="detail-type-tag">{type} · {listingType === 'rent' ? 'For Rent' : 'For Sale'}</span>
          </div>

          {/* Title block */}
          <div className="detail-title-block">
            <div>
              <h1 className="detail-title">{title}</h1>
              <div className="detail-addr">📍 {address}</div>
            </div>
            <div className="detail-price">{priceLabel}</div>
          </div>

          {/* Specs */}
          <div className="specs-row">
            {[
              { label: 'Bedrooms', value: beds },
              { label: 'Bathrooms', value: baths },
              { label: 'Area', value: `${sqft.toLocaleString()} sq ft` },
              { label: 'Parking', value: parking },
              { label: 'Year built', value: yearBuilt },
            ].map(s => (
              <div key={s.label} className="spec-box">
                <div className="spec-value">{s.value}</div>
                <div className="spec-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="detail-section">
            <h2 className="detail-section-title">About this property</h2>
            <p className="detail-desc">{description}</p>
          </div>

          {/* Amenities */}
          <div className="detail-section">
            <h2 className="detail-section-title">Amenities</h2>
            <div className="amenity-tags">
              {amenities.map(a => (
                <span key={a} className="amenity-tag">✓ {a}</span>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="detail-section">
            <h2 className="detail-section-title">Location</h2>
            <div className="map-placeholder">
              <span>🗺️</span>
              <p>{address}</p>
              <button className="btn btn-outline" style={{fontSize:13}}>Open in Maps</button>
            </div>
          </div>
        </div>

        {/* Right column: booking + agent */}
        <div className="detail-aside">
          {/* Schedule card */}
          <div className="card schedule-card">
            <h3 className="aside-title">Schedule a viewing</h3>
            <CalendarMini selectedDay={selectedDay} onSelect={setSelectedDay} />
            <div className="slots-label">Available slots — Apr {selectedDay}</div>
            <div className="slots-list">
              {TIME_SLOTS.map(slot => {
                const isBooked = BOOKED_SLOTS.includes(slot)
                return (
                  <button
                    key={slot}
                    disabled={isBooked}
                    className={`slot-btn ${isBooked ? 'booked' : ''} ${selectedSlot === slot ? 'selected' : ''}`}
                    onClick={() => !isBooked && setSelectedSlot(slot)}
                  >
                    <span>{slot}</span>
                    <span className="slot-status">{isBooked ? 'Booked' : 'Available'}</span>
                  </button>
                )
              })}
            </div>
            {booked ? (
              <div className="book-success">✓ Viewing confirmed! Redirecting…</div>
            ) : (
              <button
                className="btn btn-primary book-btn"
                disabled={!selectedSlot}
                onClick={handleBook}
              >
                {selectedSlot ? `Book for ${selectedSlot}` : 'Select a time slot'}
              </button>
            )}
          </div>

          {/* Agent card */}
          {agent && (
            <div className="card agent-card">
              <h3 className="aside-title">Listed by</h3>
              <div className="agent-row">
                <div className="agent-avatar">{agent.avatar}</div>
                <div>
                  <div className="agent-name">{agent.name}</div>
                  <div className="agent-meta">{agent.listings} listings · ⭐ {agent.rating}</div>
                </div>
              </div>
              <div className="agent-stats">
                <div><span>{agent.listings}</span><label>Listings</label></div>
                <div><span>{agent.sales}</span><label>Sales</label></div>
                <div><span>⭐ {agent.rating}</span><label>Rating</label></div>
              </div>
              {msgSent ? (
                <div className="book-success">Message sent! Redirecting to chat…</div>
              ) : (
                <>
                  <textarea
                    className="form-input msg-area"
                    placeholder="Write a message to the agent..."
                    rows={3}
                    value={msgText}
                    onChange={e => setMsgText(e.target.value)}
                  />
                  <button className="btn btn-outline msg-btn" onClick={handleMsg}>
                    Send message
                  </button>
                </>
              )}
              <a href={`tel:${agent.phone}`} className="btn btn-gold call-btn">
                📞 Call agent
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}