// src/components/UserProfileForm.jsx
import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react'

const states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]
const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', 'Passout']
const batchYears = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i)

const UserProfileForm = ({ onSubmit }) => {
  const { user } = useUser()
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phoneNumbers?.[0]?.phoneNumber || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    state: '',
    college: '',
    batchYear: '',
    semester: '',
  })

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
    // await fetch('http://localhost:8000/save-profile', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userProfileJson)
    // });

    onSubmit(userProfileJson)
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.brandHeading}>Plasma AI</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>📋 Complete Your Profile</h2>

        <div style={styles.row}>
          <input name='firstName' value={formData.firstName} onChange={handleChange} placeholder='First Name' required style={styles.input} />
          <input name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Last Name' required style={styles.input} />
        </div>

        <input name='phone' value={formData.phone} onChange={handleChange} placeholder='Phone' disabled style={styles.input} />
        <input name='email' value={formData.email} onChange={handleChange} placeholder='Email' disabled style={styles.input} />

        <select name='state' value={formData.state} onChange={handleChange} required style={styles.input}>
          <option value=''>Select State</option>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input name='college' value={formData.college} onChange={handleChange} placeholder='College' required style={styles.input} />

        <select name='batchYear' value={formData.batchYear} onChange={handleChange} required style={styles.input}>
          <option value=''>Select Batch Year</option>
          {batchYears.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>

        <select name='semester' value={formData.semester} onChange={handleChange} required style={styles.input}>
          <option value=''>Current Semester</option>
          {semesters.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button type='submit' style={styles.button} className='bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_0%,_rgba(0,212,255,1)_100%)]'>
          Continue →
        </button>
      </form>
    </div>
  )
}

const styles = {
  wrapper: {
    backgroundColor: '#e2e8f0',
    color: '#FFFFFF',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
  },
  brandHeading: {
    fontSize: '2.5rem',
    color: '#00CC99',
    marginBottom: '2rem',
    textAlign: 'center',
    fontWeight: 'bold',
    '@media (max-width: 768px)': {
      fontSize: '2rem',
    },
  },
  form: {
    backgroundColor: '#1A1A1A',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#0ea5e9',
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '1.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1.25rem',
    },
  },
  row: {
    display: 'flex',
    gap: '1rem',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #333',
    backgroundColor: '#262626',
    color: '#FFFFFF',
    flex: 1,
    // font-family: "mono",
    fontSize: '1rem',
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
  },
  button: {
    marginTop: '1rem',
    padding: '0.8rem',
    backgroundColor: '#00CC99',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#00b386',
    },
  },
}

export default UserProfileForm
