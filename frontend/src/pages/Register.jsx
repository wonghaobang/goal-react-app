import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import { register, resetAuthState } from "../redux/auth/authSlice"
import Spinner from "../components/Spinner"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { name, email, password, confirmPassword } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, isLoading, message } = useSelector(
    (state) => state.auth
  )

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Password do not match")
    } else {
      dispatch(register({ name, email, password }))
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      })
    }

    if (user) {
      toast.success("login successfully")
      navigate("/")
    }

    dispatch(resetAuthState())
  }, [isError, user, message, dispatch, navigate])

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-group-input"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-group-input"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-group-input"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-group-input"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>

      {isLoading && <Spinner />}
    </>
  )
}

export default Register
