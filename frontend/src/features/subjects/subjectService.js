import axios from 'axios'

const API_URL = '/api/subjects/'


// Get user subjects
const getsubjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const subjectService = {
  getsubjects,
}


export default subjectService
