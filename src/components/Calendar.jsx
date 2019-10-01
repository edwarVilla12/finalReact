import React from "react";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  /* this function render all header of the calendar */
  renderHeader() {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long"
            }).format(this.state.currentMonth)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  /* 
    renderDays render dynamically the days of the week
  */
  renderDays() {
    const days = [];

    /*
      dayOfWeekAsString returns the a string(day of the week) 
      depending of a number 
    */
    function dayOfWeekAsString(dayIndex) {
      return [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ][dayIndex];
    }

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dayOfWeekAsString(i)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  /* 
    renderCells render all cells in the calendar
  */
  renderCells() {
    /* daysInMonth return a new date used to know the count of all days in that month */
    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    // addDays add days to a Date
    function addDays(date, days) {
      const copy = new Date(Number(date));
      copy.setDate(date.getDate() + days);
      return copy;
    }

    const dateS = this.state.currentMonth; // the current date

    // the first day of the current month
    const monthStart = new Date(dateS.getFullYear(), dateS.getMonth(), 1);

    // lastDay is the last day of the current month
    const monthEnd = new Date(
      dateS.getFullYear(),
      dateS.getMonth(),
      daysInMonth(dateS.getMonth() + 1, dateS.getFullYear())
    );
    //   startDate is the first starting date of the current month
    const startDate = new Date(
      monthStart.setDate(monthStart.getDate() - monthStart.getDay())
    );

    const endDate = new Date(
      monthEnd.setDate(monthEnd.getDate() - monthEnd.getDay() + 6)
    );

    const rows = []; // the array is going to fill the rows

    let days = []; // container of days to be render in the cells
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <div
            className={`col cell ${day % 7 === 0 ? "disabled" : ""}`}
            key={day}
          >
            <span className="number">
              {new Intl.DateTimeFormat("en-GB", {
                day: "2-digit"
              }).format(day)}
            </span>
          </div>
        );
        day = addDays(day, 1); // use of addDays function
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  // nextMonth obtain the next month depending of the currentMonth
  nextMonth = () => {
    const newMonth = new Date(
      this.state.currentMonth.setMonth(this.state.currentMonth.getMonth() + 1)
    );
    this.setState({
      currentMonth: newMonth
    });
  };

  // prevMonth obtain the previous month depending of the currentMonth
  prevMonth = () => {
    const lessMonth = new Date(
      this.state.currentMonth.setMonth(this.state.currentMonth.getMonth() - 1)
    );
    this.setState({
      currentMonth: lessMonth
    });
  };

  // render, renders last three functions into a calendar className
  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
