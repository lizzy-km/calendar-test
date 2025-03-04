import React, { useState } from "react";
import { Calendar } from "antd";

import CalendarModel from "./components/CalendarModel";
import { CheckIsDateEqual } from "./hooks/calendar/EventDateIsInDateCell";

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarApp = () => {
  // let currDate =false

  const [openResponsive, setOpenResponsive] = useState(false);

  const {
    ModelComponent,
    finalWeekends,
    events,
    leaves,
    meetingBooking,
    setCurrDate,
    currDate,
  } = CalendarModel(openResponsive, setOpenResponsive);

  const openModel = (current, info) => {
    setCurrDate(current);

    setOpenResponsive(true);
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const hasEvents = events.find((event) => CheckIsDateEqual(value, event));
    const hasLeaves = leaves.find((leave) => CheckIsDateEqual(value, leave));

    const hasMeeting = meetingBooking.find((meeting) =>
      CheckIsDateEqual(value, meeting)
    );
    const hasHolidays = finalWeekends().find(
      (holiday) => holiday.date === value.format("YYYY-MM-DD")
    );

    return (
      <div
        id={
          hasHolidays
            ? "holidays"
            : hasEvents || hasLeaves || hasMeeting
            ? "normal"
            : ""
        }
      >
        {
          <ul>
            {hasEvents && <li>Has Events</li>}
            {hasLeaves && <li>Has Leaves</li>}
            {hasMeeting && <li>Has Meeting</li>}
          </ul>
        }
      </div>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div
      style={{
        width: "98%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        position: "relative",
      }}
    >
      {ModelComponent}

      <Calendar onSelect={openModel} cellRender={cellRender} />
    </div>
  );
};

export default CalendarApp;
