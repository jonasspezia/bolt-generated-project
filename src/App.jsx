import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import VideoAnalysis from './pages/VideoAnalysis'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="analysis"
            element={
              <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                <VideoAnalysis />
              </ProtectedRoute>
            }
          />
          <Route path="reports" element={<Reports />} />
          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
