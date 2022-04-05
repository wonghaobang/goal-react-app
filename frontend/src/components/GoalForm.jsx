import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createGoal } from "../redux/goals/goalSlice"

const GoalForm = () => {
  const [text, setText] = useState("")

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createGoal({ text }))
    setText("")
  }

  return (
    <>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="text" className="form-group-label">
              Goal
            </label>
            <input
              type="text"
              id="text"
              name="text"
              className="form-group-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Goal
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default GoalForm
