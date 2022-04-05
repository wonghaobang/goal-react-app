import React, { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login, resetAuthState } from "../redux/auth/authSlice"
import Spinner from "../components/Spinner"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData
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
    dispatch(login({ email, password }))
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
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className="form">
        <form onSubmit={handleOnSubmit}>
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

export default Login
