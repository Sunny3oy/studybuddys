import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import orange from '@material-ui/core/colors/orange';

const materialTheme = createMuiTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: orange.A200,
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
          color: orange.A700,
        },
        selected: {
          backgroundColor: orange['400'],
        },
        current: {
          color: orange['900'],
        },
      },
      MuiPickersModal: {
        dialogAction: {
          color: orange['400'],
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