import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './Dashboard.css';

class Browser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          school:''
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

        const { anchorEl } = this.state;
    
        return (
            <div className="browserTitle"> 
                <div className = "flexRow">
                    <h1
                      style = {{color: "black", marginTop: "100px",fontSize:'60px',height:'20vh'}}>Select a Class
                    </h1>
                </div>

                <div style = {{height:'80vh'}}>
                <TextField
                    select
                    label="Select"
                    value={this.state.school}
                    onChange={this.handleChange('school')}
                    helperText="Please select your school"
                    margin="normal"
                    variant="outlined"
        >
          {schools.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>



                {/* <TextField
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    variant="outlined"
                >
                    Select School
                </TextField>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    
                >
                    <MenuItem onClick={this.handleClose}>School Name</MenuItem>
                    <MenuItem onClick={this.handleClose}>School Name</MenuItem>
                    <MenuItem onClick={this.handleClose}>School Name</MenuItem>
                </Menu>
                <br/>
                    <form class="form-inline">
                    <input class="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search </button>
                    </form>  */}
                </div>
              
                
        
            </div>
        )
    }
}

export default Browser;