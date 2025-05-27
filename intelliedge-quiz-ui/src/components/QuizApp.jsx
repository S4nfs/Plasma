import React, { useState, useEffect } from 'react'
import axios from 'axios'
import QuizQuestion from './QuizQuestion'
import QuizSidebar from './QuizSidebar'
import ProgressBar from './ProgressBar'
import Footer from './Footer'
import QuizForm from './QuizForm'
import UserLogin from './UserLogin' // 🆕 NEW
import Header from './Header'

const QuizApp = () => {
  const [user, setUser] = useState(null)
  const [quiz, setQuiz] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [correct, setCorrect] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [showTimeUpModal, setShowTimeUpModal] = useState(false)

  useEffect(() => {
    if (!quiz.length) return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setShowTimeUpModal(true)
          clearInterval(timer)
          return 0
        }
        return Math.max(t - 1, 0)
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [quiz])

  const formatTime = (t) => {
    const m = String(Math.floor(t / 60)).padStart(2, '0')
    const s = String(t % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  const handleStartQuiz = async (form) => {
    try {
      const payload = {
        ...form,
        user_id: user.userId,
      }
      const res = await axios.post('http://localhost:8000/generate-quiz', payload)
      setQuiz(res.data)
      setIndex(0)
      setCorrect(0)
      setFeedback('')
      setSelected(null)
      setTimeLeft(form.num_questions * 60)
    } catch (err) {
      alert('❌ Failed to generate quiz. Please check server.')
    }
  }

  const handleSubmit = () => {
    const current = quiz[index]
    if (selected === null) return
    const isCorrect = current.answer && current.options[selected] === current.answer
    if (isCorrect) setCorrect((prev) => prev + 1)
    setFeedback(`✅ Correct answer: ${current.answer}. ${current.explanation || 'Auto-generated.'}`)
  }

  const next = () => {
    setSelected(null)
    setFeedback('')
    setIndex((i) => i + 1)
  }

  const restart = () => {
    setQuiz([])
    setIndex(0)
    setSelected(null)
    setFeedback('')
    setCorrect(0)
    setTimeLeft(300)
  }

  const performance = {
    answered: index,
    correct,
    incorrect: index - correct,
    unanswered: quiz.length - index,
  }

  const TimeUpModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2 style={styles.modalTitle}>⏰ Time's Up!</h2>
        <p>Your quiz session has ended.</p>
        <button
          onClick={restart}
          style={styles.restartButton}
          className='bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_0%,_rgba(0,212,255,1)_100%)] px-4 rounded shadow-md hover:opacity-90 transition duration-300'
        >
          Start New Quiz
        </button>
      </div>
    </div>
  )

  return (
    <div className='app dark-theme' style={styles.app}>
      <Header />

      {!user ? (
        <div style={styles.centeredPanel}>
          <h2 style={styles.title} className='text-slate-700'>
            👤 Identify Yourself
          </h2>
          <UserLogin onNext={setUser} />
        </div>
      ) : !quiz.length ? (
        <div style={styles.centeredPanel}>
          <h2 style={styles.title} className='text-slate-400 font-semibold'>
            🧠 Start Your Quiz
          </h2>
          <QuizForm onStart={handleStartQuiz} />
        </div>
      ) : (
        <div className='quiz-container' style={styles.quizContainer}>
          <div className='main-panel' style={styles.mainPanel}>
            <ProgressBar current={index} total={quiz.length} />

            {quiz[index] && (
              <QuizQuestion q={quiz[index]} index={index} total={quiz.length} selected={selected} setSelected={setSelected} onSubmit={handleSubmit} submitted={!!feedback} />
            )}

            <div style={styles.navButtons}>
              {feedback && index < quiz.length - 1 && (
                <button
                  onClick={next}
                  style={styles.nextButton}
                  className='bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_0%,_rgba(0,212,255,1)_100%)] px-4 rounded shadow-md hover:opacity-90 transition duration-300'
                >
                  Next
                </button>
              )}
              {feedback && index === quiz.length - 1 && (
                <div style={styles.endMessage}>
                  <p style={{ margin: '1rem 0', fontWeight: 'bold' }}>🎉 You've completed the quiz!</p>
                  <button
                    onClick={restart}
                    style={styles.restartButton}
                    className='bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_0%,_rgba(0,212,255,1)_100%)] px-4 rounded shadow-md hover:opacity-90 transition duration-300'
                  >
                    Start New Quiz
                  </button>
                </div>
              )}
            </div>
          </div>

          <QuizSidebar progress={index} total={quiz.length} time={formatTime(timeLeft)} stats={performance} timeColor={timeLeft <= 10 ? '#ff4444' : '#00cc88'} />
        </div>
      )}

      {showTimeUpModal && <TimeUpModal />}

      <Footer />
    </div>
  )
}

const styles = {
  app: {
    fontFamily: 'sans-serif',
    backgroundColor: '#e2e8f0',
    color: '#e0e0e0',
    minHeight: '100vh',
    width: '100%',
    maxWidth: '100vw',
    overflow: 'hidden',
  },
  centeredPanel: {
    padding: '1rem',
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
    marginBottom: '1rem',
  },
  quizContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1rem',
    gap: '1rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  mainPanel: {
    flex: '1 1 auto',
    backgroundColor: '#e2e8f6',
    padding: '1.5rem',
    borderRadius: '10px',
    maxWidth: '100%',
    '@media (max-width: 768px)': {
      marginRight: 0,
      marginBottom: '1rem',
    },
  },
  navButtons: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  nextButton: {
    padding: '0.6rem 1.4rem',
    backgroundColor: '#d97706',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: 'fit-content',
    '@media (max-width: 480px)': {
      width: '100%',
    },
  },
  restartButton: {
    padding: '0.6rem 1.4rem',
    backgroundColor: '#00cc99',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: 'fit-content',
    '@media (max-width: 480px)': {
      width: '100%',
    },
  },
  endMessage: {
    textAlign: 'center',
    width: '100%',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
  },
  modalTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
}

export default QuizApp
