import axios from 'axios'

const api = axios.create({
  baseURL: 'https://resource-management-system-nine.vercel.app/api'
})

export default api
