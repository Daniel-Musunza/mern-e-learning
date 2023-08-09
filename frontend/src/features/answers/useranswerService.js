import axios from 'axios'

const API_URL = '/api/useranswers/'

const getuseranswers = async () => {
  const response = await axios.get(API_URL)

  return response.data
}
const submitAnswers = async (answerData, answerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + answerId, answerData, config)

  return response.data
}
const useranswerService = {
  getuseranswers,
  submitAnswers
}


export default useranswerService
