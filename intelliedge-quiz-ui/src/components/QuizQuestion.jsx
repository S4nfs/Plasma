import React from 'react';

const QuizQuestion = ({ q, index, total, selected, setSelected, onSubmit, submitted }) => {
  const correctKey = q.answer;
  const correctOptionIndex = q.options.findIndex(opt => opt === correctKey);
  const isCorrect = selected !== null && q.options[selected] === q.answer;

  return (
    <div className="quiz-question" style={styles.container}>
      <h2 style={styles.heading}>Question {index + 1} of {total}</h2>
      <p style={styles.questionText}>{q.question}</p>

      <div style={styles.optionsContainer}>
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isTheCorrectOne = i === correctOptionIndex;
          let optionStyle = { ...styles.option };

          if (submitted) {
            if (isSelected && isTheCorrectOne) {
              optionStyle = { ...optionStyle, ...styles.correctOption };
            } else if (isSelected && !isTheCorrectOne) {
              optionStyle = { ...optionStyle, ...styles.incorrectOption };
            }
          }

          return (
            <label key={i} style={optionStyle}>
              <input
                type="radio"
                name={`question-${index}`}
                value={i}
                checked={isSelected}
                onChange={() => setSelected(i)}
                disabled={submitted}
              />
              <span style={{ marginLeft: '0.5rem' }}>
                {String.fromCharCode(65 + i)}) {opt}
              </span>
            </label>
          );
        })}
      </div>

      {!submitted && (
        <button onClick={onSubmit} style={styles.submitButton}>
          Submit
        </button>
      )}

      {submitted && (
        <div>
          <div style={isCorrect ? styles.correctBox : styles.incorrectBox}>
            <p style={{ margin: 0 }}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect.'} The correct answer is: {q.answer}
            </p>
          </div>

          <div style={styles.explanationBox}>
            <p style={styles.explanationHeader}>💡 Explanation</p>
            <p>{q.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem 0'
  },
  heading: {
    marginBottom: '0.5rem',
    color: '#ffffff'
  },
  questionText: {
    marginBottom: '1rem',
    fontSize: '1.1rem',
    color: '#e0e0e0'
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginBottom: '1rem'
  },
  option: {
    color: '#e0e0e0',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center'
  },
  correctOption: {
    backgroundColor: '#1e3d1e',
    padding: '0.4rem',
    borderRadius: '4px'
  },
  incorrectOption: {
    backgroundColor: '#3d1e1e',
    padding: '0.4rem',
    borderRadius: '4px'
  },
  submitButton: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#ff00ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    alignSelf: 'start'
  },
  correctBox: {
    backgroundColor: '#004d00',
    padding: '0.75rem',
    marginTop: '1rem',
    borderRadius: '6px',
    color: '#d0ffd0'
  },
  incorrectBox: {
    backgroundColor: '#4d0000',
    padding: '0.75rem',
    marginTop: '1rem',
    borderRadius: '6px',
    color: '#ffd0d0'
  },
  explanationBox: {
    backgroundColor: '#2a2a2a',
    padding: '1rem',
    marginTop: '1rem',
    borderRadius: '6px',
    color: '#e0e0e0'
  },
  explanationHeader: {
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  }
};

export default QuizQuestion;
