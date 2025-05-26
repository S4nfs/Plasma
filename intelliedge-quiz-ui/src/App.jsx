// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  RedirectToSignIn
} from '@clerk/clerk-react';

import Home from './pages/Home';
import UserProfileForm from './components/UserProfileForm';
import SubjectSelection from './components/SubjectSelection';
import QuizApp from './components/QuizApp';
import Dashboard from './components/Dashboard';

function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState(null);
  const navigate = useNavigate();

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    navigate('/sign-in');
  };

  const handleProfileSubmit = (data) => {
    setUserProfile(data);
    navigate('/subject-selection');
  };

  const handleSubjectSelection = (subjects) => {
    setSelectedSubjects(subjects);
    navigate('/dashboard');
  };

  return (
    <Routes>
      {/* 🔐 Auth Routes */}
      <Route path="/sign-in/*" element={<SignIn redirectUrl="/user-profile" />} />
      <Route path="/sign-up/*" element={<SignUp redirectUrl="/user-profile" />} />

      {/* 🏠 Home */}
      <Route path="/" element={<Home onSelectPlan={handlePlanSelect} />} />

      {/* 👤 Profile Form */}
      <Route
        path="/user-profile"
        element={
          <SignedIn>
            <UserProfileForm onSubmit={handleProfileSubmit} />
          </SignedIn>
        }
      />

      {/* 📚 Subject Selection */}
      <Route
        path="/subject-selection"
        element={
          <SignedIn>
            <SubjectSelection selectedPlan={selectedPlan} onSelectionDone={handleSubjectSelection} />
          </SignedIn>
        }
      />

      {/* 📊 Dashboard */}
      <Route
        path="/dashboard"
        element={
          <SignedIn>
            <Dashboard
              userProfile={userProfile}
              selectedPlan={selectedPlan}
              selectedSubjects={selectedSubjects}
            />
          </SignedIn>
        }
      />

      {/* 🧠 Quiz */}
      <Route
        path="/quiz"
        element={
          <SignedIn>
            <QuizApp
              profile={userProfile}
              plan={selectedPlan}
              subjects={selectedSubjects}
            />
          </SignedIn>
        }
      />
    </Routes>
  );
}

export default App;
