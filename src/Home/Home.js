import React, { Component } from 'react';
import './Home.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import axios from 'axios'; // import axios library
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
       user:{},
       email:'',
       password:''

    }
    this.checkIfUser = this.checkIfUser.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.login = this.login.bind(this);
}

  handleChange = name => event => {
  this.setState({
      [name]: event.target.value
  });
  }

  checkIfUser(e){
      axios.get('http://localhost:3001/api/checkLoggedIn')
      .then(response => {
          if(response.data.loggedIn){
              this.props.history.push('/dashboard');
          }
      })
  }


  login(e){
    e.preventDefault();
    var info = { // JSON object to pass to the api call
        email: this.state.email,
        password: this.state.password
    };
    axios.post('http://localhost:3001/api/logIn', info) // URL of api call and object being passed to it
    .then(response => {
        // This simply creates an alert saying successfully logged in and the user ID.
        // Should route to different page such as homepage
        this.props.history.push('/dashboard');
    })
    .catch(error => {
        alert(error.response.data.message); // alert to display error
    });
  }

  render() {

    return (
      <div data-aos="" className="Home" style={{backgroundColor:'#F5F5F5'}}>
      {this.checkIfUser()} {/* Check if user is logged in. If not redirect to login page */}
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


          <Link to = '/signup'>
            <Button
              type = 'submit'
              variant = "outlined"
              style = {{marginTop:'15px'}}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

    );
  }
}

export default Home;
