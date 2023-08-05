import axios from 'axios'

const API_URL = '/api/answers/'
// Get user chapters
const getanswers = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const answerService = {
  getanswers,
}


export default answerService
