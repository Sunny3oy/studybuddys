import React, { Component } from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase';
import { BrowserRouter,Route,Redirect } from 'react-router-dom';
import axios from 'axios'; // import axios library
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn:'true', // This is no longer necessary
        }
        this.logout = this.logout.bind(this);
        this.checkIfUser = this.checkIfUser.bind(this);
    }

    logout(e){
        e.preventDefault();
        axios.get('http://localhost:3001/api/logout');
        this.props.history.push('/');
    }

    checkIfUser(e){
        axios.get('http://localhost:3001/api/checkLoggedIn')
        .then(response => {
            if(!(response.data.loggedIn)){
                this.props.history.push('/');
            }
        })
    }

  render() {
    return (
      <div >
        {this.checkIfUser()} {/* Check if user is logged in. If not redirect to login page */}
        <h1>Hello there</h1>
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  }
}

export default Dashboard;
