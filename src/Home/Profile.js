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
        this.getUserEmail = this.getUserEmail.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.addSocialMedia = this.addSocialMedia.bind(this);
    }

    componentDidMount(){
        this.getUserName();
        this.getUserEmail();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    changeEmail(e){
        var user = firebase.auth().currentUser;
        var userEmail = this.state.email;
        user.updateEmail(userEmail)
        .then(function() {
           firebase.database().ref('users/' + user.uid ).update({ email: userEmail })
           .then(function(){
             alert("Successful update")
           })
           .catch(function (error) {
             alert(error.message);
           });
        })
        .catch(function(error) {
            alert(error.message);
        });
        this.getUserEmail();
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

    getUserEmail() {
        var page = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid
                }
                axios.post('https://studybuddys-223920.appspot.com/api/getUseremail', info)
                .then(response => {
                    page.setState({email: response.data.email})
                })
            }
        });
    }

    addSocialMedia() {

    }

    render(){

        return(
            <div>

                <div
                    className = "flexCenter"
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
                        <Typography variant = "h6">Email: {this.state.email}</Typography>
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
                        <TextField
                            style = {{marginTop:'18px'}}
                            type='email'
                            onChange = {this.handleChange("email")}
                            placeholder = "Email Address"
                        />
                        <Button onClick = {this.changeEmail}>Save Change</Button>
                        <TextField
                            style = {{marginTop:'18px'}}
                            onChange = {this.handleChange("pass")}
                            placeholder = "Password"
                        />
                        <Button onClick = {this.changePassword}>Save Change</Button>
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
                            placeholder = "Facebook"
                            style = {{marginTop: "18px"}}
                            onChange = {this.handleChange("facebook")}
                        />
                        <Button onClick = {this.addSocialMedia}>Save Change</Button>
                        <TextField
                            type = "url"
                            placeholder = "LinkedIn"
                            style = {{marginTop: "18px"}}
                            onChange = {this.handleChange("linkedIn")}
                        />
                        <Button onClick = {this.addSocialMedia}>Save Change</Button>
                        <TextField
                            type = "url"
                            placeholder = "Instagram"
                            style = {{marginTop: "18px"}}
                            onChange = {this.handleChange("instagram")}
                        />
                        <Button onClick = {this.addSocialMedia}>Save Change</Button>
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
                                <Paper className="event" key = {key}>
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
