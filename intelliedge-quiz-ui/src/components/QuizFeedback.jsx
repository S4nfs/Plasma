import React from 'react';

const QuizFeedback = ({ text }) => {
  if (!text) return null;

  return (
    <div className="quiz-feedback" style={styles.container}>
      <p style={styles.title}>💡 Explanation</p>
      <p style={styles.body}>{text}</p>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    color: '#e0e0e0',
    lineHeight: '1.5'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    fontSize: '1rem'
  },
  body: {
    fontSize: '0.95rem'
  }
};

export default QuizFeedback;
