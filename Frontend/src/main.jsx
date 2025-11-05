import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // <-- Make sure you import App
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* <-- And render App here */}
  </React.StrictMode>
);