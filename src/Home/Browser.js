import React, {PureComponent} from 'react';
import {
  Button,
  MenuItem,
  Typography,
  GridList,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';
import axios from 'axios';
import * as firebase from 'firebase';
import './Dashboard.css';
import './Browser.css';
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Navbar from "./Navbar";

class Browser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          selectedSchool:'',
          selectedSubject:'',
          class:[],
          name:"",
          userClasses: [],
          loading: true,
          allSubject:[],
          schools: [
            {
              value: 'CTY01',
              label: 'The City College Of New York',
            },
            {
              value: 'BAR01',
              label: 'Baruch College',
            },
            {
              value: 'BCC01',
              label: 'Bronx Community College',
            },
            {
              value: 'BKL01',
              label: 'Brooklyn College',
            },
            {
              value: 'BMC01',
              label: 'Borough of Manhattan Community College',
            },
            {
              value: 'CSI01',
              label: 'College of Staten Island',
            },
            {
              value: 'HTR01',
              label: 'Hunter College',
            },
            {
              value: 'JJC01',
              label: 'John Jay College of Criminal Justice',
            },
            {
              value: 'LEH01',
              label: 'Lehman College',
            },
            {
              value: 'NYT01',
              label: 'New York City College of Technology',
            },
            {
              value: 'QCC01',
              label: 'Queensborough Community College',
            },
            {
              value: 'QNS01',
              label: 'Queens College',
            },
            {
              value: 'YRK01',
              label: 'York College',
            }
          ],
        }
        this.handleChange = this.handleChange.bind(this);
        this.addCourseToUser = this.addCourseToUser.bind(this);
        this.getCourseName = this.getCourseName.bind(this);
        this.authen = this.authen.bind(this);
        this.getSubjects = this.getSubjects.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.logout = this.logout.bind(this);
    }

      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        }, () => {this.getSubjects()});
      };

      componentDidMount(){
        this.authen();
        this.getUserName();
      }

      authen() {
        var thisPage = this.props;
        firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
           thisPage.history.push("/");
        }
        });
      }

    logout(e) {
        e.preventDefault();
        firebase.auth().signOut();
        this.props.history.push("/");
    }

     getUserName(e){
      var page = this;
      firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
            var info = {
               id: user.uid
            }
            axios.post('https://studybuddys-223920.appspot.com/api/getUsername', info)
            .then(response => {
               page.setState({name : response.data.name})
            })
         }
      });
   }
      getCourseName(){
        var info = { // JSON object to pass to the api call
          collegeName: this.state.selectedSchool,
          subjectName: this.state.selectedSubject
        };
        axios.post('https://studybuddys-223920.appspot.com/api/getSections', info)
        .then(response => {
            this.setState({ class: response.data });
          }
        )
        this.setState({loading: false});
      }

      addCourseToUser(e){
         e.preventDefault();
         var course = e.currentTarget.value;
         firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
               var info = {
                  id: user.uid,
                  courseName: course
               };
               axios.post('https://studybuddys-223920.appspot.com/api/addCourses', info)
               alert("Class Added!");
            }
         });
      }

      getSubjects(){
        var schoolValue = this.state.selectedSchool;
        var info ={
          collegeName: schoolValue
        }
        axios.post('https://studybuddys-223920.appspot.com/api/getSubjects',info).then(response => {
          this.setState({
            allSubject:response.data.subjects,
          })
        })
      }

      render() {
        let loading = (null)
        if (this.state.loading === false) {
          loading = (<h1>Loading...</h1>)
        }

        return (
          

            <div className="browserTitle">
            <div className = "nav">
              <Navbar/>
              <div className = "flexRow" style = {{marginLeft: "auto"}}>
                <span
                  style = {{fontSize: "22px", marginRight: "10px"}}
                >
                  <Link
                    to = "/dashboard/profile"
                    style = {{color: "white"}}
                  >
                    {this.state.name}
                  </Link>
                </span>
                <Button
                  onClick={this.logout}
                  style = {{color:'white', fontSize: "17px"}}
                >
                  Logout
                </Button>
              </div>
            </div>

              <div className = "flexCenter">
                  <h1
                    style = {{color: "black", marginTop: "100px",fontSize:'60px',height:'15vh'}}
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="400"
                  >
                    Select a Class
                  </h1>


                <div style = {{height:'65vh'}}>
                  {/* mapping the schools */}
                  <InputLabel>
                    Select School
                    <Select
                      input={<Input name="school" id="SelectSchool"/>}
                      onChange = {this.handleChange('selectedSchool')}
                      value = {this.state.selectedSchool}
                      style = {{width:'300px'}}
                    >
                      {this.state.schools.map((data, key) => {
                        return (
                          <MenuItem
                          key = {key}
                          value = {data.value}>
                            {data.label}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </InputLabel>
                <br/>

                {/* mapping the subjects, only if a school was selected */}

                <div className="flexCenter">
                  {

                    this.state.selectedSchool !== ''?
                    <InputLabel htmlFor="SelectSubject">
                      Select Subject
                      <Select
                        input={<Input name="subject" id="SelectSubject"/>}
                        value={this.state.selectedSubject}
                        onChange={this.handleChange('selectedSubject')}
                        style={{width:'300px'}}
                      >

                        {this.state.allSubject.map((option,key) => {
                          return (
                            <MenuItem
                              key={key}
                              value={option}
                            >
                                {option}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </InputLabel>
                    : null
                  }

                </div>
                  {this.state.selectedSubject !==''?
                    <Button
                      data-aos="fade-down"
                      data-aos-easing="linear"
                      data-aos-duration="400"
                      onClick={(this.getCourseName)}
                      type = 'submit'
                    >
                      Submit
                    </Button>:null

                  }
                <br/>

                {
                  this.state.class.sections === undefined?
                     loading :
                    <div className = "flexRow" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="500">
                      <GridList className = "flexRow" cols={4}>
                         {this.state.class.sections.map((data, key) => {
                          return(
                              <Card
                                key = {key}
                                value={data}
                                className ="flexCenter"
                                style={{width:'250px',height:'250px',margin:'10px 10px'}}
                              >
                                <form key = {key}>
                                  <CardContent>
                                    <Link to = {"/course/" + data}>
                                      <Typography variant ="headline">
                                          {data}
                                      </Typography >
                                    </Link>
                                    <Typography variant ="headline">
                                      <Button
                                        onClick={(e)=>this.addCourseToUser(e)}
                                        value={data}
                                        type = "submit"
                                        variant = "outlined"
                                        style = {{marginTop:'15px'}}
                                      >
                                        Add Course
                                      </Button>
                                    </Typography >
                                  </CardContent>
                                </form>
                              </Card>
                            )
                          })}

                      </GridList>
                    </div>

                  }
                </div>
              </div>
            </div>
        )
    }
}

export default Browser;
