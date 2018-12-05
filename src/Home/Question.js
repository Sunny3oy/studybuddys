import React, { PureComponent } from 'react';
import {
    Typography,
    Paper,
    TextField,
    Button,
} from '@material-ui/core';
import axios from 'axios';
import * as firebase from 'firebase';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';


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
        this.handleChange = this.handleChange.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.getReplies = this.getReplies.bind(this);
        this.authen = this.authen.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
      this.getUserName();  
      this.authen();
        const { courseName } = this.props.match.params;
        const { questionID } = this.props.match.params;
        fetch(`/course/${courseName}?/${questionID}?`)
            .then(
                this.setState({
                    course : courseName,
                    questID: questionID
                }, this.getQuestion, this.getReplies)
            )
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitAnswer() {
        var page = this;
        var reply = this.state.replyText;
        var questID = this.state.questID;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    replyText: reply,
                    questionID: questID,
                }
                axios.post('https://studybuddys-223920.appspot.com/api/submitAnswer', info)
                .then(page.getReplies)
            }
        });
    }

    authen() {
        var thisPage = this.props;
        firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
           thisPage.history.push("/");
        }
        });
      }

    logout(e) {
        e.preventDefault();
        firebase.auth().signOut();
        this.props.history.push("/");
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

    getReplies() {
        var info = {
            questionID: this.state.questID,
        }
        axios.post('https://studybuddys-223920.appspot.com/api/getReplies', info)
        .then(response => {
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
        axios.post('https://studybuddys-223920.appspot.com/api/getSingleQuestion', questID)
            .then(response => {
                this.setState({
                    question: response.data.question,
                    createdBy: response.data.name
                })
            })
        this.getReplies();
    }


    render() {
        return (           
            <div data-aos ="fade-in" data-aos-easing="linear" data-aos-duration="800">
            <div className = "nav">
              <Navbar/>
              <div className = "flexRow" style = {{marginLeft: "auto"}}>
                <span
                  style = {{fontSize: "22px", marginRight: "10px"}}
                >
                  <Link
                    to = "/dashboard/profile"
                    style = {{color: "white"}}
                  >
                    {this.state.name}
                  </Link>
                </span>
                <Button
                  onClick={this.logout}
                  style = {{color:'white', fontSize: "17px"}}
                >
                  Logout
                </Button>
              </div>
            </div>
                <br></br>
                <Typography variant = "h2" style = {{margin: "16px auto"}}><strong>{this.state.question}</strong></Typography>
                <Typography variant = "h6" style = {{margin: "0px auto"}}><em>Created By: {this.state.createdBy}</em></Typography>
                <div className = "flexCenter" style={{margin:"30px",backgroundColor: "#ffffff",border:"1px solid black", padding:"20px", borderRadius:"10px", boxShadow:"5px 5px 5px 5px #777777", MozBoxShadow:"0 0 10px #777777",WebkitBoxShadow:"0 0 10px #777777"}}>
                    {this.state.replies.map((data, key) => {
                        return (
                            <Paper key = {key} className = "flexCenter" style = {{margin: "10px auto", width: "65%", height: "10%"}}>
                                <Typography variant = "subtitle1">
                                    <em>{data}</em>
                                </Typography>
                                <Typography variant = "subtitle1">
                                    <em>Answered By: {this.state.replier[key]}</em>
                                </Typography>
                            </Paper>
                        )
                    })}
                    <TextField
                        variant = "outlined"
                        multiline = {true}
                        label = "Answer"
                        style = {{ width: "50%",marginTop:'15px'}}
                        onChange= {
                            this.handleChange("replyText")
                        }
                    >
                    </TextField>
                    <Button
                    type = "submit"
                    variant = "contained"
                    onClick = {this.submitAnswer}
                    style = {{width: "50%",marginTop:'15px'}}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}

export default Question;
