import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizHeader from './QuizHeader';
import QuizQuestion from './QuizQuestion';
import QuizSidebar from './QuizSidebar';
import ProgressBar from './ProgressBar';
import Footer from './Footer';
import QuizForm from './QuizForm';
import UserLogin from './UserLogin'; // 🆕 NEW

const QuizApp = () => {
  const [user, setUser] = useState(null); // 🧑 User login
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!quiz.length) return;
    const timer = setInterval(() => {
      setTimeLeft(t => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [quiz]);

  const formatTime = t => {
    const m = String(Math.floor(t / 60)).padStart(2, '0');
    const s = String(t % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStartQuiz = async (form) => {
    try {
      const payload = {
        ...form,
        user_id: user.userId
      };
      const res = await axios.post('http://localhost:8000/generate-quiz', payload);
      setQuiz(res.data);
      setIndex(0);
      setCorrect(0);
      setFeedback('');
      setSelected(null);
      setTimeLeft(form.num_questions * 60);
    } catch (err) {
      alert("❌ Failed to generate quiz. Please check server.");
    }
  };

  const handleSubmit = () => {
    const current = quiz[index];
    if (selected === null) return;
    const isCorrect = current.answer && current.options[selected] === current.answer;
    if (isCorrect) setCorrect(prev => prev + 1);
    setFeedback(`✅ Correct answer: ${current.answer}. ${current.explanation || 'Auto-generated.'}`);
  };

  const next = () => {
    setSelected(null);
    setFeedback('');
    setIndex(i => i + 1);
  };

  const restart = () => {
    setQuiz([]);
    setIndex(0);
    setSelected(null);
    setFeedback('');
    setCorrect(0);
    setTimeLeft(300);
  };

  const performance = {
    answered: index,
    correct,
    incorrect: index - correct,
    unanswered: quiz.length - index
  };

  return (
    <div className="app dark-theme" style={styles.app}>
      <QuizHeader />

      {!user ? (
        <div style={styles.centeredPanel}>
          <h2 style={styles.title}>👤 Identify Yourself</h2>
          <UserLogin onNext={setUser} />
        </div>
      ) : !quiz.length ? (
        <div style={styles.centeredPanel}>
          <h2 style={styles.title}>🧠 Start Your Quiz</h2>
          <QuizForm onStart={handleStartQuiz} />
        </div>
      ) : (
        <div className="quiz-container" style={styles.quizContainer}>
          <div className="main-panel" style={styles.mainPanel}>
            <ProgressBar current={index} total={quiz.length} />

            {quiz[index] && (
              <QuizQuestion
                q={quiz[index]}
                index={index}
                total={quiz.length}
                selected={selected}
                setSelected={setSelected}
                onSubmit={handleSubmit}
                submitted={!!feedback}
              />
            )}

            <div style={styles.navButtons}>
              {feedback && index < quiz.length - 1 && (
                <button onClick={next} style={styles.nextButton}>Next</button>
              )}
              {feedback && index === quiz.length - 1 && (
                <div style={styles.endMessage}>
                  <p style={{ margin: '1rem 0', fontWeight: 'bold' }}>🎉 You've completed the quiz!</p>
                  <button onClick={restart} style={styles.restartButton}>Start New Quiz</button>
                </div>
              )}
            </div>
          </div>

          <QuizSidebar
            progress={index}
            total={quiz.length}
            time={formatTime(timeLeft)}
            stats={performance}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

const styles = {
  app: {
    fontFamily: 'sans-serif',
    backgroundColor: '#121212',
    color: '#e0e0e0',
    minHeight: '100vh'
  },
  centeredPanel: {
    padding: '2rem',
    textAlign: 'center'
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  quizContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2rem'
  },
  mainPanel: {
    flex: 1,
    marginRight: '2rem',
    backgroundColor: '#1e1e1e',
    padding: '2rem',
    borderRadius: '10px'
  },
  navButtons: {
    marginTop: '1.5rem'
  },
  nextButton: {
    padding: '0.6rem 1.4rem',
    backgroundColor: '#ff00ff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  restartButton: {
    padding: '0.6rem 1.4rem',
    backgroundColor: '#00cc99',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  endMessage: {
    textAlign: 'center'
  }
};

export default QuizApp;
