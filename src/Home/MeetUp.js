import React, { PureComponent } from 'react';
import {
    Typography,
    TextField,
    Button,
    Card
} from '@material-ui/core';
import { DateTimePicker } from 'material-ui-pickers';
import './CoursePage.css';
import axios from 'axios';
import * as firebase from 'firebase';
import "./Dashboard.css";
var moment = require('moment');

class MeetUp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            partner: this.props.partner,
            course: this.props.courseName,
            description: "",
            requestedTime: "",
            selectedDate: this.props.today,
        }
        this.createMeetUp = this.createMeetUp.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleTimeChange(date) {
        this.setState({
            selectedDate: date
        });
    }

    createMeetUp() {
        var momentDate = moment(this.state.selectedDate);
        var requestedDate = momentDate.month()+1 + "/" + momentDate.date() + "/" + momentDate.year();
        var requestedTime = momentDate.hours() + ":" + momentDate.minutes();
        var description = this.state.description;
        var partner = this.state.partner;
        var course = this.state.course;
        console.log(requestedDate)
        console.log(requestedTime)
        console.log(this.state.description)
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var info = {
                    id: user.uid,
                    date: requestedDate,
                    time: requestedTime,
                    text: description,
                    meetupsId: partner,
                    courseName: course,
                };
                axios.post('https://studybuddys-223920.appspot.com/api/createMeetUp', info)
                .then(alert("MeetUp Requested!"))
                console.log(info)
            }
        })
    }

    render() {
        return (
            <Card>
                <Typography className = "flexCenter" variant = "title">Let's Meet Up!</Typography>
                <div className = "flexCenter" style = {{marginTop: "16px"}}>
                    <DateTimePicker
                        value = {this.state.selectedDate}
                        disablePast
                        onChange = {this.handleTimeChange}
                        label = "Date & Time"
                        showTodayButton
                        style = {{width: "35%"}}
                    />
                    <TextField
                        onChange = {this.handleChange("description")}
                        label = "Description"
                        defaultValue = "Let's meet up to ..."
                        multiline = {true}
                        style = {{marginTop: "18px", width: "35%"}}
                    />
                    <Button style = {{width: "35%"}} onClick = {this.createMeetUp}>Send</Button>
                </div>
            </Card>
        )
    }
}

export default MeetUp;