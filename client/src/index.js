import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
<<<<<<< HEAD
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
=======
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
>>>>>>> 7209790459bb77c9c695accccdd409d3e71b9f2c
=======
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
>>>>>>> 6e992757d399b95e35ac1860c7382cc7d4e3abd3

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
<<<<<<< HEAD
    <DarkModeContextProvider>
    <App />
    </DarkModeContextProvider>
=======
    <App />
>>>>>>> 7209790459bb77c9c695accccdd409d3e71b9f2c
=======
    <DarkModeContextProvider>
    <App />
    </DarkModeContextProvider>
>>>>>>> 6e992757d399b95e35ac1860c7382cc7d4e3abd3
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
<<<<<<< HEAD
<<<<<<< HEAD
// reportWebVitals();
=======
reportWebVitals();
>>>>>>> 7209790459bb77c9c695accccdd409d3e71b9f2c
=======
// reportWebVitals();
>>>>>>> 6e992757d399b95e35ac1860c7382cc7d4e3abd3
