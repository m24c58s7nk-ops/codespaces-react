import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthGate from './AuthGate';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthGate />
  </React.StrictMode>
);

reportWebVitals();
