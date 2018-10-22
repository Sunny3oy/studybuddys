import React, { Component } from 'react';
import './App.css';
import { BrowserRouter,Route,Redirect } from 'react-router-dom';
//import Routes from './Home/Routes';
import * as firebase from 'firebase';
import Dashboard from './Home/Dashboard';
import Home from './Home/Home';
import SignUp from './Home/SignUp';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <BrowserRouter>
          <div className = "App">
            <Route path = "/" exact component = { Home } />
            <Route path = "/signup" exact component = { SignUp } />
            <Route path="/dashboard" exact component = { Dashboard } />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
