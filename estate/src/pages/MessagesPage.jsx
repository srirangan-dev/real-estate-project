import { useState } from 'react'
import { CONVERSATIONS, USERS, PROPERTIES } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import './MessagesPage.css'

export default function MessagesPage() {
  const { user } = useAuth()
  const [activeConvId, setActiveConvId] = useState(CONVERSATIONS[0].id)
  const [msgInput, setMsgInput] = useState('')
  const [localMessages, setLocalMessages] = useState({})

  const allConvs = CONVERSATIONS

  const activeConv = allConvs.find(c => c.id === activeConvId)
  const msgs = [
    ...(activeConv?.messages || []),
    ...(localMessages[activeConvId] || []),
  ]

  const otherUserId = user?.role === 'agent' ? activeConv?.buyerId : activeConv?.agentId
  const otherUser = USERS.find(u => u.id === otherUserId)
  const property = PROPERTIES.find(p => p.id === activeConv?.propertyId)

  const sendMsg = () => {
    const text = msgInput.trim()
    if (!text) return
    const msg = {
      id: Date.now().toString(),
      senderId: user?.id || 'a1',
      text,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
    }
    setLocalMessages(prev => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), msg],
    }))
    setMsgInput('')
  }

  return (
    <div className="messages-page">
      <div className="page-header">
        <h1 className="page-title">Messages</h1>
        <p className="page-subtitle">Chat with buyers and agents</p>
      </div>

      <div className="messages-layout card">
        {/* Sidebar */}
        <div className="conv-sidebar">
          <div className="conv-search">
            <span>⊙</span>
            <input placeholder="Search conversations..." />
          </div>
          {allConvs.map(conv => {
            const otherId   = user?.role === 'agent' ? conv.buyerId : conv.agentId
            const other     = USERS.find(u => u.id === otherId)
            const prop      = PROPERTIES.find(p => p.id === conv.propertyId)
            const lastMsg   = conv.messages[conv.messages.length - 1]
            const isActive  = conv.id === activeConvId
            return (
              <div
                key={conv.id}
                className={`conv-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveConvId(conv.id)}
              >
                <div className="conv-av">{other?.avatar}</div>
                <div className="conv-info">
                  <div className="conv-name-row">
                    <span className="conv-name">{other?.name}</span>
                    <span className="conv-time">{lastMsg?.time}</span>
                  </div>
                  <div className="conv-preview">{prop?.title}</div>
                  <div className="conv-last">{lastMsg?.text}</div>
                </div>
                {conv.unread > 0 && <div className="unread-badge">{conv.unread}</div>}
              </div>
            )
          })}
        </div>

        {/* Chat main */}
        <div className="chat-main">
          {/* Chat header */}
          <div className="chat-header">
            <div className="chat-header-av">{otherUser?.avatar}</div>
            <div>
              <div className="chat-header-name">{otherUser?.name}</div>
              <div className="chat-header-prop">Re: {property?.title}</div>
            </div>
            <div style={{flex:1}} />
            <button className="btn btn-outline" style={{fontSize:12,padding:'6px 14px'}}>
              View property →
            </button>
          </div>

          {/* Messages */}
          <div className="chat-body">
            {msgs.map((msg, i) => {
              const isMe = msg.senderId === (user?.id || 'a1')
              const showDate = i === 0 || msgs[i-1].date !== msg.date
              return (
                <div key={msg.id}>
                  {showDate && <div className="date-sep">{msg.date}</div>}
                  <div className={`msg-row ${isMe ? 'me' : 'them'}`}>
                    {!isMe && <div className="msg-av">{otherUser?.avatar}</div>}
                    <div className={`bubble ${isMe ? 'me' : 'them'}`}>
                      <div className="bubble-text">{msg.text}</div>
                      <div className="bubble-time">{msg.time}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input */}
          <div className="chat-input-row">
            <button className="attach-btn" title="Attach file">📎</button>
            <input
              className="chat-input"
              placeholder="Type a message..."
              value={msgInput}
              onChange={e => setMsgInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
            />
            <button className="send-btn" onClick={sendMsg} disabled={!msgInput.trim()}>
              ➤
            </button>
          </div>
        </div>

        {/* Property info panel */}
        <div className="prop-panel">
          <div className="pp-title">Property</div>
          {property && (
            <>
              <div className="pp-img" style={{background: property.color}}>
                <span>{property.images[0]}</span>
              </div>
              <div className="pp-price">{property.priceLabel}</div>
              <div className="pp-name">{property.title}</div>
              <div className="pp-addr">{property.address}</div>
              <div className="pp-specs">
                <span>{property.beds} bd</span>
                <span>·</span>
                <span>{property.baths} ba</span>
                <span>·</span>
                <span>{property.sqft.toLocaleString()} sqft</span>
              </div>
              <span className={`badge badge-${property.status}`} style={{marginTop:8}}>
                {property.status}
              </span>
            </>
          )}
          <div className="pp-divider" />
          <div className="pp-title">Contact</div>
          {otherUser && (
            <div className="pp-contact">
              <div className="pp-av">{otherUser.avatar}</div>
              <div>
                <div className="pp-cname">{otherUser.name}</div>
                <div className="pp-crole" style={{textTransform:'capitalize'}}>{otherUser.role}</div>
                <div className="pp-cphone">{otherUser.phone}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}