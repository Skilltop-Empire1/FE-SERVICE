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
    username: '',
    subscriptionCode: '',
    termsAccepted: false,
  })

  const [passwordStrength, setPasswordStrength] = useState(0)

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const evaluatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/\d/.test(password)) strength += 25
    if (/[@$!%*?&]/.test(password)) strength += 25
    setPasswordStrength(strength)
    console.log(passwordStrength)
  }

  const dataToSubmit = {
    email: formData.email.trim(),
    password: formData.password.trim(),
    username: formData.username.trim(),
    subscriptionCode: formData.subscriptionCode.trim(),
  }

  const [signup, { isLoading, isError }] = useSignupMutation()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (name === 'password') {
      evaluatePasswordStrength(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.termsAccepted) {
      toast.error('You must accept the terms and conditions to sign up.')
      return
    }
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        'Password must be at least 8 characters, include one uppercase letter, one number, and one special character.',
      )
      return
    }
    try {
      const response = await signup(dataToSubmit).unwrap()
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
            <div className={style.passwordMeter}>
              <p>Password Strength</p>
              <div
                className={style.meterBar}
                style={{
                  width: `${passwordStrength / 1.5625}px`,
                  backgroundColor:
                    passwordStrength === 100
                      ? 'green'
                      : passwordStrength >= 50
                        ? 'orange'
                        : 'red',
                }}
              ></div>
            </div>
          </div>
          <div className={style.inputField}>
            <label htmlFor="username">Organization Name:</label>
            <input
              className={style.input}
              type="text"
              id="username"
              name="username"
              placeholder="Enter your organization"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputField}>
            <label htmlFor="subscriptionCode">Signup Code:</label>
            <input
              className={style.input}
              type="text"
              id="subscriptionCode"
              name="subscriptionCode"
              placeholder="Enter your signup code"
              value={formData.subscriptionCode}
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
