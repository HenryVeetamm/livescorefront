import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.less';
import Router from './components/Router/Router';

function App() {
  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  );
}

export default App;
