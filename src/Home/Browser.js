import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './Dashboard.css';

class Browser extends Component {
    state = {
        anchorEl: null,
      };
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    
      render() {
        const { anchorEl } = this.state;
    
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Select School
                </Button>
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
                    </form>
                
        
            </div>
        )
    }
}

export default Browser;