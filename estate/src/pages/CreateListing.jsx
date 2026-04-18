import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreateListing.css'

const STEPS = ['Basic info', 'Details', 'Media', 'Pricing', 'Review']
const AMENITIES_ALL = ['Parking', 'Gym', 'Pool', 'Lift', 'Security', 'Garden', 'Balcony', 'Power backup', 'WiFi', 'Pet friendly', 'CCTV', 'Generator', 'Home Theater', 'Furnished']

export default function CreateListing() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    title: '', type: 'Apartment', listingType: 'sale',
    city: '', address: '', beds: '', baths: '', sqft: '',
    parking: '', yearBuilt: '', floor: '',
    description: '', amenities: new Set(['Parking', 'Lift']),
    price: '', priceUnit: 'total',
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const toggleAmenity = (a) => {
    setForm(f => {
      const s = new Set(f.amenities)
      s.has(a) ? s.delete(a) : s.add(a)
      return { ...f, amenities: s }
    })
  }

  const handleSubmit = () => { setSubmitted(true) }

  if (submitted) {
    return (
      <div className="listing-submitted">
        <div className="submit-icon">✓</div>
        <h2>Listing submitted for review!</h2>
        <p>Our team will review your property within 24 hours. You'll receive a notification once it's approved.</p>
        <div className="submit-actions">
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Go to dashboard</button>
          <button className="btn btn-outline" onClick={() => { setSubmitted(false); setStep(1); }}>Add another</button>
        </div>
        <div className="workflow-steps">
          {[
            { n: 1, label: 'Submitted', done: true },
            { n: 2, label: 'Under review', active: true },
            { n: 3, label: 'Feedback / approval', done: false },
            { n: 4, label: 'Live on portal', done: false },
          ].map(s => (
            <div key={s.n} className={`wf-step ${s.done ? 'done' : ''} ${s.active ? 'active' : ''}`}>
              <div className="wf-circle">{s.done ? '✓' : s.n}</div>
              <div className="wf-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="create-listing-page">
      <div className="page-header">
        <h1 className="page-title">Create new listing</h1>
        <p className="page-subtitle">Listings require admin approval before going live</p>
      </div>

      {/* Step bar */}
      <div className="step-bar">
        {STEPS.map((s, i) => (
          <div key={s} className={`step-item ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}>
            <div className="step-circle">{step > i + 1 ? '✓' : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="listing-layout">
        <div className="listing-form card">
          {step === 1 && (
            <div className="form-step fade-in">
              <h3 className="form-step-title">Basic information</h3>
              <div className="form-grid">
                <div className="form-field full-width">
                  <label className="form-label">Property title</label>
                  <input className="form-input" placeholder="e.g. Modern 3BR Apartment with City Views" value={form.title} onChange={e => set('title', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Property type</label>
                  <select className="form-input" value={form.type} onChange={e => set('type', e.target.value)}>
                    {['Apartment','House','Villa','Studio','Commercial'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Listing type</label>
                  <select className="form-input" value={form.listingType} onChange={e => set('listingType', e.target.value)}>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>
                <div className="form-field full-width">
                  <label className="form-label">Full address</label>
                  <input className="form-input" placeholder="Street, City, State, PIN" value={form.address} onChange={e => set('address', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">City</label>
                  <select className="form-input" value={form.city} onChange={e => set('city', e.target.value)}>
                    <option value="">Select city</option>
                    {['Coimbatore','Chennai','Bangalore','Hyderabad','Pune','Goa','Mumbai','Delhi'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step fade-in">
              <h3 className="form-step-title">Property details</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Bedrooms</label>
                  <input className="form-input" type="number" min="0" placeholder="3" value={form.beds} onChange={e => set('beds', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Bathrooms</label>
                  <input className="form-input" type="number" min="0" placeholder="2" value={form.baths} onChange={e => set('baths', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Area (sq ft)</label>
                  <input className="form-input" type="number" placeholder="1450" value={form.sqft} onChange={e => set('sqft', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Parking spots</label>
                  <input className="form-input" type="number" min="0" placeholder="2" value={form.parking} onChange={e => set('parking', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Year built</label>
                  <input className="form-input" type="number" placeholder="2020" value={form.yearBuilt} onChange={e => set('yearBuilt', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Floor number</label>
                  <input className="form-input" type="number" placeholder="8" value={form.floor} onChange={e => set('floor', e.target.value)} />
                </div>
                <div className="form-field full-width">
                  <label className="form-label">Description</label>
                  <textarea className="form-input" rows={4} placeholder="Describe the property, neighbourhood, and highlights..." value={form.description} onChange={e => set('description', e.target.value)} />
                </div>
              </div>
              <div style={{marginTop:16}}>
                <div className="form-label" style={{marginBottom:10}}>Amenities</div>
                <div className="amenity-picker">
                  {AMENITIES_ALL.map(a => (
                    <button
                      key={a}
                      className={`amenity-chip ${form.amenities.has(a) ? 'selected' : ''}`}
                      onClick={() => toggleAmenity(a)}
                    >
                      {form.amenities.has(a) ? '✓ ' : ''}{a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step fade-in">
              <h3 className="form-step-title">Photos & media</h3>
              <div className="upload-zone">
                <div className="upload-icon">📷</div>
                <div className="upload-title">Upload property photos</div>
                <div className="upload-sub">PNG, JPG, WEBP — up to 20MB each</div>
                <button className="btn btn-outline" style={{marginTop:12}}>Choose files</button>
              </div>
              <div className="upload-zone" style={{marginTop:12}}>
                <div className="upload-icon">🎥</div>
                <div className="upload-title">Add virtual tour (optional)</div>
                <div className="upload-sub">Paste a Matterport, YouTube, or 360° tour URL</div>
                <input className="form-input" placeholder="https://my.matterport.com/..." style={{marginTop:12,maxWidth:400}} />
              </div>
              <div className="upload-tips">
                <div className="tip">📸 Add at least 5 high-quality photos to increase enquiries by 3×</div>
                <div className="tip">🎬 Listings with virtual tours get 60% more views</div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step fade-in">
              <h3 className="form-step-title">Pricing</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Asking price (₹)</label>
                  <input className="form-input" type="number" placeholder="8500000" value={form.price} onChange={e => set('price', e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Price unit</label>
                  <select className="form-input" value={form.priceUnit} onChange={e => set('priceUnit', e.target.value)}>
                    <option value="total">Total price</option>
                    <option value="sqft">Per sq ft</option>
                    <option value="month">Per month (rent)</option>
                  </select>
                </div>
              </div>
              <div className="price-preview card" style={{padding:20,marginTop:20,background:'var(--gray-50)'}}>
                <div className="form-label">Preview price display</div>
                <div style={{fontSize:28,fontFamily:'var(--font-display)',fontWeight:700,color:'var(--navy)',marginTop:8}}>
                  {form.price ? `₹${Number(form.price).toLocaleString('en-IN')}` : '₹ —'}
                  {form.priceUnit === 'month' ? '/mo' : form.priceUnit === 'sqft' ? '/sq ft' : ''}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="form-step fade-in">
              <h3 className="form-step-title">Review & submit</h3>
              <div className="review-grid">
                <div className="review-section">
                  <div className="review-label">Title</div>
                  <div className="review-value">{form.title || '(not set)'}</div>
                </div>
                <div className="review-section">
                  <div className="review-label">Type</div>
                  <div className="review-value">{form.type} · {form.listingType === 'sale' ? 'For Sale' : 'For Rent'}</div>
                </div>
                <div className="review-section">
                  <div className="review-label">Location</div>
                  <div className="review-value">{form.address || '(not set)'}</div>
                </div>
                <div className="review-section">
                  <div className="review-label">Specs</div>
                  <div className="review-value">{form.beds || '?'} beds · {form.baths || '?'} baths · {form.sqft || '?'} sq ft</div>
                </div>
                <div className="review-section">
                  <div className="review-label">Price</div>
                  <div className="review-value">{form.price ? `₹${Number(form.price).toLocaleString('en-IN')}` : '(not set)'}</div>
                </div>
                <div className="review-section full-width">
                  <div className="review-label">Amenities</div>
                  <div className="review-value">{[...form.amenities].join(', ') || 'None selected'}</div>
                </div>
              </div>
              <div className="review-note">
                By submitting, you confirm that all details are accurate. Our team will review within 24 hours.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="form-nav">
            {step > 1 && (
              <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>
            )}
            <div style={{flex:1}} />
            <button className="btn btn-ghost" onClick={() => navigate('/dashboard')}>Save draft</button>
            {step < 5 ? (
              <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>Continue →</button>
            ) : (
              <button className="btn btn-gold" onClick={handleSubmit}>Submit for approval</button>
            )}
          </div>
        </div>

        {/* Sidebar tips */}
        <div className="listing-aside">
          <div className="card" style={{padding:20,marginBottom:16}}>
            <div className="aside-section-title">Approval workflow</div>
            {[
              { n: 1, label: 'Submit listing', color: 'var(--green-bg)', text: 'var(--green)' },
              { n: 2, label: 'Admin reviews content', color: 'var(--blue-bg)', text: 'var(--blue)' },
              { n: 3, label: 'Feedback or approval', color: 'var(--amber-bg)', text: 'var(--amber)' },
              { n: 4, label: 'Goes live on portal', color: 'var(--gray-100)', text: 'var(--gray-500)' },
            ].map(w => (
              <div key={w.n} className="workflow-row">
                <div className="workflow-num" style={{background: w.color, color: w.text}}>{w.n}</div>
                <div className="workflow-txt">{w.label}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{padding:20}}>
            <div className="aside-section-title">Listing tips</div>
            {[
              '5+ photos increase enquiries by 3×',
              'Listings with virtual tours get 60% more views',
              'Accurate pricing gets 2× faster leads',
              'Reviews completed within 24 hours',
            ].map((t, i) => (
              <div key={i} className="tip-row">
                <span className="tip-dot">•</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}