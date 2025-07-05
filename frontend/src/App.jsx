import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Assignments from './pages/Assignments'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Engineers from './pages/Engineers'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/authentication/ProtectedRoute'
import { Reports } from './pages/Reports'


function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/engineers"
          element={
            <ProtectedRoute>
              <Engineers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
