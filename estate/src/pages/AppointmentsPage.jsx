import { useState } from 'react'
import { APPOINTMENTS, USERS, PROPERTIES, TIME_SLOTS, BOOKED_SLOTS } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import './AppointmentsPage.css'

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1)
const HAS_APTS = [5, 10, 12, 17, 18, 19, 21, 22, 25]

export default function AppointmentsPage() {
  const { user } = useAuth()
  const [selectedDay, setSelectedDay] = useState(18)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedProp, setSelectedProp] = useState(PROPERTIES[0].id)
  const [notes, setNotes] = useState('')
  const [booked, setBooked] = useState(false)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? APPOINTMENTS : APPOINTMENTS.filter(a => a.status === filter)

  const handleBook = () => {
    if (!selectedSlot) return
    setBooked(true)
    setTimeout(() => setBooked(false), 3000)
    setSelectedSlot(null)
    setNotes('')
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1 className="page-title">Appointments</h1>
        <p className="page-subtitle">Schedule and manage property viewings</p>
      </div>

      <div className="apts-layout">
        {/* Calendar + booking */}
        <div className="apt-left">
          <div className="card cal-card">
            <div className="cal-header-row">
              <button className="cal-nav-btn">‹</button>
              <span className="cal-month-title">April 2026</span>
              <button className="cal-nav-btn">›</button>
            </div>
            <div className="full-cal-grid">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                <div key={d} className="fcal-day-name">{d}</div>
              ))}
              {[0,1,2].map(i => <div key={`e${i}`} />)}
              {DAYS.map(d => (
                <button
                  key={d}
                  className={`fcal-day ${d === 18 ? 'today' : ''} ${selectedDay === d ? 'selected' : ''} ${HAS_APTS.includes(d) ? 'has-apt' : ''}`}
                  onClick={() => setSelectedDay(d)}
                >{d}</button>
              ))}
            </div>
          </div>

          {/* Book new */}
          <div className="card book-card">
            <h3 className="book-title">Book a viewing</h3>
            {booked ? (
              <div className="book-success">
                <span>✓</span>
                <div>
                  <div style={{fontWeight:600}}>Viewing confirmed!</div>
                  <div style={{fontSize:12,color:'var(--green)',marginTop:2}}>Apr {selectedDay} — Added to your schedule</div>
                </div>
              </div>
            ) : (
              <>
                <div className="form-field" style={{marginBottom:12}}>
                  <label className="form-label">Property</label>
                  <select className="form-input" value={selectedProp} onChange={e => setSelectedProp(e.target.value)}>
                    {PROPERTIES.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </div>
                <div className="slots-label">Available slots — Apr {selectedDay}</div>
                <div className="slots-grid">
                  {TIME_SLOTS.map(slot => {
                    const isBooked = BOOKED_SLOTS.includes(slot)
                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        className={`slot-pill ${isBooked ? 'booked' : ''} ${selectedSlot === slot ? 'selected' : ''}`}
                        onClick={() => !isBooked && setSelectedSlot(selectedSlot === slot ? null : slot)}
                      >{slot}</button>
                    )
                  })}
                </div>
                <div className="form-field" style={{marginTop:14,marginBottom:14}}>
                  <label className="form-label">Notes for agent (optional)</label>
                  <textarea className="form-input" rows={2} placeholder="Any questions or requirements..." value={notes} onChange={e => setNotes(e.target.value)} />
                </div>
                <button
                  className="btn btn-primary book-submit"
                  disabled={!selectedSlot}
                  onClick={handleBook}
                >
                  {selectedSlot ? `Confirm viewing — Apr ${selectedDay} at ${selectedSlot}` : 'Select a time slot'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Appointments list */}
        <div className="apt-right">
          <div className="apt-list-header">
            <h3 className="apt-list-title">Scheduled viewings</h3>
            <div className="apt-filter-tabs">
              {['all','confirmed','pending'].map(f => (
                <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="apt-cards">
            {filtered.map(apt => {
              const buyer = USERS.find(u => u.id === apt.buyerId)
              const prop  = PROPERTIES.find(p => p.id === apt.propertyId)
              const agent = USERS.find(u => u.id === apt.agentId)
              const isAgent = user?.role === 'agent'
              return (
                <div key={apt.id} className={`apt-card ${apt.status}`}>
                  <div className="apt-card-left">
                    <div className="apt-card-date">{apt.date}</div>
                    <div className="apt-card-time">{apt.time}</div>
                  </div>
                  <div className="apt-card-body">
                    <div className="apt-card-prop">{prop?.title}</div>
                    <div className="apt-card-addr">{prop?.address}</div>
                    <div className="apt-card-person">
                      {isAgent
                        ? `👤 Buyer: ${buyer?.name}`
                        : `👔 Agent: ${agent?.name}`
                      }
                      {apt.notes && <span className="apt-note"> · {apt.notes}</span>}
                    </div>
                  </div>
                  <div className="apt-card-right">
                    <span className={`badge badge-${apt.status === 'confirmed' ? 'active' : 'pending'}`}>
                      {apt.status}
                    </span>
                    <div className="apt-actions">
                      <button className="link-btn-sm">Reschedule</button>
                      <button className="link-btn-sm danger">Cancel</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Stats summary */}
          <div className="apt-summary">
            <div className="apt-sum-card">
              <div className="apt-sum-val">{APPOINTMENTS.length}</div>
              <div className="apt-sum-label">Total this month</div>
            </div>
            <div className="apt-sum-card">
              <div className="apt-sum-val">{APPOINTMENTS.filter(a => a.status === 'confirmed').length}</div>
              <div className="apt-sum-label">Confirmed</div>
            </div>
            <div className="apt-sum-card">
              <div className="apt-sum-val">{APPOINTMENTS.filter(a => a.status === 'pending').length}</div>
              <div className="apt-sum-label">Pending</div>
            </div>
            <div className="apt-sum-card">
              <div className="apt-sum-val">0</div>
              <div className="apt-sum-label">Cancelled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}