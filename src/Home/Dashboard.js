import React, { Component } from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import axios from 'axios'; // import axios library
import Courses from "./Courses";
import Navbar from "./Navbar";



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn:'true', // This is no longer necessary
        }
        this.logout = this.logout.bind(this);
        this.checkIfUser = this.checkIfUser.bind(this);
        this.getUserName = this.getUserName.bind(this);
    }

    logout(e){
        e.preventDefault();
        axios.get('http://localhost:3001/api/logout');
        this.props.history.push('/');
    }

    componentDidMount(){
        this.checkIfUser();
        this.getUserName();
    }

    getUserName(e){
        axios.get('http://localhost:3001/api/getUsername')
        .then(response => {
            this.setState({name : response.data.name})
        })
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
      <div style = {{height: "100vh", backgroundImage: "linear-gradient(to right top, #e00a0a, #e44900, #e66b00, #e58800, #e4a300)"}}>  
        <div style = {{float: "right", display: "inline-block"}}>
            <span>{this.state.name}</span>
          <Button onClick={this.logout}>Logout</Button>  
        </div> 
       
       <Navbar/>


        <h1 
            className = "dashSec"
        >
            My Courses
        </h1>

        < Courses / >
        < Courses / >
        < Courses / >
        < Courses / >
        < Courses / >
        < Courses / >
        < Courses / >
        < Courses / >
      </div>
      
     
    )
  }
}

export default Dashboard;
