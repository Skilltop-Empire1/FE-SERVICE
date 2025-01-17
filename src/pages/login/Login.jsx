import React, { useState } from 'react'
import loginIllustration from '../../assets/loginIllustration.svg'

import style from './Login.module.css'
import { Link } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { useLoginMutation } from '../../redux/api/authApi'
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [login, { isLoading, isError }] = useLoginMutation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    try {
      const response = await login(formData).unwrap()
      console.log('Logged in successfully:', response.data)
    } catch (error) {
      toast.error(
        'Error logging in:',
        error.data?.message || 'There was an error logging in',
      )
      console.error('Error logging in:', error)
    }
  }

  return (
    <div className={style.container}>
      <ToastContainer />
      <div className={style.illustrationWrapper}>
        <img src={loginIllustration} alt="Brand Logo" />
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
