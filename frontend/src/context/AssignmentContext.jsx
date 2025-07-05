import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'
import toast from 'react-hot-toast'

const AssignmentContext = createContext()
export const useAssignments = () => useContext(AssignmentContext)

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true)
        const res = await api.get('/assignments')
        setAssignments(res.data)
      } catch {
        toast.error('Failed to load assignments')
      } finally {
        setLoading(false)
      }
    }
    fetchAssignments()
  }, [])

  const createAssignment = async (assignmentData) => {
    try {
      setLoading(true)
      const res = await api.post('/assignments', assignmentData)
      setAssignments(prev => [...prev, res.data])
      toast.success('Assignment created successfully')
      return { success: true }
    } catch {
      toast.error('Failed to create assignment')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const updateAssignment = async (assignmentId, updateData) => {
    try {
      setLoading(true)
      const res = await api.put(`/assignments/${assignmentId}`, updateData)
      setAssignments(prev => prev.map(a => (a._id === assignmentId ? res.data : a)))
      toast.success('Assignment updated successfully')
      return { success: true }
    } catch {
      toast.error('Failed to update assignment')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const deleteAssignment = async (assignmentId) => {
    try {
      setLoading(true)
      await api.delete(`/assignments/${assignmentId}`)
      setAssignments(prev => prev.filter(a => a._id !== assignmentId))
      toast.success('Assignment deleted successfully')
      return { success: true }
    } catch {
      toast.error('Failed to delete assignment')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // Calculate available capacity for an engineer:
  // Accept engineerId, calculate total allocated % from assignments and subtract from maxCapacity from engineers
  // This would require passing engineers list or calling from EngineerContext or fetching here.
  // For simplicity, calculation is better done in UI component or a shared util function.

  return (
    <AssignmentContext.Provider value={{
      assignments,
      setAssignments,
      loading,
      createAssignment,
      updateAssignment,
      deleteAssignment
    }}>
      {children}
    </AssignmentContext.Provider>
  )
}
