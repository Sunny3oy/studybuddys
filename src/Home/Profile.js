import './Profile.css';
import React, { PureComponent } from 'react';
import {
    TextField,
    Typography,
    Card,
    Button,
    Paper
} from '@material-ui/core';
import axios from 'axios';
import * as firebase from 'firebase';
import "./Dashboard.css";

class Profile extends PureComponent{
    constructor(props) {
        super(props);
            this.state = {
                userClass: "",
                name: "",
                password: "",
                email: "",
                facebook: "facebook-link",
                linkedIn: "linkedIn-link",
                instagram: "instagram-link",
                eventName: ["Study With Jenny", "Lunch At Cafe Amore", "Study for Paradigms Final"],
                description: ["One on One Date", "Food is Important", "Kill me now","Dec 16 2018, 12:00PM"],
                dateAndTime: ["Dec 06, 2018 3:30PM", "Dec 06, 2018 4:30PM", "Dec 16 2018, 12:00PM"]
            }
        this.getUserName = this.getUserName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount(){
        this.getUserName();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    changeEmail(e){
        var user = firebase.auth().currentUser;
        var email = this.state.email;
        user.updateEmail(email).then(function() {
            alert("Successful update");
        }).catch(function(error) {
            alert(error);
        });
    }

   changePassword(e){
        var user = firebase.auth().currentUser;
        var password = this.state.pass
        user.updatePassword(password).then(function() {
            alert("Successful update");
        }).catch(function(error) {
            alert(error);
        });
    }

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

    render(){

        return(
            <div>

                <div
                    className = "flexCenter"
                    raised = {true}
                    data-aos="fade-in"
                    data-aos-easing="linear"
                    data-aos-duration="800"
                >

                    <Typography variant = "h3"><br></br><u>Profile</u></Typography>
                    <br/>
                    <Card
                        raised = {true}
                        className = "profile"
                        data-aos="fade-in"
                        data-aos-easing="linear"
                        data-aos-duration="800"
                    >
                        <Typography variant = "h4">Your Current Information:</Typography>
                        <br/>
                        <Typography variant = "h6">Name: {this.state.name}</Typography>
                        <Typography variant = "h6">Facebook: {this.state.facebook}</Typography>
                        <Typography variant = "h6">LinkedIn: {this.state.linkedIn}</Typography>
                        <Typography variant = "h6">Instagram: {this.state.instagram}</Typography>
                    </Card>

                    <Card
                        raised = {true}
                        className = "profile"
                        data-aos="fade-in"
                        data-aos-easing="linear"
                        data-aos-duration="800"
                    >
                        <Typography variant = "h4">Update Information:</Typography>
                        <br/>
                        <form>
                            {/* <TextField
                                className = ""
                                type='username'
                                placeholder = "Change Username"
                                style= {{margin:'15px'}}
                            /> */}
                            <TextField
                                className= ""
                                style = {{margin:'15px'}}
                                onChange = {this.handleChange("pass")}
                                placeholder = "Change Password"
                            />
                            <TextField
                                className= ""
                                style = {{marginTop:'15px'}}
                                type='email'
                                onChange = {this.handleChange("email")}
                                placeholder = "Change Email Address"
                            />
                        </form>
                        <div className="buttom_style">
                        <Button onClick = {this.changePassword}>Save changes</Button>
                        <Button onClick = {this.changeEmail}>Save changes</Button>
                        </div>
                    </Card>

                    <Card
                        raised = {true}
                        className = "profile"
                        data-aos="fade-in"
                        data-aos-easing="linear"
                        data-aos-duration="800"
                    >
                        <Typography variant = "h4">Social Media Accounts</Typography>
                        <br/>
                        <TextField
                            type = "url"
                            placeholder = "Facebook Link"
                            style= {{padding:'15px'}}
                        />
                        <TextField
                            type = "url"
                            placeholder = "LinkedIn Link"
                            style= {{padding:'15px'}}
                        />
                        <TextField
                            type = "url"
                            placeholder = "Instagram"
                            style= {{padding:'15px'}}
                        />
                        <div className="social_b">
                        <Button>Save changes</Button>
                        <Button>Save changes</Button>
                        <Button>Save changes</Button>
                        </div>
                    </Card>

                    <Card
                        raised = {true}
                        className = "profile"
                        data-aos="fade-in"
                        data-aos-easing="linear"
                        data-aos-duration="800"
                    >
                        <Typography variant = "h4">Upcoming Events</Typography>
                        <br/>
                        {this.state.eventName.map((title, key) => {
                            return(
                                <Paper className="event">
                                    {title}
                                    <br/>
                                    {this.state.description[key]}
                                    <br/>
                                    {this.state.dateAndTime[key]}
                                </Paper>
                            )
                        })}
                    </Card>
                </div>
            </div>
        )
    }
}
export default Profile;
