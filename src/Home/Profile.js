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
                name: "",
                password: "",
                email: "",
                newPassword: "",
                newEmail: "",
                facebook: "Facebook",
                linkedIn: "LinkedIn",
                instagram: "Instagram",
                newFacebook: "",
                newLinkedIn: "",
                newInstagram: "",
                decision:false,
                meetUps:[],
                selectedMeetUp:"",
                awaitingMeetUp:[],
                approvedMeetUp:[],
                deniedMeetup:[],
            }
        this.getUserName = this.getUserName.bind(this);
        this.getUserEmail = this.getUserEmail.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.updateSocialMedia = this.updateSocialMedia.bind(this);
        this.getSocialMedia = this.getSocialMedia.bind(this);
        this.getMeetUps = this.getMeetUps.bind(this);
        this.approveMeetUps = this.approveMeetUps.bind(this);
        this.denyMeetUps = this.denyMeetUps.bind(this);
        this.getPendingReplyMeetUps = this.getPendingReplyMeetUps.bind(this);
        this.getApprovedMeetUps = this.getApprovedMeetUps.bind(this);
        this.getDeniedMeetUps = this.getDeniedMeetUps.bind(this);
        this.deleteMeetUps = this.deleteMeetUps.bind(this);
    }

    componentDidMount(){
        this.getUserName();
        this.getUserEmail();
        this.getSocialMedia();
        this.getMeetUps();
        this.getPendingReplyMeetUps();
        this.getApprovedMeetUps();
        this.getDeniedMeetUps();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    changeEmail(e){
        var page = this;
        var user = firebase.auth().currentUser;
        var userEmail = this.state.newEmail;
        user.updateEmail(userEmail)
        .then(function() {
           firebase.database().ref('users/' + user.uid ).update({ email: userEmail })
           .then(function(){
             alert("Successful update. Please log out for the change to take effect.")
             page.setState({email: userEmail})
           })
           .catch(function (error) {
             alert(error.message);
           });
        })
        .catch(function(error) {
            alert(error.message);
        })
    }

   changePassword(e){
        var user = firebase.auth().currentUser;
        var password = this.state.newPassword
        user.updatePassword(password).then(function() {
            alert("Successful update. Please log out for the change to take effect.");
        }).catch(function(error) {
            alert(error);
        });
    }

    getUserName(){
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

    updateSocialMedia() {
        var fb = this.state.newFacebook;
        var li = this.state.newLinkedIn;
        var ig = this.state.newInstagram;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    urlList: {
                        facebook: fb,
                        linkedin: li,
                        instagram: ig,
                    }
                }
                axios.post('https://studybuddys-223920.appspot.com/api/updateSocialMedia', info)
                .then(
                    alert("Social Media Link Updated.")
                )
            }
        })
    }

    getSocialMedia() {
        var page = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                }
                axios.post('https://studybuddys-223920.appspot.com/api/getSocialMedia', info)
                .then( response => {
                    page.setState({
                        facebook: response.data.urlList[0],
                        linkedIn: response.data.urlList[1],
                        instagram: response.data.urlList[2],
                    })
                })
            }
        })
    }

    getMeetUps(){
        var page = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                }
                axios.post('https://studybuddys-223920.appspot.com/api/getPendingResponseMeetUps', info)
                .then( response => {
                    page.setState({    
                        meetUps:response.data.info,                       
                    })
                    // console.log(response)
                    // console.log(response.data.info[0].name)
                    
                })
                
            }
        })
    }
    approveMeetUps(){
        var page = this;
        var key = this.state.selectedMeetUp;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    meetupId:key
                }
                axios.post('https://studybuddys-223920.appspot.com/api/approveMeetup', info)
                .then( page.getMeetUps()
                    
                ).then(page.getApprovedMeetUps())
               
            }
        })
        
        
    }

    denyMeetUps(){
        var page = this;
        var key = this.state.selectedMeetUp;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    meetupId:key
                }
                axios.post('https://studybuddys-223920.appspot.com/api/denyMeetup', info)
                .then( page.getMeetUps()
                    
                ).then(page.getDeniedMeetUps())
              
            }
        })
        
    }

    getPendingReplyMeetUps(){
        var page = this;
        var key = this.state.selectedMeetUp;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    meetupId:key
                }
                axios.post('https://studybuddys-223920.appspot.com/api/getPendingReplyMeetUps', info)
                .then(response=>{
                    page.setState({
                        awaitingMeetUp:response.data.info
                    })
                }
                    
                )
                
            }
        })
        
    }

    getApprovedMeetUps(){
        var page = this;
        var key = this.state.selectedMeetUp;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    meetupId:key
                }
                axios.post('https://studybuddys-223920.appspot.com/api/getApprovedMeetUps', info)
                .then(response=>{
                    page.setState({
                        approvedMeetUp:response.data.info
                    })
                }
                    
                )
                
            }
        })
        
    }

    getDeniedMeetUps(){
        var page = this;
        var key = this.state.selectedMeetUp;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    meetupId:key
                }
                axios.post('https://studybuddys-223920.appspot.com/api/getDeniedMeetUps', info)
                .then(response=>{
                    page.setState({
                        deniedMeetup:response.data.info
                    })
                }
                    
                )
                
            }
        })
    }

    deleteMeetUps(){
        var page = this;
        var key = this.state.selectedMeetUp;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    meetupId:key
                }
                console.log(info) 
                axios.post('https://studybuddys-223920.appspot.com/api/deleteMeetup', info)
                .then(alert("You Deleted An Event.")
                    
                )
                
                console.log(info)    
            }
            
        })

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
                        <Typography variant = "h4">Update Account Information:</Typography>
                        <br/>
                        <TextField
                            style = {{marginTop:'18px'}}
                            type='email'
                            onChange = {this.handleChange("newEmail")}
                            placeholder = "Email Address"
                        />
                        <Button onClick = {this.changeEmail}>Save Change</Button>
                        <TextField
                            type = "password"
                            style = {{marginTop:'18px'}}
                            onChange = {this.handleChange("newPassword")}
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
                        <Typography variant = "subtitle1">(Leave Blank If You're Not Updating)</Typography>
                        <br/>
                        <TextField
                            type = "url"
                            placeholder = "Facebook"
                            style = {{marginTop: "18px"}}
                            onChange = {this.handleChange("newFacebook")}
                        />
                        <TextField
                            type = "url"
                            placeholder = "LinkedIn"
                            style = {{marginTop: "18px"}}
                            onChange = {this.handleChange("newLinkedIn")}
                        />
                        <TextField
                            type = "url"
                            placeholder = "Instagram"
                            style = {{marginTop: "18px"}}
                            onChange = {this.handleChange("newInstagram")}
                        />
                        <Button onClick = {this.updateSocialMedia}>Save Change(s)</Button>
                    </Card>

                    <Card
                        raised = {true}
                        className = "profile"
                        data-aos="fade-in"
                        data-aos-easing="linear"
                        data-aos-duration="800"
                    >
                        <Typography variant = "h4">Please Respond Events</Typography>
                        <br/>
                        {console.log(this.state.meetUps)}
                        {
                            this.state.meetUps.map((title, key) => {
                            return(
                                <Paper className="event" key = {key}>
                                    {this.state.meetUps[key].name}
                                    <br/>
                                    {this.state.meetUps[key].courseName}
                                    <br/>
                                    {this.state.meetUps[key].description}
                                    <br/>
                                    {this.state.meetUps[key].date}
                                    <br/>
                                    {this.state.meetUps[key].time}
                                    <br/>

                                    {
                                    this.state.decision !== true?
                                        <div className="flexRow">
                                            <Button onClick={()=>{this.setState({selectedMeetUp:this.state.meetUps[key].meetupId},this.approveMeetUps)}}>YES</Button>
                                            <Button onClick={()=>{this.setState({selectedMeetUp:this.state.meetUps[key].meetupId},this.denyMeetUps)}}>NO</Button>
                                        </div>
                                    :
                                    <div><p><b>You're Meeting Up!</b></p></div>
                                    }
                                   
                                </Paper>
                            )
                        })}
                    </Card>

                    <Card
                        raised = {true}
                        className = "profile"
                        data-aos="fade-in"
                        data-aos-easing="linear"
                        data-aos-duration="800"
                    >
                        <Typography variant = "h4"> Awaiting Response Events</Typography>
                        <br/>
                        {console.log(this.state.meetUps)}
                        {
                            this.state.awaitingMeetUp.map((title, key) => {
                            return(
                                <Paper className="event" key = {key}>
                                    {this.state.awaitingMeetUp[key].name}
                                    <br/>
                                    {this.state.awaitingMeetUp[key].courseName}
                                    <br/>
                                    {this.state.awaitingMeetUp[key].description}
                                    <br/>
                                    {this.state.awaitingMeetUp[key].date}
                                    <br/>
                                    {this.state.awaitingMeetUp[key].time}
                                    <br/>

                                    
                                   
                                </Paper>
                            )
                        })}
                    </Card>

                    <Card
                        raised = {true}
                        className = "profile"
                        data-aos="fade-in"
                        data-aos-easing="linear"
                        data-aos-duration="800"
                    >
                        <Typography variant = "h4"> Approved Events</Typography>
                        <br/>
                        {console.log(this.state.meetUps)}
                        {
                            this.state.approvedMeetUp.map((title, key) => {
                            return(
                                <Paper className="event" key = {key}>
                                    {this.state.approvedMeetUp[key].name}
                                    <br/>
                                    {this.state.approvedMeetUp[key].courseName}
                                    <br/>
                                    {this.state.approvedMeetUp[key].description}
                                    <br/>
                                    {this.state.approvedMeetUp[key].date}
                                    <br/>
                                    {this.state.approvedMeetUp[key].time}
                                    <br/>
                                    
                                   {/* <Button onClick={()=>{this.setState({selectedMeetUp:this.state.meetUps[key].meetupId},this.deleteMeetUps)}} color="secondary">Delete</Button> */}
                                </Paper>
                            )
                        })}
                    </Card>

                    <Card
                        raised = {true}
                        className = "profile"
                        data-aos="fade-in"
                        data-aos-easing="linear"
                        data-aos-duration="800"
                    >
                        <Typography variant = "h4"> Denied Events</Typography>
                        <br/>
                        {console.log(this.state.meetUps)}
                        {
                            this.state.deniedMeetup.map((title, key) => {
                            return(
                                <Paper className="event" key = {key}>
                                    {this.state.deniedMeetup[key].name}
                                    <br/>
                                    {this.state.deniedMeetup[key].courseName}
                                    <br/>
                                    {this.state.deniedMeetup[key].description}
                                    <br/>
                                    {this.state.deniedMeetup[key].date}
                                    <br/>
                                    {this.state.deniedMeetup[key].time}
                                    <br/>
                                    {/* <Button onClick={()=>{this.setState({selectedMeetUp:this.state.meetUps[key].meetupId},this.deleteMeetUps)}} color="secondary">Delete</Button> */}
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
