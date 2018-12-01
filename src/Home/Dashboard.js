import React, { PureComponent } from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';
import axios from 'axios'; // import axios library
// import Navbar from "./Navbar";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class Dashboard extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
        name: "",
        userClass: "",
      }
      this.getUserCourses = this.getUserCourses.bind(this);
      this.deleteUserCourses = this.deleteUserCourses.bind(this);
   }

   componentDidMount() {
      this.getUserCourses();
   }

   getUserCourses(){
      var page = this;
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            var info = {
               id: user.uid
            }
            axios.post('https://studybuddys-223920.appspot.com/api/getUserCourses', info).then(response => {
               if(response.data.courseList[0] === undefined) {
                  page.setState({userClass: ""})
               } else {
                  page.setState({
                     userClass: response.data,
                  })
               }
            })
         }
      });
   }

   deleteUserCourses(e) {
      e.preventDefault();
      var page = this;
      var course = e.currentTarget.value;
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            var info = { // JSON object to pass to the api call
               id: user.uid,
               courseName: course
            };
            axios.post('https://studybuddys-223920.appspot.com/api/deleteUserCourses', info).then(
               page.getUserCourses
            )
         }
      });
   }

    render() {

        var classes = (
            <h2><br/><br/><br/><br/>You Haven't Selected a Class Yet! <br/><br/> Select a Class by Clicking on the Left Tab </h2>);
        if(this.state.userClass !== ""){
            classes = (
                <div className="flexCenter">
                <GridList style={{marginLeft:'50px'}} cols={4} padding={150} >
                {this.state.userClass.courseList.map((data,key) => {
                    return (
                            <Card key = {key} value={data} className ="flexRow" style={{width:'250px',height:'250px',margin:'10px 10px'}}>
                                <CardContent>
                        
                                    <Link to = {"/courses/" + data}>
                                        <Typography variant ="headline">
                                            {data}
                                        </Typography >
                                    </Link>
                        
                                    <Button
                                        onClick={(e)=>this.deleteUserCourses(e)}
                                        value={data}
                                        type = "submit"
                                        variant = "outlined"
                                        style = {{marginTop:'15px'}}
                                    >
                                        Remove Course
                                    </Button>
                                </CardContent>
                            </Card>
                    )
                })}
                </GridList>
                </div>
            )
        }

        return (
            
            <div  data-aos="fade-down" data-aos-easing="linear" data-aos-duration="500" className="browserTitle">  
                <h1 className = "dashSec"> My Courses </h1>
                <div className="flexCenter" style={{marginTop:'50px'}}>
                    {classes}
                </div>
            </div>
        )
    }
}

export default Dashboard;
