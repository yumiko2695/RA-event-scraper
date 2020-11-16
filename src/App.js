import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Navbar from './Navbar'
import Artists from './Artists'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="app-inside">
          <Artists/>
        {/* <Route exact path="/" component={Artists}/> */}
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
