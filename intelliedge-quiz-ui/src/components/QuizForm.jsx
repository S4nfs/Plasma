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

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'exam' ? { subject: '', topic: '' } : name === 'subject' ? { topic: '' } : {}),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.subject || !form.topic) {
      alert('Please select a subject and topic.')
      return
    }
    onStart(form)
  }

  const subjects = Object.keys(examData[form.exam] || {})
  const topics = examData[form.exam]?.[form.subject] || []

  return (
    <form onSubmit={handleSubmit} className='quiz-form' style={styles.form}>
      <label style={styles.label}>Exam</label>
      <select name='exam' value={form.exam} onChange={handleChange} style={styles.input}>
        {Object.keys(examData).map((exam) => (
          <option key={exam} value={exam}>
            {exam}
          </option>
        ))}
      </select>

      <label style={styles.label}>Subject</label>
      <select name='subject' value={form.subject} onChange={handleChange} style={styles.input}>
        <option value=''>Select Subject</option>
        {subjects.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      <label style={styles.label}>Topic</label>
      <select name='topic' value={form.topic} onChange={handleChange} style={styles.input}>
        <option value=''>Select Topic</option>
        {topics.map((top) => (
          <option key={top} value={top}>
            {top}
          </option>
        ))}
      </select>

      <label style={styles.label}>Difficulty</label>
      <select name='difficulty' value={form.difficulty} onChange={handleChange} style={styles.input}>
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </select>

      <label style={styles.label}>Number of Questions</label>
      <input type='number' name='num_questions' min='1' max='20' value={form.num_questions} onChange={handleChange} style={styles.input} />

      <button type='submit' style={styles.button}>
        Generate Quiz
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
    background: '#1f1f1f',
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
