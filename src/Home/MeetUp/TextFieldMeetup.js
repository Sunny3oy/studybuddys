import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});

function Inputs(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <TextField
          id="outlined-multiline-flexible"
          label="Description of Meeting"
          multiline
          rowsMax="4"
          // value={this.state.multiline}
          // onChange={this.handleChange('multiline')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
    </div>
  );
}

Inputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);