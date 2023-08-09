import axios from 'axios'

const API_URL = '/api/correctanswers/'

const getcorrectanswers = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const correctanswerService = {
  getcorrectanswers,
}


export default correctanswerService
