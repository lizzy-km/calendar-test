import React from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { CheckIsDateEqual } from "../hooks/calendar/EventDateIsInDateCell";
const format = "HH:mm:ss";
const MeetingBooking = ({ meetingBookingData, value }) => {
  const data = meetingBookingData;

  const getTime = (time) => {
    const hour = time.hour();
    const minute = time.minute();
    const seconds = time.second();

    return `${hour}:${minute}:${seconds}`;
  };

  return (
    <ul>
      {data?.map((meeting) => {
        const startTime = dayjs(
          getTime(meeting.values.meeting_time[0]),
          "HH:mm:ss"
        );
        const endTime = dayjs(
          getTime(meeting.values.meeting_time[1]),
          "HH:mm:ss"
        );
        const hasMeeting = CheckIsDateEqual(value, meeting);
        const list = hasMeeting ? (
          <li
            style={{
              width: "50%",
              height: "auto",
              padding: "15px",
              borderRadius: "18px",
              backgroundColor: "#C7DB9C80",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "start",
              margin: "10px",
            }}
          >
            <TimePicker.RangePicker
              defaultValue={[startTime, endTime]}
              format={format}
              disabled
            />
            <div
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              <pre>Room Number : </pre>
              <pre> {meeting.values.meeting_room_number}</pre>
            </div>

            <div
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              <pre>Meeting Detail : </pre>
              <pre> {meeting.values.detail}</pre>
            </div>

            <div
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              <pre>Rules : </pre>
              {meeting.values.rules?.map((rule) => (
                <pre
                  style={{
                    backgroundColor: "#333333",
                    color: "#f8f8f8",
                    padding: "2px",
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  {rule}
                </pre>
              ))}
            </div>
          </li>
        ) : (
          <></>
        );
        return list;
      })}
    </ul>
  );
};

export default MeetingBooking;
