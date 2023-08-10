import axios from 'axios'

const API_URL = '/api/chapters/'
// Get user chapters
const getchapters = async () => {
  const response = await axios.get(API_URL)

  return response.data
}
const addchapter = async (chapterData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL , chapterData, config)

  return response.data
}
const chapterService = {
  getchapters,
  addchapter
}


export default chapterService
