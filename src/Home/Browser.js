import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './Dashboard.css';
import './Browser.css';

class Browser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          school:'',
          subject:'',
          class:'',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    state = {
        anchorEl: null,
      };
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
      render() {
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
          const classes = [
            
            {
              value: 'Csc 103',
              label: 'Csc 103',
            },
            {
              value: 'Csc 104',
              label: 'Csc 104',
            },
            {
              value: 'Csc 211',
              label: 'Csc 211',
            },
            {
              value: 'Csc 212',
              label: 'Csc 212',
            },
            {
                value: 'Csc 220',
                label: 'Csc 220',
              },
            
            
          ];
        const { anchorEl } = this.state;

        console.log(this.state.school);
        console.log(this.state.subject);
        return (
            <div className="browserTitle"> 
                <div className = "flexRow">
                    <h1
                      style = {{color: "black", marginTop: "100px",fontSize:'60px',height:'15vh'}}
                      data-aos="fade-down"
                      data-aos-easing="linear" 
                      data-aos-duration="400">Select a Class
                    </h1>
                </div>

                <div  style = {{height:'65vh'}}>
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

                {subject.map(op=> tion (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                </TextField>: null

                 }
                 
                 <br/>

                 {
                    this.state.subject == 'Csc'?
                    <div className="flexRow" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="500">
                       <GridList  cols={3} padding={150} >

                {classes.map(option => (
            
                    <Card key={option.value} value={option.value} className ="flexRow" style={{width:'250px',height:'250px',margin:'10px 10px'}}>
                        <CardContent >
                            <Typography variant ="headline">
                            {option.label}
                            </Typography >
                        </CardContent>
                    </Card>
                   
                    
                ))}
                 </GridList>
                </div> : null

                 }

                
                </div>
              
            
            </div>
        )
    }
}

export default Browser;
