import React, { Component } from 'react';
import './App.css';
import { BrowserRouter,Route,Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dashboard from './Home/Dashboard';
import Home from './Home/Home';
import SignUp from './Home/SignUp';
import Browser from './Home/Browser';
// import Profile from './Home/Profile';
import * as firebase from 'firebase';
import CoursePage from './Home/CoursePage';
import Question from './Home/Question';
import Navbar from './Home/Navbar';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      name: "",
    }
   this.authListener = this.authListener.bind(this);
  //  this.checkLoggedIn = this.checkLoggedIn.bind(this);
   this.logout = this.logout.bind(this);
   this.getUserName = this.getUserName.bind(this);
 }

  componentDidMount(){
    this.authListener();
    this.getUserName();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn:true });
      }
    });
  }

  // checkLoggedIn(){
  //   var prop = this;
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (!user) {
  //       prop.setState({loggedIn: false});
  //     }
  //   });
  //   if(this.state.loggedIn === true) {
  //     this.getUserName();
  //   }
  // }

  getUserName(e){
      var page = this;
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            var info = {
               id: user.uid
            }
            axios.post('https://studybuddys-223920.appspot.com/api/getUsername', info)
            .then(response => {
               page.setState({name : response.data.name})
            })
         }
      });
   }

  logout(e){
    e.preventDefault();
    firebase.auth().signOut();
    this.setState({loggedIn: false});
  }

  componentWillUnMount(){
    this.authListener();
  }


  render() {    

    var routes; 

    if(this.state.loggedIn) {
      routes = (
        <BrowserRouter>
          <div className = "App">
            <div className = "nav">
              <Navbar/>
              
              <div className = "nav_b" >
                  <span>{this.state.name}</span>
                  <Button onClick={this.logout} style={{color:'white'}}>Logout</Button>
              </div>
            </div>
            <Route path= "/dashboard" exact component = { Dashboard } />
            <Route path= "/dashboard/browse" exact component = { Browser } />
            <Route path= "/courses/:courseName" exact component = { CoursePage } />
            <Route path= "/course/:courseName?/:questionID?" exact component = { Question } />
          </div>
        </BrowserRouter>
      )
    } else {
      routes = (
        <BrowserRouter>
            <div className = "App">
              <Route path = "/" exact component = { Home } />
              <Redirect to = "/"/>
              <Route path = "/signup" exact component = { SignUp } />
            </div>
        </BrowserRouter>
      )
    }

    return (
      <div >
        {routes}
      </div>
    );
  }
}

export default App;
