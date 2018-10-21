import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Home.css';
import * as firebase from 'firebase';
import axios from 'axios'; // import axios library
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',

        }
        this.checkIfUser = this.checkIfUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);
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

    createUser(e){
        e.preventDefault();
        var info = { // JSON object to pass to the api call
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        };
        axios.post('http://localhost:3001/api/signUp', info) // URL of api call and object being passed to it
        .then(response => {
            // This simply creates an alert saying successfully created.
            // Should route to different page such as homepage
            this.props.history.push('/dashboard');
        })
        .catch(error => {
            alert(error.response.data.message); // alert to display error
        });
    }

    render() {
       console.log(this.state.name);
       console.log(this.state.email);
       console.log(this.state.name);
        return (
            <div data-aos = "" className = "Home" style = {{backgroundColor:'#F5F5F5'}}>
            {this.checkIfUser()} {/* Check if user is logged in. If not redirect to login page */}
                <div className="signIn"
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="500">
                <Typography component="h2" variant="display2" gutterBottom style={{color:'black'}}>
                    Sign Up To Be A Buddy Today
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
                        />

                        <br/>

                        <Button
                            onClick={this.createUser}
                            type = 'submit'
                            variant = "outlined"
                            style = {{marginTop:'15px'}}
                        >
                            Sign Me Up!
                        </Button>

                    </form>

                    <Link to = '/'>
                        <Button
                            type = 'submit'
                            variant = "outlined"
                            style = {{marginTop:'15px'}}
                        >
                            Sign In Instead
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SignUp;
