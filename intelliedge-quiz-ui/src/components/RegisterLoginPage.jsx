import React, { useState } from 'react';

const RegisterLoginPage = ({ onNext }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!firstName || !lastName) {
      setError("Name is required.");
      return false;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate userId (base64 name-phone or UUID later)
    const raw = `${firstName.trim().toLowerCase()}-${lastName.trim().toLowerCase()}-${phone}`;
    const userId = btoa(raw);

    onNext({
      userId,
      firstName,
      lastName,
      phone
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.header}>📋 Register to Start Quiz</h2>

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        style={styles.input}
        required
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        style={styles.input}
        required
      />

      <input
        type="tel"
        placeholder="Mobile Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        style={styles.input}
        required
      />

      {error && <p style={styles.error}>{error}</p>}

      <button type="submit" style={styles.button}>
        ✅ Register and Start Quiz
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '420px',
    margin: '2rem auto',
    background: '#1e1e1e',
    padding: '2rem',
    borderRadius: '10px',
    color: '#e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '1rem'
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #444',
    fontSize: '1rem'
  },
  error: {
    color: '#ff4d4d',
    fontSize: '0.9rem'
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#00cc66',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default RegisterLoginPage;
