import React, { useState } from 'react'
import loginIllustration from '../../assets/loginIllustration.svg'

import style from './Login.module.css'
import { Link } from 'react-router-dom'
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
  }

  return (
    <div className={style.container}>
      <div className={style.illustrationWrapper}>
        <div>
          <img src={loginIllustration} alt="Brand Logo" />
        </div>
      </div>

      <div className={style.formWrapper}>
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.inputField}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputField}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className={style.forgotPassword}>
              <Link to="/">Forgot password?</Link>
            </div>
          </div>

          <button type="submit">Sign in</button>
        </form>
        <p className={style.toSignupRoute}>
          Don't Have an Account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
