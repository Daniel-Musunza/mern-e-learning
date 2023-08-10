import axios from 'axios'

const API_URL = '/api/questions/'
// Get user chapters
const getquestions = async () => {
  const response = await axios.get(API_URL)

  return response.data
}
const addquestion = async (questionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL , questionData, config)

  return response.data
}
const questionService = {
  getquestions,
  addquestion
}


export default questionService
