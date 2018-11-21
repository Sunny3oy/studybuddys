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
        this.handleChange = this.handleChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);   
        this.logout = this.logout.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
    }

    componentDidMount() {
        const { courseName } = this.props.match.params
        fetch(`/course/${courseName}`).then(this.setState({course : courseName}));
        this.getQuestions(courseName);
        this.getUserName();
        
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
    
    // getReplies(course, question, creator) {
    //     var info = {
    //         id: "901232",
    //         courseName: course,
    //         questionText: question,
    //         useridQuestion: creator
    //     }
    //     console.log("INFO IS")
    //     console.log(info)
    //     axios.post('https://triple-bonito-221722.appspot.com/api/getReplies', info)
    //         .then(response => {
    //             console.log("yo")
    //             console.log(response.data.replies)
    //             this.setState({replies: response.data.replies})
    //             console.log(this.state.replies)
    //         })
    // }
    getReplies(ID){
        var questID = ID;
        var info={
            questionID: ID,
        }
        axios.post("https://triple-bonito-221722.appspot.com/api/MgetReplies",info)
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
        // var qID ="-LRrejiCSp3Z9vGvIzEK"
        var page = this;
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var info = {
                        id: user.uid,
                        replyText:replyT,
                        questionID : qID,
                    }
                    axios.post('https://triple-bonito-221722.appspot.com/api/MsubmitAnswer', info)
                }
                }); 
                console.log(this.state.replies);
        this.getReplies(qID);
    }
    
    // submitAnswer() {
    //     console.log(this.state.replyText)
    //     var reply = this.state.replyText;
    //     var questID = ;
    //     firebase.auth().onAuthStateChanged(function(user) {
    //         if (user) {
    //             var info = {
    //                 id: user.uid,
    //                 replyText: reply,
    //                 questionID: ,
    //             }
    //             axios.post('https://triple-bonito-221722.appspot.com/api/MsubmitAnswer', info)
    //         }
    //         });
    // }

    // getReplies() {
    //     var info = {
    //         questionID: ,
    //     }
    //     axios.post('https://triple-bonito-221722.appspot.com/api/MsgetReplies', info)
    //     .then( response => {
    //         this.setState({
    //             replies: response.data.replies
    //         })
    //     })
    // }

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
                axios.post('https://triple-bonito-221722.appspot.com/api/McreateQuestion', question)
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
                <div className = "flexCenter">
                    {this.state.questions.map((data, key) => {
                    return (
                        <ExpansionPanel onClick={ () => this.getReplies(this.state.questID[key],this.setState({currentID:this.state.questID[key]}))} key = {key} style = {{width: "70%"}} >
                            <ExpansionPanelSummary 
                                expandIcon={<ExpandMoreIcon/>} 
                                style = {{borderBottom: "1px solid black"}}
                            >
                                
                                <Typography>
                                    {data}
                                  
                                </Typography>
                                <hr/>
                                <Typography>
                                    Created By: {this.state.createdBy[key]}
                                </Typography>
                            </ExpansionPanelSummary>
                            
                            {console.log(this.state.replyText)}
                            {
                                this.state.replies.map((ans, index) => {
                                    return (
                                        <ExpansionPanelDetails key = {index}>
                                            <Typography>
                                                {ans}
                                            </Typography>
                                        </ExpansionPanelDetails>
                                    )
                                }
                           )}
                             
                                 <TextField 
                                     variant = "filled" 
                                     multiline = {true} 
                                     label = "Answer" 
                                     fullWidth 

                                     onChange= {                                         
                                         this.handleChange("replyText")
                                         
                                    
                                     }
                                >
                                {console.log(this.state.replyText) }
                                 </TextField>
                                 <Button type = "submit" onClick = {this.submitAnswer} fullWidth = {true}>Submit</Button>
                            
                        </ExpansionPanel>
                    )}
                )}
                </div>
                <div style = {{margin: "15px 0"}}>
                    <TextField 
                        variant = "outlined"
                        multiline = {true} 
                        label = "Ask a Question"
                        onChange = {this.handleChange("newQuestion")}
                    >
                    </TextField>
                    <br/>
                    <Button 
                        type = "submit" 
                        variant = "contained"
                        onClick = {this.createQuestion}
                        style = {{margin: "15px 0"}}
                    >
                        Ask Away
                    </Button>
                </div>
                {/* TO DO  <div>
                    {this.state.people.map((data, key) => {
                        return (
                            <Avatar key = {key} style = {{width: "60px", height: "60px", display: "flex", justifyContent: "center"}}>{data}</Avatar>
                        )
                    })}
                </div>    */}
               
            </div>
        )
    }
}
export default CoursePage;