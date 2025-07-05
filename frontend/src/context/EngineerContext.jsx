import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'
import toast from 'react-hot-toast'

const EngineerContext = createContext()
export const useEngineers = () => useContext(EngineerContext)

export const EngineerProvider = ({ children }) => {
  const [engineers, setEngineers] = useState([])
  const [managers, setManagers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        setLoading(true)
        const res = await api.get('/engineers') // should return all users with roles
        const allUsers = res.data

        // Separate based on role
        setEngineers(allUsers.filter(user => user.role === 'engineer'))
        setManagers(allUsers.filter(user => user.role === 'manager'))
      } catch (err) {
        toast.error('Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchEngineers()
  }, [])

  const createEngineer = async (engineerData) => {
    try {
      setLoading(true)
      const res = await api.post('/engineers', engineerData)
      const newUser = res.data

      if (newUser.role === 'engineer') {
        setEngineers(prev => [...prev, newUser])
      } else if (newUser.role === 'manager') {
        setManagers(prev => [...prev, newUser])
      }

      toast.success('User created successfully')
      return { success: true }
    } catch {
      toast.error('Failed to create user')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const updateEngineer = async (userId, updateData) => {
    try {
      setLoading(true)
      const res = await api.put(`/engineers/${userId}`, updateData)
      const updatedUser = res.data

      if (updatedUser.role === 'engineer') {
        setEngineers(prev => prev.map(e => (e._id === userId ? updatedUser : e)))
      } else if (updatedUser.role === 'manager') {
        setManagers(prev => prev.map(m => (m._id === userId ? updatedUser : m)))
      }

      toast.success('User updated successfully')
      return { success: true }
    } catch {
      toast.error('Failed to update user')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const deleteEngineer = async (userId) => {
    try {
      setLoading(true)
      await api.delete(`/engineers/${userId}`)

      setEngineers(prev => prev.filter(e => e._id !== userId))
      setManagers(prev => prev.filter(m => m._id !== userId))

      toast.success('User deleted successfully')
      return { success: true }
    } catch {
      toast.error('Failed to delete user')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  return (
    <EngineerContext.Provider value={{
      engineers,
      managers,
      loading,
      createEngineer,
      updateEngineer,
      deleteEngineer
    }}>
      {children}
    </EngineerContext.Provider>
  )
}
