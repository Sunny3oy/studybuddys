import React, { PureComponent } from 'react';
import {
    Typography,
    TextField,
    Button,
    Paper
} from '@material-ui/core';
import './CoursePage.css';
import axios from 'axios';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MeetUp from "./MeetUp";

class CoursePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            course: '',
            newQuestion: "",
            questID: [],
            questions: [],
            createdBy: [],
            replies: [],
            calendarIsOpen: false,
            currentID:"",
            replyText:"",
            userList:[],
            userListId: [],
            open:false,
            openkey: 0,
            today: "",
            facebook: "",
            linkedIn: "",
            instagram: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.handleClickOpen =this.handleClickOpen.bind(this);
        this.handleClose =this.handleClose.bind(this);
        this.getToday = this.getToday.bind(this);
        this.getSocialMedia = this.getSocialMedia.bind(this);
        this.authen = this.authen.bind(this);
    }

    componentDidMount() {
      this.authen();
        const { courseName } = this.props.match.params;
        fetch(`/courses/${courseName}`).then(this.setState({course : courseName}))
        .then(this.getQuestions)
        .then(this.getUserList(courseName))
        this.getToday();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    getSocialMedia(key) {
        var partner = this.state.userListId[key];
        var page = this;
        var info = {
            id: partner,
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

    authen() {
      var thisPage = this.props;
      firebase.auth().onAuthStateChanged(function(user) {
         if (!user) {
            thisPage.history.push("/login");
         }
      });
    }

    getQuestions() {
        var course = {
            courseName: this.state.course
        };
        axios.post('https://studybuddys-223920.appspot.com/api/getQuestions', course)
            .then(response => {
                this.setState({
                    questID: response.data.ids,
                    questions: response.data.questions,
                    createdBy: response.data.names
                })
            })
    }

    getReplies(ID){
        var info={
            questionID: ID,
        }
        axios.post("https://studybuddys-223920.appspot.com/api/getReplies",info)
        .then(response=>{
            this.setState({
                replies:response.data.replies,
                createdBy: response.data.names
            })
        })
    }

    createQuestion() {
        var page = this;
        var course = this.state.course;
        var newQuestion = this.state.newQuestion;
        firebase.auth().onAuthStateChanged(function(user){
            if(user) {
                var question = {
                    id: user.uid,
                    courseName: course,
                    userQuestion: newQuestion
                };
                axios.post('https://studybuddys-223920.appspot.com/api/createQuestion', question)
                .then(page.getQuestions)
            }
        })
    }

    getUserList(name){
        var page = this;
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                var info ={
                    courseName:name,
                };
                axios.post('https://studybuddys-223920.appspot.com/api/getUsersByCourseTaken',info)
                .then(response=>{
                    page.setState({
                        userList:response.data.names,
                        userListId: response.data.ids
                    })
                })
            }
        })
    }

    getToday() {
        var date = new Date();
        var month = date.getMonth() + 1; //months from 1-12
        var day = date.getDate();
        var year = date.getFullYear();
        var hour = date.getHours();
        var min = date.getMinutes();
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var timeNow = hour + ":" + min
        var today = year + "-" + month + "-" + day + "T" + timeNow;
        this.setState({
            today: today
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true});
    };

    handleClose = () => {
        this.setState({ open: false });
      };

    render() {
        return (

            <div data-aos ="fade-in" data-aos-easing="linear" data-aos-duration="800" style = {{display: "flex", flexDirection: "column"}}>

                <Typography variant = "h1" style = {{margin: "16px auto"}}>{this.state.course}</Typography>
                <div className="flexCenter" style={{margin:"30px",backgroundColor: "#ffffff",border:"1px solid black", padding:"20px", borderRadius:"10px", boxShadow:"5px 5px 5px 5px #777777", MozBoxShadow:"0 0 10px #777777",WebkitBoxShadow:"0 0 10px #777777"}}>
                    <Typography
                        gutterBottom = {true}
                        variant = "h4">
                        <u>Questions</u>:
                    </Typography>
                    {this.state.questions.map((data, key) => {
                        return (
                            <Paper
                                className = "flexCenter"
                                style = {{margin: "10px auto", height: "10%", width: "50%"}}
                                key={key}
                            >
                                <Link to = {"/course/" + this.state.course + "/" + this.state.questID[key]}>
                                    <Typography style = {{marginTop: "15px"}}  variant = "h5">
                                        {data}
                                    </Typography>
                                </Link>
                            </Paper>
                        )
                    })}
                    <TextField
                        variant = "outlined"
                        multiline = {true}
                        label = "Ask a Question"
                        onChange = {this.handleChange("newQuestion")}
                        style = {{marginTop: "20px", width: "50%"}}
                    >
                    </TextField>
                    <br/>
                    <Button
                        type = "submit"
                        variant = "contained"
                        onClick = {this.createQuestion}
                        style = {{width: "50%"}}
                    >
                        Ask Away
                    </Button>
                </div>

                <Card className = "flexRow" style = {{margin: "10px auto", width: "50%", height: "50px"}} >
                    {
                        this.state.userList.map((data,key)=>{
                            return (
                                <div key = {key}>
                                    <Button
                                        onClick={() => {
                                            this.handleClickOpen();
                                            this.setState({openKey: key});
                                            this.setState({openKey: key}, this.getSocialMedia(key))
                                        }}
                                    >
                                        {data}
                                    </Button>
                                    <Dialog
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                    >
                                    <DialogTitle  id="alert-dialog-title">{this.state.userList[this.state.openKey]}</DialogTitle>
                                        <DialogContent style = {{width : "575px"}}>
                                            
                                            <DialogContentText id="alert-dialog-description">
                                                <Typography variant = "subtitle1">
                                                     Facebook: {this.state.facebook}
                                                 </Typography>
                                                 <Typography variant = "subtitle1">
                                                     LinkedIn: {this.state.linkedIn}
                                                 </Typography>
                                                 <Typography variant = "subtitle1">
                                                     Instagram: {this.state.instagram}
                                                 </Typography>
                                                 <br/>
                                            </DialogContentText>
                                            <br></br>
                                            <MeetUp
                                                courseName = {this.state.course}
                                                partner = {this.state.userListId[this.state.openKey]}
                                                today = {this.state.today}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleClose} color="primary">Close</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            )
                        })
                    }
                </Card>
            </div>
        )
    }
}

export default CoursePage;
