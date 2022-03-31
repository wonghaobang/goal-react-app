const asyncHandler = require("express-async-handler")
const goalModel = require("../models/goalModel")

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalModel.find({ user: req.id })
  res.status(200).json(goals)
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Please add a text field")
  }

  const goal = await goalModel.create({
    text: req.body.text,
    user: req.id,
  })

  res.status(200).json(goal)
})

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error("Please add a text field")
  }

  const goal = await goalModel.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error("Goal not found")
  }

  if (goal.user.toString() !== req.id) {
    res.status(401)
    throw new Error("User not authorized to update this goal (not yours)")
  }

  goal.text = req.body.text
  await goal.save()

  res.status(200).json(goal)
})

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error("Goal not found")
  }

  if (goal.user.toString() !== req.id) {
    res.status(401)
    throw new Error("User not authorized to delete this goal (not yours)")
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
