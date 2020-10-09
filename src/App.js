import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Navbar from './Navbar'
import Artists from './Artists'
import MoreInfo from './MoreInfo'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="app-inside">
        <Route path="/moreinfo/:artist"  component={MoreInfo} />
        <Route exact path="/" component={Artists}/>
        </div>
        <div className="footer">
        <Link to="/contact" className="contact">Contact</Link>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
