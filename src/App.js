import React, { Component } from 'react';
import './App.css';
import { BrowserRouter,Route } from 'react-router-dom';
import Dashboard from './Home/Dashboard';
import Home from './Home/Home';
import SignUp from './Home/SignUp';
import Browser from './Home/Browser';
import Profile from './Home/Profile';


class App extends Component {

  render() {
    return (
      <div >
        <BrowserRouter>
          <div className = "App">
            <Route path = "/" exact component = { Home } />
            <Route path = "/signup" exact component = { SignUp } />
            <Route path="/dashboard" exact component = { Dashboard } />
            <Route path="/dashboard/browse" exact component = { Browser } />
            <Route path="/Profile" exact component = { Profile } />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
