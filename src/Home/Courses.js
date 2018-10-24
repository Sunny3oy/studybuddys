import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }
    render() {
        return (
            <Card 
                raised = "true"
                style = {{width: "200px", height: "200px", display: "inline-block", margin: "40px 50px"}}
            >
                <CardContent >
                    <Typography 
                        align = "center" 
                        variant = "title" 
                        gutterBottom
                    >
                        Course Name
                    </Typography>
                    <Typography 
                        variant = "subtitle1" 
                        gutterBottom
                    >
                        Course Number
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default Courses;