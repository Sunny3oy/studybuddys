import './Profile.css';
import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import Navbar from "./Navbar";
import Card from '@material-ui/core/Card';
import axios from 'axios';

class Profile extends Component{
    constructor(props) {
        super(props);
         this.state = {
                userClass: "", 
         }
         this.getUserName = this.getUserName.bind(this);
    }

    componentDidMount(){
        this.getUserName();
    }

    getUserName(e){
        axios.get('http://localhost:3001/api/getUsername')
        .then(response => {
            this.setState({name : response.data.name})
        })
    }
    
render(){

    return(
    <div className = "">

        <Navbar/>
        
        <div className = "">
            <h3>Profile settings</h3>
            <p>Update your profile password and etc settings</p>
            <Card
                    raised = "true"
                    className = "profile"
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="500">

                <h4>Your Currrent Information:</h4>
                

                <span>Name:{this.state.name}</span>  
            </Card>
                    
            <Card
                    raised = "true"
                    className = "profile1"
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="500">
                    <h4>Change Information:</h4>
            <form>
                <TextField
                    className = ""
                    type='username'
                    placeholder = "Change Username"
                    style= {{margin:'15px'}}
                />
                <TextField
                    className= ""
                    type='password'
                    style = {{margin:'15px'}}
                    placeholder = "Change Password"
                />
                <TextField
                    className= ""
                    style = {{marginTop:'15px'}}
                    type='email'
                    placeholder = "Change Email Address"
                />
            </form>
                <div class="btn btn-primary">Save changes</div>  
            </Card>      
        </div>
    </div>
        )
    }   
}
export default Profile;
