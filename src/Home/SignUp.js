import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import './Home.css';
import * as firebase from 'firebase';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            checkPassword:''

        }
        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    createUser(e){
      e.preventDefault();
      var userName = this.state.name;
      var userEmail = this.state.email;
      var prop = this.props;
      if(this.state.checkPassword === this.state.password){
         firebase.auth().createUserWithEmailAndPassword(userEmail, this.state.password)
         .then(function(){
            var user = firebase.auth().currentUser;
            firebase.database().ref('users/' + user.uid).set({
               email: userEmail,
               name : userName,
               courseList: ""
            })
            .then(function(){
               prop.history.push('/dashboard');
            })
            .catch(function (error) {
               alert(error.message);
            });
         })
         .catch(function (error) {
            alert(error.message);
         });
      }
      else{
         alert("Passwords do not match");
      }
    }

    render() {
        return (
            <div data-aos = "" className = "Home">
                <Card
                    raised = {true}
                    className = "signUp"
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="500">
                <Typography
                    component="h2"
                    variant="display2"
                    gutterBottom = {true}
                    style={{color:'black'}}
                >
                    Sign Up
                </Typography>
                    <form>
                        < TextField className = ""
                            placeholder = "Full Name"
                            onChange={this.handleChange('name')}
                            />

                        <br/>

                        < TextField
                            className = ""
                            type = 'email'
                            placeholder = "Email Address"
                            style = {{marginTop:'15px'}}
                            onChange={this.handleChange('email')}
                        />

                        <br/>

                        < TextField
                            type = "password"
                            className = ""
                            placeholder = "Password"
                            style = {{marginTop:'15px'}}
                            onChange={this.handleChange('password')}
                        />

                        <br/>

                        < TextField
                            type = "password"
                            className = ""
                            placeholder = "Confirm Password"
                            style = {{marginTop:'15px'}}
                            onChange={this.handleChange('checkPassword')}
                        />

                        <br/>

                        <Button
                            onClick={this.createUser}
                            type = 'submit'
                            variant = "outlined"
                            style = {{marginTop:'15px'}}
                        >
                            Sign Me Up
                        </Button>

                    </form>

                    <Link
                        to = '/'
                        variant = "outlined"
                        style = {{marginTop:'15px'}}
                    >
                        Have an account? Log In Here
                    </Link>
                </Card>
            </div>
        );
    }
}

export default SignUp;
