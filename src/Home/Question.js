import React, { PureComponent } from 'react';
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    TextField,
    Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './CoursePage.css';
import axios from 'axios';
import * as firebase from 'firebase';
import Navbar from "./Navbar";
import Calendar from "./Calendar2";
// import Calendar from 'rc-calendar';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

class Question extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            course: '',
            newQuestion: "",
            questID: [],
            questions: [],
            createdBy: [],
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
    }
    componentDidMount() {
        const { courseName } = this.props.match.params
        fetch(`/course/${courseName}`).then(this.setState({course : courseName}));
        this.getQuestions(courseName);
        this.getUserName();
        this.getReplies();
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
        console.log(this.state.replyText)
        var reply = this.state.replyText;
        // var questID = ;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    replyText: reply,
                    // questionID: ,
                }
                axios.post('https://triple-bonito-221722.appspot.com/api/MsubmitAnswer', info)
            }
            });
    }
    getReplies() {
        var info = {
            // questionID: ,
        }
        axios.post('https://triple-bonito-221722.appspot.com/api/MsgetReplies', info)
        .then( response => {
            this.setState({
                replies: response.data.replies
            })
        })
    }
    getQuestions(courseNum) {
        var course = {
            courseName: courseNum
        };
        axios.post('https://triple-bonito-221722.appspot.com/api/MgetQuestions', course)
            .then(response => {
                this.setState({
                    questID: response.data.ids,
                    questions: response.data.questions, 
                    createdBy: response.data.names})
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
             {<Typography variant = "h1" style = {{margin: "16px auto"}}>{this.state.course}</Typography>}
                 <Button 
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
             }
            </div>
         )   
        }
        
    }

export default Question;