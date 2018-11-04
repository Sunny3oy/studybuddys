import React, { Component } from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import axios from 'axios'; // import axios library
import Courses from "./Courses";
import Navbar from "./Navbar";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn:'true', // This is no longer necessary
            userClass: "",
        }
        this.logout = this.logout.bind(this);
        this.checkIfUser = this.checkIfUser.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getUserCourses = this.getUserCourses.bind(this);
    }

    logout(e){
        e.preventDefault();
        axios.get('http://localhost:3001/api/logout');
        this.props.history.push('/');
    }

    componentDidMount(){
        this.checkIfUser();
        this.getUserName();
        this.getUserCourses();
    }

    getUserName(e){
        axios.get('http://localhost:3001/api/getUsername')
        .then(response => {
            this.setState({name : response.data.name})
        })
    }

    checkIfUser(e){
        axios.get('http://localhost:3001/api/checkLoggedIn')
        .then(response => {
            if(!(response.data.loggedIn)){
                this.props.history.push('/');
            }
        })
    }

    getUserCourses(){
        axios.get('http://localhost:3001/api/getUserCourses').then(response=>{
            console.log("res is: " + response.data.courseList[0]);
            if(response.data.courseList[0] === undefined) {
                this.setState({userClass: ""})
            } else {
                this.setState({
                    userClass: response.data,
                })
            }
        })
    }

  render() {
        console.log(this.state.userClass);

    let classes = (
        <h1>You Haven't Selected a Class Yet! <br/> <br/> Select a Class by Clicking on the Left Tab </h1>);
    if(this.state.userClass !== ""){
        classes = (
            <div className="flexRow">
              <GridList style={{marginLeft:'50px'}} cols={4} padding={150} >
               {this.state.userClass.courseList.map((data,key) => {
                   return (
                        <Card key = {key} value={data} className ="flexRow" style={{width:'250px',height:'250px',margin:'10px 10px'}}>
                            <CardContent>
                                <Typography variant ="headline">
                                    {data}
                                </Typography >
                            </CardContent>                        
                        </Card>
                   )
               })}
               </GridList>
            </div>
        )
    }

    return (
      <div  data-aos="fade-down" data-aos-easing="linear" data-aos-duration="600" style = {{height: "100vh", backgroundImage: "linear-gradient(to right top, #e00a0a, #e44900, #e66b00, #e58800, #e4a300)"}}>  
        <div style = {{float: "right", display: "inline-block"}}>
            <span>{this.state.name}</span>
          <Button onClick={this.logout}>Logout</Button>  
        </div> 
       
       <Navbar/>

        <h1 className = "dashSec" style={{marginLeft:'150px'}}> My Courses </h1>

       
        <div className="flexCenter" style={{marginTop:'50px'}}>
            {classes}
        </div>
    </div>
      
     
    )
  }
}

export default Dashboard;
