import axios from 'axios'
const API_URL = 'http://localhost:3000/auth/login'
class AuthService {
  async login (username: string, password: string) {
    const response = await axios.post(API_URL, {
      username,
      password
    })
    const token = response.data.access_token
    localStorage.setItem('token', token)
    return response.data
  }

  logout () {
    localStorage.removeItem('token')
  }

  getCurrentUser () {
    const userStr = localStorage.getItem('token')
    if (userStr) return userStr

    return null
  }
}

export default new AuthService()
