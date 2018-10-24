import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const styles = {
  list: {
    width: 250,
  }
};

class Navbar extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
            <ListItem button>
              <Link 
                to = "/dashboard" 
                style = {{textDecoration: "none", color: "black", width: "100%"}}
              >
                My Courses
              </Link>
            </ListItem>
            <ListItem button>
              <Link 
                to = "/dashboard/browse" 
                style = {{textDecoration: "none", color: "black", width: "100%"}}
              >
                Course Selection
              </Link>
            </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Button style={{float: "left"}} onClick={this.toggleDrawer('left', true)}>
          <Menu fontSize = "large"></Menu></Button>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
        
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);