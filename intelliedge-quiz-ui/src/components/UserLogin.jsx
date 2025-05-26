// src/components/UserLogin.jsx
import React, { useState } from 'react';

const UserLogin = ({ onNext }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const generateUserId = (name, phone) => {
    return btoa(`${name}-${phone}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return alert("Please enter name and phone.");
    const userId = generateUserId(name, phone);
    onNext({ name, phone, userId });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <input type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="tel" placeholder="Enter Mobile No." value={phone} onChange={e => setPhone(e.target.value)} required />
      <button type="submit">Start</button>
    </form>
  );
};

export default UserLogin;
