import React, { Component } from 'react';
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    TextField,
    Button,
    Avatar
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import * as firebase from 'firebase';


class CoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: "",
            newQuestion: "",
            questions: ["bloop1", "bloop2", "bloop3", "bloop4", "bloop5", "bloop6"],
            response: {0: ["ASDSADASDA","asdad", "asdasda"], 1: ["ASDSADASDA", "jabababab"], 2: ["ASDSADASDA", "hhahahahah"], 3: ["ASDSADASDA", "O"], 4: ["ASDSADASDA", "M"], 5:["ASDSADASDA", "scoob", "G"]},
            people: ["Jack", "Andy", "Bob", "Pauline", "Luis", "Connie", "Sponge"]
        }
        this.handleChange = this.handleChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
    }

    componentDidMount() {
        const { courseName } = this.props.match.params

        fetch(`/course/${courseName}`).then(this.setState({ course: courseName }))
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createQuestion() {
        firebase.auth().onAuthStateChanged(function(user){
            if(user) {
                var question = {
                    id: user.uid,
                    courseName: this.state.course,
                    userQuestion: this.state.newQuestion
                }
                axios.post('https://triple-bonito-221722.appspot.com/api/createQuestion', question)
                console.log(this.state.course)
                console.log(this.state.newQuestion)
            }
        })
    }

    render() {

        return (
            <div style = {{display: "flex", flexDirection: "column"}}>
                {<Typography variant = "h1" style = {{margin: "16px auto"}}>{this.state.course}</Typography>}
                <div className = "flexCenter">
                    {this.state.questions.map((data, key) => {
                    return (
                        <ExpansionPanel key = {key} style = {{width: "70%"}}>
                            <ExpansionPanelSummary 
                                expandIcon={<ExpandMoreIcon/>} 
                                style = {{borderBottom: "1px solid black"}}
                            >
                                <Typography>{data}</Typography>
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

                <div>
                    {this.state.people.map((data, key) => {
                        return (
                            <Avatar key = {key} style = {{width: "60px", height: "60px", display: "flex", justifyContent: "center"}}>{data}</Avatar>
                        )
                    })}
                </div>       
            </div>
        )
    }
}

export default CoursePage;