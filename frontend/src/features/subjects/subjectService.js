import axios from 'axios'

const API_URL = '/api/subjects/'
const API_URL2 = '/api/subjects/allsubjects/'
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
const addNotes = async (subjectData, subjectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + subjectId, subjectData, config)

  return response.data
}
const addSubject = async (subjectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL , subjectData, config)

  return response.data
}
const getallsubjects = async (token) => {
    const response = await axios.get(API_URL2)

  return response.data
}

const subjectService = {
  getsubjects,
  addNotes,
  addSubject,
  getallsubjects,
}


export default subjectService
