import React, { Component } from "react";
import "react-dates/initialize";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import moment from "moment";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import isInclusivelyAfterDay from "react-dates/src/utils/isInclusivelyAfterDay";

import "./DateInputComponent.css";

class DateInputComponent extends Component {
  state = {
    focused: false
  };

  onClickOutside = () => {
    // Force the focused states to always be truthy so that date is always selectable
    window.setTimeout(() => {
      this.setState({ focused: false });
    }, 100);
  };

  toggleController = () => {
    this.setState({ focused: !this.state.focused });
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <InputGroup>
            <FormControl
              type="text"
              value={moment(this.props.DateTime).format("DD MMMM YYYY")}
              className="job-detail-section--date-input"
              disabled={this.props.disabled}
              onChange={() => {}}
            />
            <InputGroup.Append>
              <Button
                variant="outline-success"
                onClick={this.toggleController}
                className="calendar-button"
                disabled={this.props.disabled}
              >
                <FontAwesomeIcon icon={faCalendarAlt} color="white" />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        {this.state.focused ? (
          <div style={{ zIndex: "100", position: "absolute" }}>
            <DayPickerSingleDateController
              date={moment(this.props.DateTime)}
              onDateChange={this.props.handleDateChange}
              onOutsideClick={this.onClickOutside}
              numberOfMonths={1}
              isOutsideRange={day => !isInclusivelyAfterDay(day, moment())}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default DateInputComponent;
