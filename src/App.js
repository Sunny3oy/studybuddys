import React, { Component } from 'react';
import './App.css';
import { BrowserRouter,Route,Switch,} from 'react-router-dom';
import Dashboard from './Home/Dashboard';
import Home from './Home/Home';
import SignUp from './Home/SignUp';
import Browser from './Home/Browser';
import Profile from './Home/Profile';
import CoursePage from './Home/CoursePage';
import Question from './Home/Question';
import NotFound from './Home/NotFound';
import "./Home/Dashboard.css";


class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <div className = "App">
            <Switch>
              <Route path = "/" exact component = { Home } />
              <Route path = "/signup" exact component = { SignUp } />
              <Route path= "/dashboard" exact component = { Dashboard } />
              <Route path= "/dashboard/profile" exact component = { Profile } />
              <Route path= "/dashboard/browse" exact component = { Browser } />
              <Route path= "/courses/:courseName" exact component = { CoursePage } />
              <Route path= "/course/:courseName?/:questionID?" exact component = { Question } />
              <Route path='*' exact component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
