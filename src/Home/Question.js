import React, { PureComponent } from 'react';
import {
    Typography,
    Paper,
    TextField,
    Button,
} from '@material-ui/core';
import './CoursePage.css';
import axios from 'axios';
import * as firebase from 'firebase';
import Navbar from "./Navbar";
// import Calendar from "./Calendar2";
// import Calendar from 'rc-calendar';
// import LuxonUtils from '@date-io/luxon';
// import { MuiPickersUtilsProvider } from 'material-ui-pickers';

class Question extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            course: '',
            questID: "",
            question: "",
            createdBy: "",
            replyText: "",
            replies: [],
            replier: [],
        }
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
    }
    componentDidMount() {
        this.checkLoggedIn();
        const { courseName } = this.props.match.params;
        const { questionID } = this.props.match.params;
        fetch(`/course/${courseName}?/${questionID}?`)
            .then(
                this.setState({
                    course : courseName, 
                    questID: questionID
                })
            )
            .then (
                this.getQuestion,
                this.getReplies(questionID)
            )
        this.getUserName();
        
    }

    checkLoggedIn(){
        var prop = this.props;
        firebase.auth().onAuthStateChanged(function(user) {
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
    
    logout(e){
        e.preventDefault();
        firebase.auth().signOut();
        this.props.history.push('/');
    }
    getUserName(e){
        var page = this;
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var info = {
                id: user.uid
            }
            axios.post('https://triple-bonito-221722.appspot.com/api/getUsername', info)
            .then(response => {
                page.setState({name: response.data.name})
            })
        }
        });
    }

    submitAnswer() {
        var reply = this.state.replyText;
        var questID = this.state.questID;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    replyText: reply,
                    questionID: questID,
                }
                axios.post('https://triple-bonito-221722.appspot.com/api/submitAnswer', info)
            }
        });
        this.getReplies(questID);
    }
    
    getReplies(ID) {
        var info = {
            questionID: ID,
        }
        axios.post('https://triple-bonito-221722.appspot.com/api/getReplies', info)
        .then( response => {
            this.setState({
                replies: response.data.replies,
                replier: response.data.names
            })
        })
    }
    getQuestion() {
        var questID = {
            courseName: this.state.course,
            questionID: this.state.questID
        };
        axios.post('https://triple-bonito-221722.appspot.com/api/getSingleQuestion', questID)
            .then(response => {
                console.log(response.data)
                this.setState({
                    question: response.data.question,
                    createdBy: response.data.name
                })
            })
            
    }
    

    render() {
        return (
            <div data-aos ="fade-in" data-aos-easing="linear" data-aos-duration="800" style = {{display: "flex", flexDirection: "column"}}>
                <div>
                    <div style = {{float: "right", display: "inline-block"}}>
                        <span>{this.state.name}</span>
                        <Button onClick={this.logout}>Logout</Button>
                    </div>
                    <Navbar/>
                </div>
                    {/* <Button 
                        className="Calendar"
                        type="submit"
                        onClick={this.openCalendar}>
                        Meet Up
                    </Button>
                {
                    this.state.calendarIsOpen
                    ?
                    <MuiPickersUtilsProvider 
                        utils={LuxonUtils}>
                        <Calendar />
                    </MuiPickersUtilsProvider>
                    : null
                } */}

                <Typography variant = "h1" style = {{margin: "16px auto"}}><strong>{this.state.question}</strong></Typography>
                <Typography variant = "h6" style = {{margin: "0px auto"}}><em>Created By: {this.state.createdBy}</em></Typography>
                <div className = "flexCenter">
                    {this.state.replies.map((data, key) => {
                        return (
                            <Paper className = "flexCenter" style = {{margin: "10px auto", width: "65%", height: "10%"}}>
                                <Typography gutterBottom = {true} variant = "subtitle">
                                    <em>{data}</em>
                                </Typography>
                                <Typography variant = "subtitle">
                                    <em>Answered By: {this.state.replier[key]}</em>
                                </Typography>
                            </Paper>
                        )
                    })}
                    <TextField 
                        variant = "filled" 
                        multiline = {true} 
                        label = "Answer" 
                        style = {{marginTop: "20px", width: "80%"}}
                        onChange= {                                         
                            this.handleChange("replyText")         
                        }
                    >
                    {console.log(this.state.replyText) }
                    </TextField>
                    <Button type = "submit" onClick = {this.submitAnswer} style = {{width: "80%"}}>Submit</Button>
                </div>
            </div>
         )   
        }
        
    }

export default Question;