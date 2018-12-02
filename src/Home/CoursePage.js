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
import CalendarModal from './MeetUp/CalendarModal'

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
            replyText:""
        }
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
    }

    componentDidMount() {
        const { courseName } = this.props.match.params
        fetch(`/courses/${courseName}`).then(this.setState({course : courseName}));
        this.getQuestions(courseName);
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

    render() {
        return (

            <div data-aos ="fade-in" data-aos-easing="linear" data-aos-duration="800" style = {{display: "flex", flexDirection: "column"}}>


            <div data-aos ="fade-in" data-aos-easing="linear" data-aos-duration="800" style = {{display: "block", flexDirection: "column"}}>
                <div>
                    <div style = {{float: "right", display: "inline-block"}}>
                        <span>{this.state.name}</span>
                    </div>
                </div>
<<<<<<< HEAD
                {<Typography variant = "h1" style = {{margin: "16px auto"}}>{this.state.course}</Typography>}
=======
                <Typography variant = "h1" style = {{margin: "16px auto"}}>{this.state.course}</Typography>

>>>>>>> 0324a08fa54715a8b6a2e962fc7c6819b498ecb1
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
                    <Typography gutterBottom = {true} variant = "h3">
                        <u>Questions</u>:
                    </Typography>

                    {this.state.questions.map((data, key) => {
                        return (

                            <Paper className = "flexCenter" style = {{margin: "10px auto", width: "65%", height: "10%"}}>
                                <Link to = {"/course/" + this.state.course + "/" + this.state.questID[key]}>
                                    <Typography style = {{marginTop: "15px"}} gutterBottom = {true} variant = "h5">

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
                            gutterBottom = {true}
                            variant = "contained"
                            onClick = {this.createQuestion}
                            style = {{width: "50%"}}
                        >
                            Ask Away
                        </Button>
                </div>
            </div>
        )
    }
}

export default CoursePage;