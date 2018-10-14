import React, { Component } from 'react';
import './Home.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Home extends Component {
  render() {
    return (
      <div data-aos="" className="Home" style={{backgroundColor:'#F5F5F5'}}>
      {/* Insert StudyBuddy's Logo Somewhere */}
        <div className="signIn" 
             data-aos="fade-down"  
             data-aos-easing="linear" 
             data-aos-duration="500">
             
        <Typography component="h2" variant="display2" gutterBottom style={{color:'black'}}>
          Sign In
        </Typography>
        
        <TextField
        className=""
        placeholder ="Enter Your Username"
        />
            <br/>

        <TextField
            style={{marginTop:'15px'}}
            placeholder ="Enter Your Password"
        />
            <br/>

        <Button
            
            variant="outlined"
        >
        Sign In
        </Button>
       

       
        </div>
      </div>
    );
  }
}

export default Home;