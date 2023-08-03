import axios from 'axios'

const API_URL = '/api/courses/'
// Get user courses
const getCourses = async () => {
  const response = await axios.get(API_URL)

return response.data
}

const courseService = {
  getCourses,
}


export default courseService
