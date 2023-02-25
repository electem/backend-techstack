/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from 'axios'
const token = localStorage.getItem('token')
export default axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})
