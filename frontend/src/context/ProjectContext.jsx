import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'
import toast from 'react-hot-toast'

const ProjectContext = createContext()
export const useProjects = () => useContext(ProjectContext)

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const res = await api.get('/projects')
        setProjects(res.data)
      } catch {
        toast.error('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const createProject = async (projectData) => {
    try {
      setLoading(true)
      const res = await api.post('/projects', projectData)
      setProjects(prev => [...prev, res.data.project])
      toast.success('Project created successfully')
      return { success: true }
    } catch (err){
      toast.error('Failed to create project')
      console.log(err)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const updateProject = async (projectId, updateData) => {
    try {
      setLoading(true)
      const res = await api.put(`/projects/${projectId}`, updateData)
      setProjects(prev => prev.map(p => (p._id === projectId ? res.data : p)))
      toast.success('Project updated successfully')
      return { success: true }
    } catch {
      toast.error('Failed to update project')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (projectId) => {
    try {
      setLoading(true)
      await api.delete(`/projects/${projectId}`)
      setProjects(prev => prev.filter(p => p._id !== projectId))
      toast.success('Project deleted successfully')
      return { success: true }
    } catch {
      toast.error('Failed to delete project')
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProjectContext.Provider value={{
      projects,
      setProjects,
      loading,
      createProject,
      updateProject,
      deleteProject
    }}>
      {children}
    </ProjectContext.Provider>
  )
}
