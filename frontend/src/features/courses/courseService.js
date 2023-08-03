import axios from 'axios'

const API_URL = '/api/courses/'
// Get user courses
const getCourses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const courseService = {
  getCourses,
}


export default courseService
