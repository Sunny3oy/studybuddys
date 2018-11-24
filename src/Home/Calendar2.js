import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';

const materialTheme = createMuiTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: amber.A200,
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          // backgroundColor: lightBlue.A200,
          // color: 'white',
        },
      },
      MuiPickersDay: {
        day: {
          color: amber.A700,
        },
        selected: {
          backgroundColor: amber['400'],
        },
        current: {
          color: amber['900'],
        },
      },
      MuiPickersModal: {
        dialogAction: {
          color: amber['400'],
        },
      },
    },
  });

export default class BasicDatePicker extends PureComponent {
  state = {
    selectedDate: '2018-11-21T00:00:00.000Z',
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
         <MuiThemeProvider theme={materialTheme}>
        <div className="picker">
          <DatePicker
            label="Choose a Meetup Date"
            showTodayButton
            maxDateMessage="Date must be less than today"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}