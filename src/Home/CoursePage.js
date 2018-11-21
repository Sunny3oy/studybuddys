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
import axios from 'axios';
import * as firebase from 'firebase';
import Navbar from "./Navbar";


class CoursePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            course: '',
            newQuestion: "",
            questions: [],
            response: {0: ["ASDSADASDA","asdad", "asdasda"], 1: ["ASDSADASDA", "jabababab"], 2: ["ASDSADASDA", "hhahahahah"], 3: ["ASDSADASDA", "O"], 4: ["ASDSADASDA", "M"], 5:["ASDSADASDA", "scoob", "G"]},
            people: ["Jack", "Andy", "Bob", "Pauline", "Luis", "Connie", "Sponge"]
        }
        this.handleChange = this.handleChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);   
        this.logout = this.logout.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
    }

    componentDidMount() {
        const { courseName } = this.props.match.params
        fetch(`/course/${courseName}`).then(this.setState({ course: courseName }));
        this.getUserName();
        this.getQuestions();
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

    getQuestions() {
        var course = {
            courseName: this.state.course
        };
        console.log("hi " + this.state.course)
        axios.post('https://triple-bonito-221722.appspot.com/api/getQuestions', course)
            .then(response => {
                this.setState({questions: response.data.questions})
                console.log(response.data);
            })
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
                page.setState({name : response.data.name})
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
                axios.post('https://triple-bonito-221722.appspot.com/api/createQuestion', question)
                console.log("course is " + course)
                console.log("question is: " + newQuestion)
                console.log(question)
            }
        })
        this.getQuestions();
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
                <div className = "flexCenter">
                    {this.state.questions.map((data, key) => {
                    return (
                        <ExpansionPanel key = {key} style = {{width: "70%"}}>
                            <ExpansionPanelSummary 
                                expandIcon={<ExpandMoreIcon/>} 
                                style = {{borderBottom: "1px solid black"}}
                            >
                                <Typography>
                                    {data}
                                </Typography>
                            </ExpansionPanelSummary>
                            {this.state.response[key].map((ans, index) => {
                                return (
                                    <ExpansionPanelDetails key = {index}>
                                        <Typography>
                                            {ans}
                                        </Typography>
                                    </ExpansionPanelDetails>
                                )
                            })}
                            <TextField variant = "filled" multiline = {true} label = "Answer" fullWidth></TextField>
                            <Button fullWidth = {true}>Submit</Button>
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