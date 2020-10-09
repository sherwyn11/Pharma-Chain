import React from 'react';
import Header from './components/header/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Cards from './components/cards/Cards';
import Routes from '../src/components/supplier/Routes';

import { BrowserRouter as Router } from 'react-router-dom';
import {Route }from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header/>
        <div></div>
        <Cards/> */}
        <Routes/>
       </div>
       
      </Router>
  );
}

export default App;
