// src/pages/Home.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
//Orginal 500 (discounted 299) , 750(discounted 499) , 1500(discounted 799).
const plans = [
  {
    title: 'Starter',
    price: '299',
    originalPrice: '500',
    features: ['10 tests per month', 'Detailed explanations', 'Review access'],
    value: 'starter',
    highlight: false,
  },
  {
    title: 'Pro',
    price: '499',
    originalPrice: '750',
    features: ['20 tests per month', 'Explanations + Review', 'Coach Support'],
    value: 'pro',
    highlight: true,
  },
  {
    title: 'Elite',
    price: '799',
    originalPrice: '1500',
    features: ['30 tests per month', 'Review & AI Coach', 'Live support access'],
    value: 'elite',
    highlight: false,
  },
]

const Home = () => {
  const navigate = useNavigate()

  const handlePlanSelect = (plan) => {
    // Save selected plan to localStorage
    localStorage.setItem('selectedPlan', plan.value)
    navigate('/sign-in')
  }

  return (
    <div style={styles.container}>
      <Header showSignIn={true} />

      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Unlock your potential with <span style={styles.brand}>Plasma AI</span>
        </h1>
        <p style={styles.heroSubtitle}>Your personalized AI learning assistant for NEET PG excellence.</p>
      </section>

      <section style={styles.plansSection}>
        <h2 className='text-slate-500' style={styles.sectionTitle}>
          Choose your plan
        </h2>
        <div style={styles.planDeck}>
          {plans.map((plan) => (
            <div
              key={plan.title}
              className='plan-card'
              style={{
                ...styles.planCard,
                border: plan.highlight ? '2px solid #00CC99' : '1px solid #333',
                backgroundColor: plan.highlight ? '#1F1F1F' : '#121212',
              }}
            >
              <h3>{plan.title}</h3>
              <p style={styles.price}>
                <span style={styles.originalPrice}>{plan.originalPrice}</span>
                {plan.price}
                <span style={styles.perMonth}> /month</span>
              </p>
              <ul style={{ padding: '0 1rem' }}>
                {plan.features.map((feat, i) => (
                  <li key={i} style={styles.feature}>
                    ✓ {feat}
                  </li>
                ))}
              </ul>
              <button
                className='bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_0%,_rgba(0,212,255,1)_100%)] px-4 rounded shadow-md hover:opacity-90 transition duration-300'
                style={styles.subscribeBtn}
                onClick={() => handlePlanSelect(plan)}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: '#e2e8f0',
    color: '#FFFFFF',
    fontFamily: 'sans-serif',
    minHeight: '100vh',
  },
  hero: {
    padding: '4rem 2rem',
    textAlign: 'center',
    backgroundColor: '#111',
    borderBottom: '1px solid #222',
  },
  heroTitle: {
    fontSize: '2.8rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  brand: {
    color: '#0ea5e9',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#bbb',
    marginBottom: '2rem',
  },
  plansSection: {
    padding: '3rem 1rem',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  planDeck: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  planCard: {
    width: '280px',
    padding: '1.5rem',
    borderRadius: '10px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  price: {
    fontSize: '2rem',
    margin: '1rem 0',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  originalPrice: {
    fontSize: '1.2rem',
    color: '#888',
    textDecoration: 'line-through',
    position: 'relative',
    fontWeight: 'normal',
  },
  perMonth: {
    fontSize: '0.9rem',
    color: '#aaa',
  },
  feature: {
    fontSize: '0.95rem',
    padding: '0.25rem 0',
    color: '#ccc',
  },
  subscribeBtn: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: '#00CC99',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
}

export default Home
