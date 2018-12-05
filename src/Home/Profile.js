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
        this.getUserInfo = this.getUserInfo.bind(this);
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
        this.getUserInfo();
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

    getUserInfo(){
        var page = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid
                }
                axios.all([
                    axios.post('https://studybuddys-223920.appspot.com/api/getUsername', info),
                    axios.post('https://studybuddys-223920.appspot.com/api/getUseremail', info)
                ])
                .then( axios.spread((userNameRes, emailRes) => {
                    page.setState({
                        name: userNameRes.data.name,
                        email: emailRes.data.email
                    })
                }))
                // axios.post('https://studybuddys-223920.appspot.com/api/getUsername', info)
                // .then(response => {
                //     page.setState({name : response.data.name})
                // })
                // axios.post('https://studybuddys-223920.appspot.com/api/getUseremail', info)
                // .then(response => {
                //     page.setState({email: response.data.email})
                // })
            }
        });
    }

    updateSocialMedia() {
        var page = this;
        var fb = this.state.newFacebook;
        var li = this.state.newLinkedIn;
        var ig = this.state.newInstagram;
        if ((!fb.includes('facebook.com'))  && (fb !== "")) {
            alert("The link you've entered is not a Facebook link!")
        } else if ((!li.includes('linkedin.com')) && (li !== "")) {
            alert("The link you've entered is not a LinkedIn link!")
        } else if ((!ig.includes('instagram.com')) && (ig !== "")) {
            alert("The link you've entered is not a Instagram link!")
        } else {
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
                    .then(
                        page.getSocialMedia()
                    )
                }
            })
        }
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
                .then(page.getMeetUps())
                .then(page.getApprovedMeetUps())
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
                })
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
                })  
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
                })
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
                axios.post('https://studybuddys-223920.appspot.com/api/deleteMeetup', info)
                .then(
                    alert("You Deleted An Event.")
                )
                .then(page.getMeetUps(),page.getApprovedMeetUps(),page.getDeniedMeetUps())  
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
                        <Typography variant = "h6"><strong>Name:</strong> {this.state.name}</Typography>
                        <Typography variant = "h6"><strong>Email:</strong> {this.state.email}</Typography>
                        <Typography variant = "h6"><strong>Facebook:</strong> {this.state.facebook}</Typography>
                        <Typography variant = "h6"><strong>LinkedIn:</strong> {this.state.linkedIn}</Typography>
                        <Typography variant = "h6"><strong>Instagram:</strong> {this.state.instagram}</Typography>
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
                        <Typography variant = "subtitle1">(Leave As Is If You're Not Updating)</Typography>
                        <br/>
                        <TextField
                            type = "url"
                            defaultValue = "facebook.com"
                            style = {{marginTop: "18px"}}
                            onChange = {this.handleChange("newFacebook")}
                        />
                        <TextField
                            type = "url"
                            defaultValue = "linkedin.com"
                            style = {{marginTop: "18px"}}
                            onChange = {this.handleChange("newLinkedIn")}
                        />
                        <TextField
                            type = "url"
                            defaultValue = "instagram.com"
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
                        {
                            this.state.meetUps.map((title, key) => {
                            return(
                                <Paper className="event" key = {key} style = {{width: "350px"}}>
                                    <Typography variant = "title">
                                        {this.state.meetUps[key].courseName}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        Host Buddy: {this.state.meetUps[key].name}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        Study Buddy: {this.state.meetUps[key].partner}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        "{this.state.meetUps[key].description}"
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        {this.state.meetUps[key].date}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        {this.state.meetUps[key].time}
                                    </Typography>
                                    
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
                        <Typography variant = "h4">Awaiting Response Events</Typography>
                        <br/>
                        {
                            this.state.awaitingMeetUp.map((title, key) => {
                            return(
                                <Paper className="event" key = {key} style = {{width: "350px"}}>
                                    <Typography variant = "title">
                                        {this.state.awaitingMeetUp[key].courseName}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        Host Buddy: {this.state.awaitingMeetUp[key].name}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        Study Buddy: {this.state.awaitingMeetUp[key].partner}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        "{this.state.awaitingMeetUp[key].description}"
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        {this.state.awaitingMeetUp[key].date}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        {this.state.awaitingMeetUp[key].time}
                                    </Typography>
                                     
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
                        <Typography variant = "h4">Approved Events</Typography>
                        <br/>
                        {
                            this.state.approvedMeetUp.map((title, key) => {
                            return(
                                <Paper className="event" key = {key} style = {{width: "350px"}}>
                                    <Typography variant = "title">
                                        {this.state.approvedMeetUp[key].courseName}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        Host Buddy: {this.state.approvedMeetUp[key].name}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        Study Buddy: {this.state.approvedMeetUp[key].partner}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        "{this.state.approvedMeetUp[key].description}"
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        {this.state.approvedMeetUp[key].date}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        {this.state.approvedMeetUp[key].time}
                                    </Typography>
                                    
                                    
                                   <Button onClick={()=>{this.setState({selectedMeetUp:this.state.approvedMeetUp[key].meetupId},this.deleteMeetUps)}} color="secondary">Delete</Button>
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
                        <Typography variant = "h4">Denied Events</Typography>
                        <br/>

                        {
                            this.state.deniedMeetup.map((title, key) => {
                            return(
                                <Paper className="event" key = {key} style = {{width: "350px"}}>
                                    <Typography variant = "title">
                                        {this.state.deniedMeetup[key].courseName}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        Host Buddy: {this.state.deniedMeetup[key].name}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        Study Buddy: {this.state.deniedMeetup[key].partner}
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        "{this.state.deniedMeetup[key].description}"
                                    </Typography>
                                    
                                    <Typography variant = "subtitle1">
                                        {this.state.deniedMeetup[key].date}
                                    </Typography> 
                                    
                                    <Typography variant = "subtitle1">
                                        {this.state.deniedMeetup[key].time}
                                    </Typography>
                                    
                                    <Button onClick={()=>{this.setState({selectedMeetUp:this.state.deniedMeetup[key].meetupId},this.deleteMeetUps)}} color="secondary">Delete</Button>
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
