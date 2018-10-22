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
            name: '',
            uid: '',
        }
        this.logout = this.logout.bind(this);
        this.checkIfUser = this.checkIfUser.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.fireBaseListener = null;
    }

    componentDidMount() {
        this.getUserName();
    }
    
    componentWillUnmount(){
        this.fireBaseListener && this.fireBaseListener();
        this.getUserName = undefined;
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

    // getUserName() {
    //     console.log(firebase.auth().currentUser);
    //     // firebase.database(`users/${firebase.auth().currentUser.uid}`).once('value')
    //     // .then((snap)=>{
    //     //     if (snap.val()) {
    //     //         this.setState({
    //     //             name: snap.val().name
    //     //         })
    //     //         console.log(snap.val().name);
    //     //     }
    //     // });
    // }

    getUserName(){
        axios.post('http://localhost:3001/api/getUsername').then(response => {
            this.setState({
                name: this.name
            })
        })
    }

  render() {
    return (
      <div >
        {this.checkIfUser()} {/* Check if user is logged in. If not redirect to login page */}
        <h1>Hello there</h1>
        <Button onClick={this.logout}>Logout</Button>
        <h1>hello {this.state.name} </h1>
      </div>
    );
  }
}

export default Dashboard;
