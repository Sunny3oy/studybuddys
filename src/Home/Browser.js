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
        }
        this.handleChange = this.handleChange.bind(this);
        this.addCourseToUser = this.addCourseToUser.bind(this);
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

      getCourseName(e){
        axios.get('http://localhost:3001/api/getCourses')
        .then(response => {
            this.setState({class : response.data})
        })
    }

      addCourseToUser(e){
        e.preventDefault();
        const x = e.currentTarget.value
        console.log(x)
        var course = {   
          courseName: x,
        };  
        axios.post('http://localhost:3001/api/addCourses', course)
      }


    componentDidMount(){
      this.getCourseName();
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

          const subject = [
            {
                value: '',
                label: '',
            },
            {
              value: 'Art',
              label: 'Art',
            },
            {
              value: 'Bio',
              label: 'Bio',
            },
            {
              value: 'Csc',
              label: 'Csc',
            },
            {
              value: 'Eco',
              label: 'Eco',
            },
          ];
        const { anchorEl } = this.state;

        console.log(this.state.school);
        console.log(this.state.subject);
        console.log(this.state.class);
        console.log(this.state.userClasses);
        return (

            <div className="browserTitle">
             <Navbar />


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
                 {
                    this.state.school !== ''?
                    <TextField
                    select
                    label="Select"
                    value={this.state.subject}
                    onChange={this.handleChange('subject')}
                    helperText="Please select your Subject"
                    margin="normal"
                    variant="outlined"
                    data-aos="fade-left"
                    data-aos-easing="linear"
                    data-aos-duration="400">

                {subject.map(option=>(
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                </TextField>: null

                 }

                 <br/>

                 {
                    this.state.subject === 'Csc'?
                    <div className="flexRow" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="500">
                       <GridList  cols={3} padding={150} >
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
                </div> : null

                 }
                
                    </div>
                </div>

            </div>
        )
    }
}

export default Browser;
