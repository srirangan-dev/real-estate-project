import { useState, useMemo } from 'react'
import { PROPERTIES } from '../data/mockData'
import PropertyCard from '../components/PropertyCard'
import './SearchPage.css'

const TYPES = ['All', 'Apartment', 'House', 'Villa', 'Studio']
const CITIES = ['All', 'Coimbatore', 'Chennai', 'Bangalore', 'Hyderabad', 'Pune', 'Goa']
const BEDS  = ['Any', '1+', '2+', '3+', '4+']
const SORTS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular']

export default function SearchPage() {
  const [query, setQuery]         = useState('')
  const [type, setType]           = useState('All')
  const [city, setCity]           = useState('All')
  const [listing, setListing]     = useState('all')
  const [beds, setBeds]           = useState('Any')
  const [priceMin, setPriceMin]   = useState('')
  const [priceMax, setPriceMax]   = useState('')
  const [sort, setSort]           = useState('Newest')
  const [view, setView]           = useState('grid') // 'grid' | 'list'

  const results = useMemo(() => {
    let list = [...PROPERTIES]
    if (query)   list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.address.toLowerCase().includes(query.toLowerCase()))
    if (type !== 'All') list = list.filter(p => p.type === type)
    if (city !== 'All') list = list.filter(p => p.city === city)
    if (listing !== 'all') list = list.filter(p => p.listingType === listing)
    if (beds !== 'Any') {
      const minBeds = parseInt(beds)
      list = list.filter(p => p.beds >= minBeds)
    }
    if (priceMin) list = list.filter(p => p.price >= Number(priceMin))
    if (priceMax) list = list.filter(p => p.price <= Number(priceMax))
    if (sort === 'Price: Low to High') list.sort((a,b) => a.price - b.price)
    if (sort === 'Price: High to Low') list.sort((a,b) => b.price - a.price)
    return list
  }, [query, type, city, listing, beds, priceMin, priceMax, sort])

  const reset = () => {
    setQuery(''); setType('All'); setCity('All'); setListing('all')
    setBeds('Any'); setPriceMin(''); setPriceMax(''); setSort('Newest')
  }

  return (
    <div className="search-page">
      <div className="page-header">
        <h1 className="page-title">Browse Properties</h1>
        <p className="page-subtitle">Explore verified listings across India</p>
      </div>

      {/* Filter bar */}
      <div className="filter-bar card">
        <div className="filter-main">
          <div className="filter-search">
            <span className="fi-icon">⊙</span>
            <input
              className="fi-input"
              placeholder="City, area, or property name..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-chips">
            {TYPES.map(t => (
              <button key={t} className={`chip ${type === t ? 'active' : ''}`} onClick={() => setType(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="filter-row">
          <select className="form-input fi-select" value={city} onChange={e => setCity(e.target.value)}>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="form-input fi-select" value={listing} onChange={e => setListing(e.target.value)}>
            <option value="all">Sale & Rent</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
          <select className="form-input fi-select" value={beds} onChange={e => setBeds(e.target.value)}>
            {BEDS.map(b => <option key={b}>{b}</option>)}
          </select>
          <input className="form-input fi-select" placeholder="Min price ₹" type="number" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
          <input className="form-input fi-select" placeholder="Max price ₹" type="number" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
          <button className="btn btn-ghost fi-reset" onClick={reset}>Reset</button>
        </div>
      </div>

      {/* Results header */}
      <div className="results-header">
        <div className="results-count">
          Showing <strong>{results.length}</strong> {results.length === 1 ? 'property' : 'properties'}
          {city !== 'All' && ` in ${city}`}
        </div>
        <div className="results-controls">
          <select className="form-input fi-select" value={sort} onChange={e => setSort(e.target.value)} style={{width:'auto'}}>
            {SORTS.map(s => <option key={s}>{s}</option>)}
          </select>
          <div className="view-toggle">
            <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>⊞</button>
            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>☰</button>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🏚️</div>
          <h3>No properties found</h3>
          <p>Try adjusting your filters or search term.</p>
          <button className="btn btn-outline" onClick={reset}>Clear filters</button>
        </div>
      ) : (
        <div className={`results-grid ${view === 'list' ? 'list-view' : ''}`}>
          {results.map(p => <PropertyCard key={p.id} property={p} compact={view === 'list'} />)}
        </div>
      )}
    </div>
  )
}