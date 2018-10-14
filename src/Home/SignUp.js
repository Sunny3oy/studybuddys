import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const SignUp = () => {
    return (
        <div data-aos = "" className = "Home" style = {{backgroundColor:'#F5F5F5'}}>
            <div className="signIn" 
                data-aos="fade-down"  
                data-aos-easing="linear" 
                data-aos-duration="500">
            <Typography component="h2" variant="display2" gutterBottom style={{color:'black'}}>
                Sign Up To Be A Buddy Today
            </Typography>
                <form>
                    < TextField
                        className = ""
                        placeholder = "First Name" 
                        name = 'fName' 
                    />

                    <br/>

                    < TextField
                        className = ""
                        placeholder = "Last Name" 
                        style = {{marginTop:'15px'}}
                        name = 'lName' 
                    />

                    <br/>

                    < TextField
                        className = ""
                        type = 'email'
                        placeholder = "Email Address" 
                        style = {{marginTop:'15px'}} 
                        name = 'eAddress' 
                    />

                    <br/>

                    < TextField
                        className = ""
                        placeholder = "Password" 
                        style = {{marginTop:'15px'}}
                        name = 'password'
                    />

                    <br/>

                    < TextField
                        className = ""
                        placeholder = "Enter Your Password Again" 
                        style = {{marginTop:'15px'}} 
                    />

                    <br/>

                    <Button
                        type = 'submit'
                        variant = "outlined"
                        style = {{marginTop:'15px'}}
                    >
                        Sign Me Up
                    </Button>

                </form>

                <Button
                    type = 'submit'
                    variant = "outlined"
                    style = {{marginTop:'15px'}}
                >
                   <Link to = '/'>Sign In Instead</Link> 
                </Button>
            </div>
        </div>
    );
}

export default SignUp;