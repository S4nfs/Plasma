import React from 'react';

const ProgressBar = ({ current, total }) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="progress-bar-container" style={styles.container}>
      <div style={{ ...styles.filled, width: `${percentage}%` }} />
    </div>
  );
};

const styles = {
  container: {
    height: '12px',
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    marginBottom: '20px',
    overflow: 'hidden',
  },
  filled: {
    height: '100%',
    backgroundColor: '#ff00ff', // magenta (from UI)
    transition: 'width 0.4s ease-in-out',
  }
};

export default ProgressBar;
