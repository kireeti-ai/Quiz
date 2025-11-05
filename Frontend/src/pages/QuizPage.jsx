import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuizQuestions, submitQuizResult } from '../services/api';
import { BookOpen, Check, X } from 'lucide-react';

export default function QuizPage() {
  const { id } = useParams(); // Get quiz ID from the URL
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({}); // Store answers as { questionId: "selected_option" }
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null); // Store the final score
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch quiz questions when the component mounts
    fetchQuizQuestions(id)
      .then(response => {
        setQuestions(response.data); // These are QuestionWrappers
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch quiz questions:', error);
        alert('Failed to load quiz. Returning to home.');
        navigate('/');
      });
  }, [id, navigate]);

  const handleOptionSelect = (questionId, option) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit your answers?')) {
      // Format the responses to match the backend's List<Response>
      const formattedResponses = Object.keys(responses).map(questionId => ({
        id: parseInt(questionId),
        response: responses[questionId],
      }));

      submitQuizResult(id, formattedResponses)
        .then(response => {
          setResult(response.data); // response.data is the integer score
        })
        .catch(error => {
          console.error('Failed to submit quiz:', error);
          alert('There was an error submitting your quiz.');
        });
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-amber-50 flex items-center justify-center"><p className="text-xl font-bold">Loading Quiz...</p></div>;
  }
  
  // Display the result screen
  if (result !== null) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 border-4 border-stone-800 max-w-lg w-full text-center" style={{ transform: 'rotate(-1deg)' }}>
          <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
          <div className="bg-blue-100 p-6 border-2 border-stone-800 mb-6">
            <p className="text-lg text-stone-700">Your score</p>
            <p className="text-7xl font-bold my-2">{result} <span className="text-5xl text-stone-500">/ {questions.length}</span></p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full px-4 py-3 bg-stone-800 text-white border-2 border-stone-800 font-medium hover:bg-stone-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Display the quiz questions
  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = responses[currentQuestion?.id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 md:p-8 border-4 border-stone-800 max-w-2xl w-full relative" style={{ transform: 'rotate(0.5deg)' }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-stone-200">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-300 p-2 border-2 border-stone-800">
              <BookOpen className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <h1 className="text-xl md:text-2xl font-bold">Quiz in Progress</h1>
          </div>
          <div className="text-lg font-bold px-3 py-1 bg-stone-100 border-2 border-stone-800">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>

        {/* Question */}
        {currentQuestion && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6 min-h-[60px]">
              {currentQuestion.questionTitle}
            </h2>
            
            {/* Options */}
            <div className="space-y-3">
              {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(currentQuestion.id, option)}
                  className={`w-full text-left p-4 border-2 border-stone-800 font-medium text-lg transition-colors
                    ${selectedOption === option 
                      ? 'bg-stone-800 text-white' 
                      : 'bg-white hover:bg-stone-100'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t-2 border-stone-200">
          <button
            onClick={handlePrev}
            disabled={isFirstQuestion}
            className="px-6 py-2 bg-white border-2 border-stone-800 font-medium hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 text-white border-2 border-stone-800 font-medium hover:bg-green-600 flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-stone-800 text-white border-2 border-stone-800 font-medium hover:bg-stone-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}