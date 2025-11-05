import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizMainPage from './pages/QuizMainPage';
import QuizPage from './pages/QuizPage';

export default function App() {
  return (
    // This BrowserRouter provides the "context" that useNavigate needs
    <BrowserRouter> 
      <Routes>
        {/* QuizMainPage is rendered here, INSIDE the router */}
        <Route path="/" element={<QuizMainPage />} /> 
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}