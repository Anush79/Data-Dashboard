import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './context/UserContext';
import { useUser } from './context/UserContext';
import { useData } from './context/DataContext';
import  DataProvider from './context/DataContext'
export { useUser , useData}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <DataProvider>
          <App />
        </DataProvider >
      </UserProvider>

    </Router>

  </React.StrictMode>
);


