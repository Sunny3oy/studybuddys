import React, { Component } from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase';
import { BrowserRouter,Route,Redirect } from 'react-router-dom';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           loggedIn:'true',
    
        }
        this.logout = this.logout.bind(this);
    }
    logout(){
      firebase.auth().signOut();
      this.setState({
        loggedIn:'false',
      });
    

    }
  render() {
    return (
      <div >
        
        <h1>Hello i am a dashboard</h1>
        <Button onClick={this.logout}>Logout</Button>
        {
            this.state.loggedIn ?
              null: <Redirect to="/" /> 
        }
      </div>
    );
  }
}

export default Dashboard;