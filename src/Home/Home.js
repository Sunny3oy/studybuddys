import React, { Component } from 'react';
import './Home.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

class Home extends Component { 
  render() {
    return (
      <div data-aos="" className="Home" style={{backgroundColor:'#F5F5F5'}}>
      {/* Insert StudyBuddy's Logo Somewhere */}
        <div className="signIn" 
             data-aos="fade-down"  
             data-aos-easing="linear" 
             data-aos-duration="500">
          <form>
            <Typography 
              component="h2" 
              variant="display2" 
              gutterBottom s
              tyle={{color:'black'}}
            >
              Sign In
            </Typography>
          
            <TextField
              className=""
              placeholder ="Enter Your Email"
            />
            <br/>

            <TextField
              style={{marginTop:'15px'}}
              placeholder ="Enter Your Password"
            />
            <br/>

            <Button
              type = 'submit'
              variant="outlined" 
              style = {{marginTop:'15px'}}
            >
              Sign In
            </Button>
          </form>

          < Button
            variant = "outlined" 
            style = {{marginTop:'15px'}}
          >
            <Link to = '/signup'>Sign Up</Link>
          </Button>
        </div>
      </div>

    );
  }
}

export default Home;