import { useNavigate } from 'react-router-dom'
import './PropertyCard.css'

export default function PropertyCard({ property, compact = false }) {
  const navigate = useNavigate()
  const { id, title, priceLabel, address, beds, baths, sqft, type, status, images, color, featured } = property

  return (
    <div className={`prop-card ${compact ? 'compact' : ''}`} onClick={() => navigate(`/property/${id}`)}>
      <div className="prop-img" style={{ background: color }}>
        <span className="prop-emoji">{images[0]}</span>
        {featured && <div className="featured-ribbon">Featured</div>}
        <div className="prop-status">
          <span className={`badge badge-${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <button className="fav-btn" onClick={e => e.stopPropagation()} title="Save">♡</button>
      </div>
      <div className="prop-body">
        <div className="prop-price">{priceLabel}</div>
        <div className="prop-title">{title}</div>
        <div className="prop-addr">{address}</div>
        <div className="prop-stats">
          <span><b>{beds}</b> beds</span>
          <span className="dot">·</span>
          <span><b>{baths}</b> baths</span>
          <span className="dot">·</span>
          <span><b>{sqft.toLocaleString()}</b> sq ft</span>
          <span className="dot">·</span>
          <span>{type}</span>
        </div>
      </div>
    </div>
  )
}