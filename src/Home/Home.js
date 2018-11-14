import React, { Component } from 'react';
import './Home.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
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

  componentDidMount(){
      this.checkIfUser();
  }

  login(e){
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(function(err) {
      alert(err)
    });
    this.props.history.push('/dashboard');
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
          raised = 'true'
          className = "signIn"
          data-aos = "fade-down"
          data-aos-easing = "linear"
          data-aos-duration = "500"
        >

          <form>
            <Typography
              component="h2"
              variant="display2"
              gutterBottom = "true"
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
