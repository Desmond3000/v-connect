import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: (data: any) => api.post('/api/auth/login', data),       // ← add /api
  register: (data: any) => api.post('/api/auth/register', data)  // ← add /api
}

export const vehicleAPI = {
  getAll: (type?: string) => api.get('/api/vehicles', { params: { type } }),
  getMy: () => api.get('/api/vehicles/my'),
  getOne: (id: string) => api.get(`/api/vehicles/${id}`),
  post: (data: any) => api.post('/api/vehicles', data),
  update: (id: string, data: any) => api.put(`/api/vehicles/${id}`, data),
  updateStatus: (id: string, status: string) =>
    api.patch(`/api/vehicles/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/api/vehicles/${id}`)
}

export default api