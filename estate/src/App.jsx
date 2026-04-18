import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import SearchPage from './pages/SearchPage'
import PropertyDetail from './pages/PropertyDetail'
import Dashboard from './pages/Dashboard'
import CreateListing from './pages/CreateListing'
import MessagesPage from './pages/MessagesPage'
import AppointmentsPage from './pages/AppointmentsPage'


function Layout({ children }) {

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-body fade-in">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/search" element={<Layout><SearchPage /></Layout>} />
        <Route path="/property/:id" element={<Layout><PropertyDetail /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/create-listing" element={<Layout><CreateListing /></Layout>} />
        <Route path="/messages" element={<Layout><MessagesPage /></Layout>} />
        <Route path="/appointments" element={<Layout><AppointmentsPage /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
