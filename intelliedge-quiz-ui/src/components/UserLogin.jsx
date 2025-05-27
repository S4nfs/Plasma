// src/components/UserLogin.jsx
import React, { useState } from 'react'

const UserLogin = ({ onNext }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const generateUserId = (name, phone) => {
    return btoa(`${name}-${phone}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !phone) return alert('Please enter name and phone.')
    const userId = generateUserId(name, phone)
    onNext({ name, phone, userId })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <div className='space-y-3 text-slate-600'>
        <input
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        <input
          type='tel'
          placeholder='Enter Mobile No.'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
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
