import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Navbar from "./Navbar";
import axios from 'axios';
import * as firebase from 'firebase';
import './Dashboard.css';
import './Browser.css';

class Browser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          school:'',
          subject:'',
          class:[],
          userClasses: [],
          loading: true,
        }
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

      componentDidMount(){
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
                                        <Typography variant ="headline">
                                          {data}
                                        </Typography >
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
