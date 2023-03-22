import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.less';
import Router from './containers/Router/Router';

function App() {
  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  );
}

export default App;
