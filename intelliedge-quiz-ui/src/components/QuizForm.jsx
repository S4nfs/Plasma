import React, { useState } from 'react'

const examData = {
  'NEET PG': {
    Medicine: ['Cardiology', 'Pulmonology', 'Endocrinology'],
    Surgery: ['GI Surgery', 'Orthopedics', 'Urology'],
    Pediatrics: ['Neonatology', 'Growth Disorders'],
  },
  'NEET UG': {
    Biology: ['Genetics', 'Ecology', 'Human Physiology'],
    Chemistry: ['Organic', 'Inorganic', 'Physical'],
    Physics: ['Kinematics', 'Optics', 'Electrostatics'],
  },
}

const QuizForm = ({ onStart }) => {
  const [form, setForm] = useState({
    exam: 'NEET PG',
    subject: '',
    topic: '',
    difficulty: 'medium',
    num_questions: 5,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'exam' ? { subject: '', topic: '' } : name === 'subject' ? { topic: '' } : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.subject || !form.topic) {
      alert('Please select a subject and topic.')
      return
    }

    setIsLoading(true)
    try {
      await onStart(form)
    } catch (error) {
      console.error('Error generating quiz:', error)
      alert('Failed to generate quiz. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const subjects = Object.keys(examData[form.exam] || {})
  const topics = examData[form.exam]?.[form.subject] || []

  return (
    <form onSubmit={handleSubmit} className='quiz-form' style={styles.form}>
      <label style={styles.label} className='text-zinc-500'>
        Exam
      </label>
      <select name='exam' value={form.exam} onChange={handleChange} style={styles.input}>
        {Object.keys(examData).map((exam) => (
          <option key={exam} value={exam}>
            {exam}
          </option>
        ))}
      </select>

      <label style={styles.label} className='text-zinc-500'>
        Subject
      </label>
      <select name='subject' value={form.subject} onChange={handleChange} style={styles.input}>
        <option value=''>Select Subject</option>
        {subjects.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      <label style={styles.label} className='text-zinc-500'>
        Topic
      </label>
      <select name='topic' value={form.topic} onChange={handleChange} style={styles.input}>
        <option value=''>Select Topic</option>
        {topics.map((top) => (
          <option key={top} value={top}>
            {top}
          </option>
        ))}
      </select>

      <label style={styles.label} className='text-zinc-500'>
        Difficulty
      </label>
      <select name='difficulty' value={form.difficulty} onChange={handleChange} style={styles.input}>
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </select>

      <label style={styles.label} className='text-zinc-500'>
        Number of Questions
      </label>
      <input type='number' name='num_questions' min='1' max='20' value={form.num_questions} onChange={handleChange} style={styles.input} />

      <button
        type='submit'
        style={styles.button}
        disabled={isLoading}
        className='bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_0%,_rgba(0,212,255,1)_100%)] px-4 rounded shadow-md hover:opacity-90 transition duration-300 disabled:opacity-50'
      >
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <div className='w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2'></div>
            Generating...
          </div>
        ) : (
          'Generate Quiz'
        )}
      </button>
    </form>
  )
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '450px',
    margin: '0 auto',
    padding: '2rem',
    borderRadius: '12px',
    background: '#e2e8f0',
    color: '#e0e0e0',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #444',
    background: '#121212',
    color: '#fff',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#d97706',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}

export default QuizForm
