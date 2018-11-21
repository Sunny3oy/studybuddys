import React, { PureComponent } from 'react';
import './Dashboard.css';
import Button from '@material-ui/core/Button';
import axios from 'axios'; // import axios library
import Navbar from "./Navbar";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import * as firebase from 'firebase';

class Dashboard extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         loggedIn:'true', // This is no longer necessary
         userClass: "",
      }
      this.logout = this.logout.bind(this);
      this.getUserName = this.getUserName.bind(this);
      this.getUserCourses = this.getUserCourses.bind(this);
      this.deleteUserCourses = this.deleteUserCourses.bind(this);
      this.checkLoggedIn = this.checkLoggedIn.bind(this);
   }

   logout(e){
      e.preventDefault();
      firebase.auth().signOut();
      this.props.history.push('/');
   }

   componentDidMount(){
      this.getUserName();
      this.getUserCourses();
      this.checkLoggedIn();
   }

   checkLoggedIn(){
     var prop = this.props;
     firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
           prop.history.push('/');
        }
     });
  }

   getUserName(e){
      var page = this;
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            var info = {
               id: user.uid
            }
            axios.post('https://triple-bonito-221722.appspot.com/api/getUsername', info)
            .then(response => {
               page.setState({name : response.data.name})
            })
         }
      });
   }

   getUserCourses(){
      var page = this;
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            var info = {
               id: user.uid
            }
            axios.post('https://triple-bonito-221722.appspot.com/api/getUserCourses', info).then(response => {
               console.log("res is: " + response.data.courseList[0]);
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
            axios.post('https://triple-bonito-221722.appspot.com/api/deleteUserCourses', info).then(
               page.getUserCourses
            )
         }
      });
   }

  render() {
        console.log(this.state.userClass);

    let classes = (
        <h2><br/><br/><br/><br/>You Haven't Selected a Class Yet! <br/><br/> Select a Class by Clicking on the Left Tab </h2>);
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
// need some help with this navbar in dashboard
    return (
      <div  data-aos="fade-down" data-aos-easing="linear" data-aos-duration="500" className="browserTitle">
      
        <div className="nav" role="navigation">
            <p>{this.state.name}</p>
          <Button onClick={this.logout}>Logout</Button>
            
        <Navbar/>
        </div>
     
    
        <h1 className = "dashSec" style={{marginLeft:'150px'}}> My Courses </h1>


        <div className="flexCenter" style={{marginTop:'50px'}}>
            {classes}
        </div>
    </div>


    )
  }
}

export default Dashboard;
