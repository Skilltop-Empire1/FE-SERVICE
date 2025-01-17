import React, { useState } from 'react'
import signUpImage from '../../assets/signupIllustration.svg'
import style from './SignUp.module.css'
import { Link } from 'react-router'
import { useSignupMutation } from '../../redux/api/authApi'
import { toast, ToastContainer } from 'react-toastify'

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    organization: '',
    termsAccepted: false,
  })
  const [signup, { isLoading, isError }] = useSignupMutation()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    const { email, password, organization } = formData
    e.preventDefault()
    if (!formData.termsAccepted) {
      toast.error('You must accept the terms and conditions to sign up.')
      return
    }
    try {
      const response = await signup(formData).unwrap()
    } catch (error) {}
    console.log('Form submitted with data:', formData)
  }

  return (
    <div className={style.container}>
      <ToastContainer position="top-center" />
      <div className={style.illustrationWrapper}>
        <img src={signUpImage} alt="Sign Up Illustration" />
      </div>

      <div className={style.formWrapper}>
        <h2>Create an Account</h2>
        <p>Create an Account to manage your team and tasks.</p>
        <form onSubmit={handleSubmit}>
          <div className={style.inputField}>
            <label htmlFor="email">Email Address:</label>
            <input
              className={style.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email address"
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputField}>
            <label htmlFor="password">Password:</label>
            <input
              className={style.input}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputField}>
            <label htmlFor="organization">Organization Name:</label>
            <input
              className={style.input}
              type="text"
              id="organization"
              name="organization"
              placeholder="Enter your organization"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.checkboxField}>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className={style.checkbox}
            />
            <label>By clicking, you agree to IMS terms and conditions</label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className={style.toLoginRoute}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
