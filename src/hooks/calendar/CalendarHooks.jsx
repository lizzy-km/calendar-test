import { CheckIsDateEqual } from "./EventDateIsInDateCell";
import { finalWeekends } from "./GetWeekendDate";

export const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value,events,leaves,meetingBooking,deletedWeekends) => {
    const hasEvents = events.find((event) => CheckIsDateEqual(value, event));
    const hasLeaves = leaves.find((leave) => CheckIsDateEqual(value, leave));

    const hasMeeting = meetingBooking?.find((meeting) =>
      CheckIsDateEqual(value, meeting)
    );
    const hasHolidays = (deletedWeekends)=> finalWeekends(deletedWeekends).find(
      (holiday) => holiday.date === value.format("YYYY-MM-DD")
    );

    return (
      <div
        id={
          hasHolidays(deletedWeekends)
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

export  const cellRender = (current, info,events,leaves,deletedWeekends) => {
    // console.log(current?.date())
    if (info.type === "date") return dateCellRender(current,events,leaves,deletedWeekends);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };


export const offDays = (holidays)=> holidays?.map((offDay) => {
    const offDayData = {
      date: offDay?.date.format("YYYY-MM-DD"),
      day_type: offDay?.values.holidaysType,
    };

    return {
      date: offDay?.date.format("YYYY-MM-DD"),
      day_type: offDay?.values.holidaysType,
    };
  });

