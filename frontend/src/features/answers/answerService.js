import axios from 'axios'

const API_URL = '/api/answers/'
// Get user chapters
const getanswers = async () => {
  const response = await axios.get(API_URL)

  return response.data
}
const addanswer = async (answerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL , answerData, config)

  return response.data
}
const answerService = {
  getanswers,
  addanswer
}


export default answerService
