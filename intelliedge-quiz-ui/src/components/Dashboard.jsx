// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, selectedPlan, selectedSubjects } = location.state || {};

  const fullName = userProfile?.firstName + ' ' + userProfile?.lastName;

  const quizCount = Object.values(selectedSubjects || {}).reduce((a, b) => a + b, 0);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>🧠 IntelliEdge</h2>
        <nav style={styles.nav}>
          <a href="#" style={styles.navItem}>🏠 Home</a>
          <a href="#" style={styles.navItem}>📘 Learn</a>
          <a href="#" style={styles.navItem}>🧪 Practice</a>
          <a href="#" style={styles.navItem}>📊 Assessments</a>
          <a href="#" style={styles.navItem}>👥 Community</a>
        </nav>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        <h1 style={styles.greeting}>Welcome back, {fullName || 'Student'}</h1>

        <section>
          <h2>Your Progress</h2>
          <p>Overall Progress</p>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBar} />
            <span style={styles.progressText}>75% Complete</span>
          </div>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Upcoming Quizzes</h2>
          <ul style={styles.quizList}>
            <li style={styles.quizItem}>🧬 NEET Quiz ({quizCount} tests)</li>
            <li style={styles.quizItem}>📚 {selectedPlan?.title || 'Plan'} Tier</li>
          </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Personalized Recommendations</h2>
          <div style={styles.cards}>
            <div style={styles.card}>
              <h4>🧠 Anatomy & Physiology</h4>
              <p>Revise core concepts before your next test.</p>
            </div>
            <div style={styles.card}>
              <h4>🔬 Pathology Booster</h4>
              <p>Targeted practice from your plan preferences.</p>
            </div>
            <div style={styles.card}>
              <h4>📈 Performance Tips</h4>
              <p>AI-generated suggestions based on your focus areas.</p>
            </div>
          </div>
        </section>

        <button
          style={styles.cta}
          onClick={() => navigate("/quiz", {
            state: {
              userProfile,
              selectedPlan,
              selectedSubjects
            }
          })}
        >
          🚀 Start Quiz →
        </button>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    backgroundColor: '#0F0F0F',
    color: '#FFF'
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#181818',
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  logo: {
    color: '#B794F4',
    fontWeight: 'bold',
    fontSize: '1.5rem'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  navItem: {
    color: '#CCC',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.2s ease',
    cursor: 'pointer'
  },
  main: {
    flex: 1,
    padding: '2rem 3rem'
  },
  greeting: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem'
  },
  progressBarContainer: {
    backgroundColor: '#333',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    height: '10px',
    width: '300px',
    marginTop: '0.5rem'
  },
  progressBar: {
    width: '75%',
    height: '100%',
    backgroundColor: '#7B61FF'
  },
  progressText: {
    marginTop: '0.25rem',
    color: '#aaa',
    fontSize: '0.9rem'
  },
  quizList: {
    listStyle: 'none',
    padding: 0,
    marginTop: '0.5rem'
  },
  quizItem: {
    padding: '0.5rem 0',
    fontSize: '1rem'
  },
  cards: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  card: {
    backgroundColor: '#1A1A1A',
    padding: '1rem',
    borderRadius: '10px',
    width: '220px'
  },
  cta: {
    marginTop: '2rem',
    padding: '0.8rem 1.6rem',
    backgroundColor: '#00CC99',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default Dashboard;
