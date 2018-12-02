import React, { Component } from 'react';
import './App.css';
import { BrowserRouter,Route,Redirect,Link,Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dashboard from './Home/Dashboard';
import Home from './Home/Home';
import SignUp from './Home/SignUp';
import Browser from './Home/Browser';
import Profile from './Home/Profile';
import * as firebase from 'firebase';
import CoursePage from './Home/CoursePage';
import Question from './Home/Question';
import Navbar from './Home/Navbar';
import axios from 'axios';
import "./Home/Dashboard.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      name: "",
    }
   this.authListener = this.authListener.bind(this);
   this.logout = this.logout.bind(this);
   this.getUserName = this.getUserName.bind(this);
 }

  componentDidMount(){
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn:true });
        this.getUserName()
      }
    });
  }

  getUserName(e){
    console.log("bloop")
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

    var routes = (
      <BrowserRouter>
        <div className = "App">
          <Switch>
            <Route path = "/login" exact component = { Home } />
            <Route path = "/signup" exact component = { SignUp } />
            <Redirect to = "/login"/>
          </Switch>
        </div>
      </BrowserRouter>
    ); 

    if(this.state.loggedIn) {
      routes = (
        <BrowserRouter>
          <div className = "App">
            <div className = "nav">
              <Navbar/>
              <div className = "flexRow" style = {{marginLeft: "auto"}}>
                <span 
                  style = {{fontSize: "22px", marginRight: "10px"}}
                >
                  <Link 
                    to = "/dashboard/profile" 
                    style = {{color: "white"}}
                  >
                    {this.state.name}
                  </Link>
                </span>
                <Button 
                  onClick={this.logout} 
                  style = {{color:'white', fontSize: "17px"}}
                >
                  Logout
                </Button>
              </div>
            </div>
            <Switch>
              <Route path= "/dashboard" exact component = { Dashboard } />
              <Route path= "/dashboard/profile" exact component = { Profile } />
              <Route path= "/dashboard/browse" exact component = { Browser } />
              <Route path= "/courses/:courseName" exact component = { CoursePage } />
              <Route path= "/course/:courseName?/:questionID?" exact component = { Question } />
            </Switch>
          </div>
        </BrowserRouter>
      ); 
    } 

    return (
      <div >
        {routes}
      </div>
    );
  }
}

export default App;
