import React, { Component } from 'react';
import {
    Typography,
} from '@material-ui/core';
import "./page.css";


class App extends Component {
  render() {
    return (
        <div className = "pika">
            <Typography className = "flexCenter" variant = "h1" style = {{ paddingTop: "4%"}}>
                Page Not Found
            </Typography>
        </div>
    );
  }
}

export default App;
