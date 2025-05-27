// src/components/SubjectSelection.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const subjects = [
  'Anatomy',
  'Physiology',
  'Biochemistry',
  'Pathology',
  'Pharmacology',
  'Microbiology',
  'Forensic Medicine',
  'ENT',
  'Ophthalmology',
  'PSM',
  'Medicine',
  'Surgery',
  'Obstetrics & Gynaecology',
  'Pediatrics',
  'Orthopedics',
]

const MAX_TESTS = 20

const SubjectSelection = ({ selectedPlan, onSelectionDone }) => {
  const [subjectCounts, setSubjectCounts] = useState(() => subjects.reduce((acc, sub) => ({ ...acc, [sub]: 0 }), {}))
  const [totalSelected, setTotalSelected] = useState(0)
  const navigate = useNavigate()

  const handleClick = (subject) => {
    const currentCount = subjectCounts[subject]

    // Prevent adding beyond MAX_TESTS
    if (totalSelected >= MAX_TESTS && currentCount === 0) return

    const newCount = currentCount + 1
    const updatedCounts = { ...subjectCounts, [subject]: newCount }
    const newTotal = Object.values(updatedCounts).reduce((a, b) => a + b, 0)

    setSubjectCounts(updatedCounts)
    setTotalSelected(newTotal)
  }

  const handleReset = () => {
    setSubjectCounts(subjects.reduce((acc, sub) => ({ ...acc, [sub]: 0 }), {}))
    setTotalSelected(0)
  }

  const handleSubmit = () => {
    const selection = Object.fromEntries(Object.entries(subjectCounts).filter(([_, count]) => count > 0))

    console.log('📘 Final Selections:', selection)

    if (onSelectionDone) {
      onSelectionDone(selection)
    }

    navigate('/dashboard')
  }

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading} className=''>
        📚 Choose Subjects & Number of Tests
      </h2>
      <p style={styles.subheading}>Click on subjects to add tests (Max {MAX_TESTS})</p>

      <div style={styles.grid}>
        {subjects.map((subject) => {
          const count = subjectCounts[subject]
          const isDisabled = totalSelected >= MAX_TESTS && count === 0

          return (
            <button
              key={subject}
              style={{
                ...styles.subject,
                backgroundColor: count > 0 ? '#0ea5e9' : '#222',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.4 : 1,
              }}
              onClick={() => handleClick(subject)}
              disabled={isDisabled}
              title={isDisabled ? 'Limit reached' : 'Click to add test'}
            >
              {subject} ({count})
            </button>
          )
        })}
      </div>

      <div style={styles.footer}>
        <p style={styles.counter} className='text-slate-500'>
          Total selected: {totalSelected} / {MAX_TESTS}
        </p>

        {totalSelected > MAX_TESTS && <p style={styles.warning}>⚠️ Limit exceeded. Please reduce below {MAX_TESTS}.</p>}

        <div style={styles.buttonRow}>
          <button
            style={{
              ...styles.actionBtn,
              backgroundColor: totalSelected > MAX_TESTS ? '#666' : '#00CC99',
              cursor: totalSelected > MAX_TESTS ? 'not-allowed' : 'pointer',
            }}
            disabled={totalSelected > MAX_TESTS}
            onClick={handleSubmit}
            className='bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_0%,_rgba(0,212,255,1)_100%)] px-4 rounded shadow-md hover:opacity-90 transition duration-300'
          >
            Continue →
          </button>

          <button
            onClick={handleReset}
            style={{ ...styles.actionBtn }}
            className='text-slate-5 00 bg-[linear-gradient(135deg,_#f5f7fa_0%,_#c3cfe2_100%)] font-semibold py-2 px-4 rounded shadow-md hover:opacity-90 transition duration-300'
          >
            🔄 Reset Selection
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    backgroundColor: '#e2e8f0',
    color: '#FFFFFF',
    minHeight: '100vh',
    padding: '3rem 1rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: '#B794F4',
    marginBottom: '0.5rem',
  },
  subheading: {
    color: '#aaa',
    marginBottom: '2rem',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  subject: {
    padding: '0.75rem 1.2rem',
    borderRadius: '30px',
    border: '1px solid #333',
    backgroundColor: '#222',
    color: '#FFF',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    userSelect: 'none',
    fontSize: '0.95rem',
  },
  counter: {
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  warning: {
    color: 'tomato',
    marginBottom: '1rem',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  actionBtn: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '1rem',
    transition: 'background 0.3s ease',
    cursor: 'pointer',
  },
}

export default SubjectSelection
