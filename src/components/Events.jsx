import React from "react";
import { CheckIsDateEqual } from "../hooks/calendar/EventDateIsInDateCell";
import { TimePicker } from "antd";
import dayjs from "dayjs";

const format = "HH:mm:ss";

const Events = ({ eventsData, value }) => {
  const getTime = (time) => {
    const hour = time.hour();
    const minute = time.minute();
    const seconds = time.second();

    return `${hour}:${minute}:${seconds}`;
  };

  const data = eventsData;

  
  return (
    <ul>
      {data?.map((event) => {
        const hasEvents = CheckIsDateEqual(value, event);
        const startTime = dayjs(
          getTime(event?.values?.event_time[0]),
          "HH:mm:ss"
        );
        const endTime = dayjs(getTime(event?.values?.event_time[1]), "HH:mm:ss");


      

        const list = hasEvents ? (
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
              margin:'10px'
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
              <pre>Event Name : </pre>
              <pre> {event.values.name}</pre>
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              <pre>Event Detail : </pre>
              <pre> {event.values.detail}</pre>
            </div>

            <div
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              <pre>Rules : </pre>
              {event.values.rules?.map((rule) => (
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

export default Events;
