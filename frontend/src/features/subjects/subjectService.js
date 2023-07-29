import axios from 'axios'

const API_URL = '/api/subjects/'

// Create new subject
const createsubject = async (subjectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, subjectData, config)

  return response.data
}

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
// update user subject
const updatesubject = async (subjectData, subjectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + subjectId, subjectData, config)

  return response.data
}
// Delete user subject
const deletesubject = async (subjectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + subjectId, config)

  return response.data
}

// Toggle subject completion status
const toggleCompletesubject = async (subjectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}${subjectId}/toggle-complete`,
    {},
    config
  );

  return response.data;
};


// Edit subject text
const toggleEditsubject = async (subjectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}${subjectId}/toggleEdit`,
    {},
    config
  );

  return response.data;
};
const subjectService = {
  createsubject,
  getsubjects,
  deletesubject,
  updatesubject,
  toggleCompletesubject,
  toggleEditsubject
}


export default subjectService
