import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Home/Routes';

class App extends Component {
  render() {
    return (
      <div >
        <BrowserRouter>
          <div className = "App">
            <Routes/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
