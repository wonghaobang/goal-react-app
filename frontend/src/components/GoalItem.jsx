import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateGoal, deleteGoal } from "../redux/goals/goalSlice"
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa"
import { unwrapResult } from "@reduxjs/toolkit"

const GoalItem = ({ goal }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [editGoal, setEditGoal] = useState(goal.text)
  const [date, setDate] = useState(goal.createdAt)
  const dispatch = useDispatch()

  return (
    <div className="goal">
      <div className="goal-action-icons">
        {!openEdit ? (
          <>
            <FaEdit color="blue" onClick={() => setOpenEdit(!openEdit)} />
            <FaTrash
              color="#ff7b7b"
              onClick={() => dispatch(deleteGoal(goal._id))}
            />
          </>
        ) : (
          <>
            <FaCheck
              color="green"
              onClick={() => {
                dispatch(
                  updateGoal({
                    goalId: goal._id,
                    editGoal,
                  })
                )
                  .then(unwrapResult)
                  .then((goal) => {
                    setDate(goal.updatedAt)
                  })

                setOpenEdit(!openEdit)
              }}
            />

            <FaTimes
              color="red"
              onClick={() => {
                setEditGoal(goal.text)
                setOpenEdit(!openEdit)
              }}
            />
          </>
        )}
      </div>

      {new Date(date).toLocaleString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}

      {!openEdit && <p className="goal-text">{goal.text}</p>}

      {openEdit && (
        <input
          type="text"
          className="form-group-input"
          value={editGoal}
          onChange={(e) => setEditGoal(e.target.value)}
        />
      )}
    </div>
  )
}

export default GoalItem
