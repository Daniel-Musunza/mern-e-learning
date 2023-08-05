import axios from 'axios'

const API_URL = '/api/questions/'
// Get user chapters
const getquestions = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const questionService = {
  getquestions,
}


export default questionService
