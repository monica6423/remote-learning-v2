import axios from 'axios'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://react-remote-learning-platform-backend.vercel.app'
    : 'https://react-remote-learning-platform-backend.vercel.app'

export const API = axios.create({
  baseURL: `${API_URL}`,
})
