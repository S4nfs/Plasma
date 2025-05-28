// src/components/UserProfileForm.jsx
import React, { useState, useMemo } from 'react'
import { useUser } from '@clerk/clerk-react'
import collegesByState from '../data/colleges_list.json'
import Header from './Header'

const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Passout']
const batchYears = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i)

const UserProfileForm = ({ onSubmit }) => {
  const { user } = useUser()
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phoneNumbers?.phoneNumber || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    state: '',
    college: '',
    batchYear: '',
    semester: '',
  })

  const states = useMemo(() => Object.keys(collegesByState), [])
  const colleges = useMemo(() => collegesByState[formData.state] || [], [formData.state])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user_id = btoa(`${formData.firstName.toLowerCase()} ${formData.lastName.toLowerCase()}-${formData.phone}`)
    const userProfileJson = {
      ...formData,
      user_id,
      timestamp: new Date().toISOString(),
    }

    console.log('✅ User JSON:', userProfileJson)

    // Optional backend post:
    // await fetch(`${serverUrl}/save-profile', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userProfileJson)
    // });

    onSubmit(userProfileJson)
  }

  return (
    <>
      <Header />
      <div className='min-h-screen bg-slate-200 px-4 py-8'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='mb-8 text-center text-2xl font-bold text-slate-600'>📋 Complete Your Profile</h2>

          <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <input
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder='First Name'
                required
                className='w-full rounded-lg border border-gray-300 bg-gray-800 p-3 text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500'
              />

              <input
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                placeholder='Last Name'
                required
                className='w-full rounded-lg border border-gray-300 bg-gray-800 p-3 text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500'
              />

              <input
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='+91'
                className='w-full rounded-lg border border-gray-300 bg-gray-800 p-3 text-white opacity-70 focus:border-sky-500 focus:ring-2 focus:ring-sky-500'
              />

              <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                className='w-full rounded-lg border border-gray-300 bg-gray-800 p-3 text-white opacity-70 focus:border-sky-500 focus:ring-2 focus:ring-sky-500'
              />
            </div>

            <div className='space-y-4'>
              <select
                name='state'
                value={formData.state}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-gray-300 bg-gray-800 p-3 text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500'
              >
                <option value=''>Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <select
                name='college'
                value={formData.college}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-gray-300 bg-gray-800 p-3 text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500'
              >
                <option value=''>Select College</option>
                {colleges.map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>

              <select
                name='batchYear'
                value={formData.batchYear}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-gray-300 bg-gray-800 p-3 text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500'
              >
                <option value=''>Select Batch Year</option>
                {batchYears.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>

              <select
                name='semester'
                value={formData.semester}
                onChange={handleChange}
                required
                className='w-full rounded-lg border border-gray-300 bg-gray-800 p-3 text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500'
              >
                <option value=''>Current Semester</option>
                {semesters.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <button
              type='submit'
              className='col-span-full mt-6 rounded-lg bg-gradient-to-r from-blue-900 via-blue-600 to-cyan-400 px-6 py-3 text-white font-bold hover:opacity-90 transition-opacity'
            >
              Continue →
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UserProfileForm
