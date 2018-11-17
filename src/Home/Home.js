import React, { Component } from 'react';
import './Home.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios'; // import axios library
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
       email:'',
       password:''

    }
   this.handleChange = this.handleChange.bind(this);
   this.login = this.login.bind(this);
}

  handleChange = name => event => {
  this.setState({
      [name]: event.target.value
  });
  }

  login(e){
     e.preventDefault();
     var prop = this.props;
     firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
     .then(function(){
        prop.history.push('/dashboard');
     })
     .catch(function(error) {
        alert(error.message);
     });
  }

  render() {

    return (
      <div data-aos="" className="Home">
        {/* Insert StudyBuddy's Logo Somewhere */}

        <Typography
          variant = "display4"
          data-aos = "fade-down"
          data-aos-easing = "linear"
          data-aos-duration = "500"
          style = {{color: "white", textShadow: "0 0 10px black", marginBottom: "20px"}}
        >
          Study Buddy's
        </Typography>

        <Card
          raised = {true}
          className = "signIn"
          data-aos = "fade-down"
          data-aos-easing = "linear"
          data-aos-duration = "500"
        >

          <form>
            <Typography
              component="h2"
              variant="display2"
              gutterBottom = {true}
              style={{color:'black'}}
            >
              Sign In
            </Typography>

            <TextField
              type = "email"
              className=""
              placeholder ="Enter Your Email"
              onChange={this.handleChange('email')}
            />
            <br/>

            <TextField
              type = "password"
              style={{marginTop:'15px'}}
              placeholder ="Enter Your Password"
              onChange={this.handleChange('password')}
            />
            <br/>

            <Button
              onClick={this.login}
              type = 'submit'
              variant="outlined"
              style = {{marginTop:'15px'}}
            >
              Sign In
            </Button>

          </form>


          <Link
            to = '/signup'
            variant = "outlined"
            style = {{marginTop:'14px'}}
          >
              Don't have an account? Sign Up Here
          </Link>
        </Card>
      </div>

    );
  }
}

export default Home;
