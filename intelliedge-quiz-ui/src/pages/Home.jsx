import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { GiDna2 } from 'react-icons/gi'
import Footer from '../components/Footer'

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
      {/* Hero Section  */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          <div style={styles.titleWrapper}>
            <span style={styles.brand}>AI</span>-Powered Gateway to Medical Mastery
            <GiDna2 style={styles.dnaIcon} />
          </div>
        </h1>
        <p style={styles.heroSubtitle} className='italic'>
          "Feel the <a className='text-rose-600'>Beat</a> of <a className='text-green-500'>Success</a>"
        </p>
      </section>

      {/* Plans Section  */}
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
              <p style={styles.price} className='text-green-500'>
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
                className='bg-[linear-gradient(90deg,_rgba(2,0,36,1)_0%,_rgba(9,9,121,1)_0%,_rgba(0,212,255,1)_100%)] px-4 rounded hover:opacity-90 transition duration-300 font-medium shadow-lg hover:shadow-xl'
                style={styles.subscribeBtn}
                onClick={() => handlePlanSelect(plan)}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* Stats Section */}
      <section className='container mx-auto px-4 py-16'>
        <div className='bg-gradient-to-br from-cyan-900 via-blue-800 to-sky-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden'>
          <div className='absolute bottom-0 right-0 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl -mr-32 -mb-32'></div>
          <div className='relative z-10'>
            <h2 className='text-3xl font-bold mb-8 text-center'>Advancing Medical Science</h2>
            <div className='grid md:grid-cols-3 gap-8 text-center'>
              <div>
                <div className='text-4xl font-bold mb-2 text-sky-300'>99.49%</div>
                <p className='text-sky-100'>Accuracy Rate</p>
              </div>
              <div>
                <div className='text-4xl font-bold mb-2 text-sky-300'>1M+</div>
                <p className='text-sky-100'>Quizes Completed</p>
              </div>
              <div>
                <div className='text-4xl font-bold mb-2 text-sky-300'>24/7</div>
                <p className='text-sky-100'>Available Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
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
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  dnaIcon: {
    width: '2rem',
    height: '2rem',
    color: '#818cf8',
  },
}

export default Home
