import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <main className="min-h-screen bg-onyx-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-onyx-700 border-t-gold-500 rounded-full animate-spin" />
          <p className="text-onyx-400 text-sm tracking-wide">Verifying session…</p>
        </div>
      </main>
    )
  }

  if (!currentUser) {
    // Preserve intended destination so we can redirect back after login
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return children
}
