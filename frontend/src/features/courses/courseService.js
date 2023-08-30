import axios from 'axios'

const API_URL = '/api/courses/'
// Get user courses
const getCourses = async () => {
  const response = await axios.get(API_URL)

return response.data
}
const createCourse = async (courseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.post(API_URL , courseData, config)
  return response.data
}
const courseService = {
  getCourses,
  createCourse
}


export default courseService
