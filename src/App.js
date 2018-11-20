import React, { Component } from 'react';
import './App.css';
import { BrowserRouter,Route } from 'react-router-dom';
import Dashboard from './Home/Dashboard';
import Home from './Home/Home';
import SignUp from './Home/SignUp';
import Browser from './Home/Browser';
import Profile from './Home/Profile';
import * as firebase from 'firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.setState({
      loggedIn:'false'
    })
   this.authListener = this.authListener.bind(this);
   
 }

 componentDidMount(){
  this.authListener();
  
}

authListener() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ loggedIn:true });
    } 
    else {
      this.setState({ loggedIn: false });
    }
  });
   
}
componentWillUnMount(){
  this.authListener();
  
}


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
