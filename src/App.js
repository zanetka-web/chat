import React from 'react';
import './App.css';
import Store from './components/Store';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <Store>
      <Dashboard />
    </Store>
  );
}

export default App;
