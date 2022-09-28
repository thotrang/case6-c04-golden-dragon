import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
=======
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
>>>>>>> 7209790459bb77c9c695accccdd409d3e71b9f2c

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <DarkModeContextProvider>
    <App />
    </DarkModeContextProvider>
=======
    <App />
>>>>>>> 7209790459bb77c9c695accccdd409d3e71b9f2c
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
<<<<<<< HEAD
// reportWebVitals();
=======
reportWebVitals();
>>>>>>> 7209790459bb77c9c695accccdd409d3e71b9f2c
