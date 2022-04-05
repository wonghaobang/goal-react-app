import React from "react"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, resetAuthState } from "../redux/auth/authSlice"
import { resetGoalState } from "../redux/goals/goalSlice"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = (e) => {
    dispatch(logout())
    dispatch(resetAuthState())
    dispatch(resetGoalState())
    navigate("/")
  }

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link to="/" className="nav__link">
          Goalsetter
        </Link>
      </div>
      <ul className="nav__list">
        {user ? (
          <li className="nav__item">
            <button className="btn logout-btn" onClick={onLogout}>
              <FaSignOutAlt /> Loutout
            </button>
          </li>
        ) : (
          <>
            <li className="nav__item">
              <Link to="login" className="nav__link">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li className="nav__item">
              <Link to="register" className="nav__link">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Header
