import * as firebase from 'firebase';
import './Browser.css';
import './Dashboard.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Navbar from "./Navbar";
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


class Browser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          school:'',
          subject:'',
          class:[],
          userClasses: [],
          loading: true,
        }
        this.logout = this.logout.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addCourseToUser = this.addCourseToUser.bind(this);
        this.getCourseName = this.getCourseName.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
    }
    state = {
        anchorEl: null,
      };

      // handleClick = event => {
      //   this.setState({ anchorEl: event.currentTarget });
      // };

      handleClick(event) {
        this.setState({userClasses: event.target.value})
      }

      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      logout(e){
        e.preventDefault();
        firebase.auth().signOut();
        this.props.history.push('/');
      }

      componentDidMount(){
        this.getUserName();
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
       firebase.auth().onAuthStateChanged(function(user){
         if (user) {
           var info = {
             id: user.uid
           }
           axios.post('https://triple-bonito-221722.appspot.com/api/getUsername', info)
           .then(response =>{
             page.setState({name: response.data.name})
           })
         }
       });
     }

      getCourseName(e){
          console.log("Clicked");
          var info = { // JSON object to pass to the api call
              schoolName: this.state.school,
              subject: this.state.subject
          };
          axios.post('https://triple-bonito-221722.appspot.com/api/getCourses', info)
          .then(response => {
              console.log("Response: " + response.data.courseID);
              this.setState({class : response.data});
          })
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
               axios.post('https://triple-bonito-221722.appspot.com/api/addCourses', info)
            }
         });
      }

      render() {

        console.log(this.state.class)
        const schools = [
            {
                value: '',
                label: '',
            },
            {
              value: 'CUNY CCNY',
              label: 'The City College Of New York',
            },
            {
              value: 'CUNY Baruch',
              label: 'Baruch College',
            },
            {
              value: 'CUNY York',
              label: 'York College',
            },
            {
              value: 'CUNY Queens',
              label: 'Queens College',
            },
          ];

          // const subject = [
          //   {
          //       value: '',
          //       label: '',
          //   },
          //   {
          //     value: 'Art',
          //     label: 'Art',
          //   },
          //   {
          //     value: 'Bio',
          //     label: 'Bio',
          //   },
          //   {
          //     value: 'Csc',
          //     label: 'Csc',
          //   },
          //   {
          //     value: 'Eco',
          //     label: 'Eco',
          //   },
          // ];

        console.log(this.state.school);
        console.log(this.state.subject);
        console.log(this.state.class);
        console.log(this.state.userClasses);

          let loading = (null)
          if (this.state.loading === false) {
            loading = (<h1>Loading...</h1>)
          }

        return (

            <div className="browserTitle">
            <div className="nav">
             <Navbar />
                <div className="nav_b">
                <span>{this.state.name}</span>
                <Button onClick={this.logout} style={{color:'white'}}>Logout</Button>
                </div>
            </div>
                <div className = "flexCenter">
                    <h1
                      style = {{color: "black", marginTop: "100px",fontSize:'60px',height:'15vh'}}
                      data-aos="fade-down"
                      data-aos-easing="linear"
                      data-aos-duration="400"> Select a Class
                    </h1>


                <div style = {{height:'65vh'}}>
                <TextField
                    select
                    label="Select"
                    value={this.state.school}
                    onChange={this.handleChange('school')}
                    helperText="Please select your school"
                    margin="normal"
                    variant="outlined"
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="400">

                    {schools.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                          {option.label}
                      </MenuItem>
                    ))}
                </TextField>

                <br/>
                <div className="flexCenter">
                 {
                    this.state.school !== ''?
                      <TextField
                        required
                        label="Select"
                        value={this.state.subject}
                        onChange={this.handleChange('subject')}
                        helperText="Please select your Subject"
                        margin="normal"
                        variant="outlined"
                        data-aos="fade-left"
                        data-aos-easing="linear"
                        data-aos-duration="400"
                      >
                      </TextField>

                : null

                 }
                 </div>
                 {this.state.school !==''?
                    <Button
                        onClick={(this.getCourseName)}
                        type = 'submit'
                        >
                        Submit
                    </Button>:null

                 }
                 <br/>

                 {
                  this.state.class.courseID === undefined?
                     loading :
                    <div className="flexRow" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="500">
                       <GridList  cols={3} padding={150} >
                       {console.log("Course list: " + this.state.class.courseID)}
                         {this.state.class.courseID.map((data, key) => {
                          return(

                              <Card key = {key} value={data} className ="flexRow" style={{width:'250px',height:'250px',margin:'10px 10px'}}>
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
