import axios from "axios"

const API_URL = "http://localhost:5000/api/goals"

const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, goalData, config)
  return response.data
}

const updateGoal = async (goalId, editGoal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    `${API_URL}/${goalId}`,
    { text: editGoal },
    config
  )

  return response.data
}

const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL}/${goalId}`, config)
  return response.data
}

const goalService = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
}

export default goalService
