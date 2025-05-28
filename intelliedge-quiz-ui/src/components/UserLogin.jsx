// src/components/UserLogin.jsx
import React, { useState } from 'react'

const UserLogin = ({ onNext }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [nameError, setNameError] = useState('')

  const generateUserId = (name, phone) => {
    return btoa(`${name}-${phone}`)
  }

  const validatePhone = (value) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(value)
  }

  const validateName = (value) => {
    const nameRegex = /^[A-Za-z\s]{2,50}$/
    return nameRegex.test(value)
  }

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
    if (value && !validateName(value)) {
      setNameError('Name should only contain letters and spaces (2-50 characters)')
    } else {
      setNameError('')
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    setPhone(value)
    if (value && !validatePhone(value)) {
      setPhoneError('Please enter valid 10 digit mobile number')
    } else {
      setPhoneError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate both fields
    const isNameValid = validateName(name)
    const isPhoneValid = validatePhone(phone)

    // Here Throw rrors if fields are invalid
    if (!isNameValid) {
      setNameError('Name should only contain letters and spaces (2-50 characters)')
    }
    if (!isPhoneValid) {
      setPhoneError('Please enter valid 10 digit mobile number')
    }

    // Return early if either field is invalid
    if (!isNameValid || !isPhoneValid) {
      return
    }

    const userId = generateUserId(name, phone)
    onNext({ name, phone, userId })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <div className='space-y-3 text-slate-600'>
        <div>
          <input
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={handleNameChange}
            required
            className={`w-full px-3 py-2 border ${
              nameError ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {nameError && <p className='text-red-500 text-sm mt-1'>{nameError}</p>}
        </div>
        <div>
          <input
            type='tel'
            placeholder='Enter Mobile No.'
            value={phone}
            onChange={handlePhoneChange}
            required
            className={`w-full px-3 py-2 border ${
              phoneError ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {phoneError && <p className='text-red-500 text-sm mt-1'>{phoneError}</p>}
        </div>
      </div>
      <button
        type='submit'
        className='w-full py-2 text-white font-semibold rounded-md shadow-md bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_0%,_rgba(0,212,255,1)_100%)] hover:opacity-90 transition duration-300 transform hover:scale-[1.02]'
      >
        Start Test
      </button>
    </form>
  )
}

export default UserLogin
