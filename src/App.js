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
    this.state = {
      loggedIn:false,

    }
   
   this.authListener = this.authListener.bind(this);

}
componentDidMount(){
  this.authListener();
}
authListener() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ loggedIn:true });
      console.log('im logged in');
    } 
    else {
      this.setState({ loggedIn: false });
      console.log('im logged not in');
    }
  });
}

  render() {
    return (
      <div >
        <BrowserRouter>
          <div className = "App">
              {
            // SO THAT IT AUTO REDIRECTS WHEN USER IS SIGNED IN FROM BEFORE
            this.state.loggedIn ?
              <Redirect to="/dashboard" /> :  <Redirect to="/" />
              }
            <Route path = "/" exact component = { Home } />
            <Route path = "/signup" exact component = { SignUp } />
            {
              // The below condition prevents the user from manually going to /dashboard.
            }
            <Route path="/dashboard" render={ (props) => { return   this.state.loggedIn ?  <Dashboard {...props} /> : <Home {...props} />; } } />
            


          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
