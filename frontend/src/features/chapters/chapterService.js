import axios from 'axios'

const API_URL = '/api/chapters/'
// Get user chapters
const getchapters = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const chapterService = {
  getchapters,
}


export default chapterService
