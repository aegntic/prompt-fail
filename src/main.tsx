debugger;

console.log('main.tsx is executing');

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Mount the React app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);