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
// import Calendar from "./Calendar2";
import { Link } from 'react-router-dom';
import CalendarModal from './MeetUp/CalendarModal'
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
            open:false,
            clickUser:"",
            openKey:0
        }
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.handleClickOpen =this.handleClickOpen.bind(this);
        this.handleClose =this.handleClose.bind(this);
        this.storeKey = this.storeKey.bind(this);
    }

    componentDidMount() {
        const { courseName } = this.props.match.params;
        fetch(`/courses/${courseName}`).then(this.setState({course : courseName}));
        this.getQuestions(courseName);
        this.getUserList(courseName);
    }

    checkLoggedIn() {
        var prop = this.props;
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                prop.history.push('/');
            }
        });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    getQuestions(courseNum) {
        var course = {
            courseName: courseNum
        };
        axios.post('https://studybuddys-223920.appspot.com/api/getQuestions', course)
            .then(response => {
                this.setState({
                    questID: response.data.ids,
                    questions: response.data.questions,
                    createdBy: response.data.names})
            })
    }

    getReplies(ID){
        var info={
            questionID: ID,
        }
        axios.post("https://studybuddys-223920.appspot.com/api/getReplies",info)
        .then(response=>{
            console.log(ID);
            console.log(response.data.replies);
            this.setState({
                replies:response.data.replies,
            })
        })
    }

    submitAnswer(){
        console.log(this.state.replyText);
        var replyT =this.state.replyText;
        var qID = this.state.currentID;
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var info = {
                        id: user.uid,
                        replyText:replyT,
                        questionID : qID,
                    }
                    axios.post('https://studybuddys-223920.appspot.com/api/submitAnswer', info)
                }
                });
                console.log(this.state.replies);
        this.getReplies(qID);
    }

    createQuestion() {
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
                console.log("course is " + course)
                console.log("question is: " + newQuestion)
                console.log(question)
            }
        })
        this.getQuestions(this.state.course);
    }

    openCalendar() {
        this.setState({
            calendarIsOpen: !this.state.calendarIsOpen
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
                        userList:response.data.users,  
                    })
                    console.log(response)
                })
                
            }
        })
        console.log(this.state.userList)
    }

    handleClickOpen = () => {
        this.setState({ open: true});
        console.log(this.state.open);
    };
    handleClose = () => {
        this.setState({ open: false });
      };

    storeKey(key){
        this.setState({
            openKey:key,
        })
        this.handleClickOpen();
    }
    render() {
        return (

            <div data-aos ="fade-in" data-aos-easing="linear" data-aos-duration="800" style = {{display: "flex", flexDirection: "column"}}>

                <Typography variant = "h1" style = {{margin: "16px auto"}}>{this.state.course}</Typography>
                    <Button
                        className="Calendar"
                        type="submit"
                        onClick={this.openCalendar}>
                        Meet Up
                    </Button>
                   <CalendarModal
                    isOpen={this.state.calendarIsOpen}
                    handleClose={this.openCalendar}
                   >

                   </CalendarModal>
                
                <div className = "flexCenter">
                    <Typography  variant = "h3">
                        <u>Questions</u>:
                    </Typography>

                    {this.state.questions.map((data, key) => {
                        return (

                            <Paper className = "flexCenter" style = {{margin: "10px auto", width: "65%", height: "10%"}} key={key}>
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
                            style = {{marginTop: "20px", width: "80%"}}
                        >
                        </TextField>
                        <br/>
                        <Button
                            type = "submit"
                            variant = "contained"
                            onClick = {this.createQuestion}
                            style = {{width: "80%"}}
                        >
                            Ask Away
                        </Button>
                </div>
               
                <Card className = "flexRow" style = {{margin: "10px auto", width: "65%", height: "500px"}} >
                    {console.log(this.state.userList)}
                    {
                         this.state.userList.map((data,key)=>{
                        return (
                                    <Button 
                                        key={key}
                                        onClick={this.handleClickOpen}
                                        > 
                                            {data}
                                        </Button>
                              
                                )
                                
                            })}
                            
                {console.log(this.state.openKey)}

                    {
                         this.state.userList.map((data,key)=>{
                        return (
                            <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            key={key}
                        >
                         <DialogTitle  id="alert-dialog-title">{this.state.userList[key]}</DialogTitle>
                             <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Let Google help apps determine location. This means sending anonymous location data to
                                  Google, even when no apps are running.
                                </DialogContentText>
                             </DialogContent>
                                
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">Close</Button> 
                            </DialogActions>
                        </Dialog>
                              
                                )
                                
                            })}
                                    {/* <Dialog
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                    >
                                     <DialogTitle id="alert-dialog-title">{this.state.userList[this.state.openKey]}</DialogTitle>
                                         <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                              Let Google help apps determine location. This means sending anonymous location data to
                                              Google, even when no apps are running.
                                            </DialogContentText>
                                         </DialogContent>
                                            
                                        <DialogActions>
                                            <Button onClick={this.handleClose} color="primary">Close</Button> 
                                        </DialogActions>
                                    </Dialog> */}
                            </Card>
                      
                  
            </div>
        )
    }
}

export default CoursePage;