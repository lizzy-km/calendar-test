import { Form, Modal, Radio, Tabs, Button } from "antd";
import React, { useState } from "react";
import HolidaysForm from "./HolidaysForm";
import EventsForm from "./EventsForm";
import MeetingBookingForm from "./MeetingBookingForm";
import LeavesForm from "./LeavesForm";
import { GetWeekends } from "../hooks/calendar/GetWeekendDate";
import MeetingBooking from "./MeetingBooking";
import Events from "./Events";
import Leaves from "./Leaves";
import moment from "moment";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const CalendarModel = (openResponsive, setOpenResponsive) => {
  const [formType, setFormType] = useState("set_holidays");
  const [currDate, setCurrDate] = useState();

  const [holidays, setHolidays] = useState([]);
  const [events, setEvents] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [meetingBooking, setMeetingBookings] = useState([]);
  const [deletedWeekends, setDeletedWeekends] = useState([]);

  let weekendDatesInYear = [];

  const { finalWeekends, isHasHolidayOnCurrentDate } = GetWeekends(
    currDate,
    deletedWeekends,
    weekendDatesInYear,
    holidays
  );

  const [form] = Form.useForm();

  const variant = Form.useWatch("variant", form);
  const items = [
    {
      key: "1",
      label: "Events",
      children: <Events value={currDate} eventsData={events} />,
    },
    {
      key: "2",
      label: "Leaves",
      children: <Leaves value={currDate} leavesData={leaves} />,
    },
    {
      key: "3",
      label: "Meeting Room Booking",
      children: (
        <MeetingBooking value={currDate} meetingBookingData={meetingBooking} />
      ),
    },
  ];

  const assignDataByType = (formData) => {
    switch (formData?.values?.type) {
      case "set_holidays":
        const currentDate = moment()
          ?.month(currDate?.month())
          ?.date(currDate?.date());

        setHolidays((prev) => [
          ...prev,
          { date: currentDate.format("YYYY-MM-DD"), day_type: "Weekend" },
        ]);

        const filterdDeletedWk = deletedWeekends?.filter(
          (deletedWeekend) =>
            deletedWeekend !== currentDate.format("YYYY-MM-DD")
        );

        setDeletedWeekends(filterdDeletedWk);
        break;

      case "set_events":
        setEvents((prev) => [...prev, formData]);
        break;

      case "set_meeting_booking":
        setMeetingBookings((prev) => [...prev, formData]);
        break;

      case "set_leaves":
        setLeaves((prev) => [...prev, formData]);
        break;

      default:
        break;
    }

    setOpenResponsive(false);
    form.resetFields();
  };

  const formSubmit = async () => {
    const id = `${currDate?.date()}${currDate.month()}${currDate.year()}`;
    const formData = { id, values: form.getFieldsValue(), date: currDate };

    const hasError = await form.validateFields().catch((error) => error);

    const isError = hasError.errorFields || false;

    !isError && assignDataByType(formData);
  };

  const deleteHoliday = () => {
    setDeletedWeekends((prev) => [...prev, currDate?.format("YYYY-MM-DD")]);
    setOpenResponsive(false);
  };

  const ModelComponent = (
    <Modal
      title="Modal responsive width"
      centered
      open={openResponsive}
      onCancel={() => setOpenResponsive(false)}
      width={"60%"}
      height={"100vh"}
      footer={false}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />

        <Form
          onSubmitCapture={formSubmit}
          {...formItemLayout}
          form={form}
          variant={variant || "underlined"}
          type={formType}
          style={{ minWidth: "100%", minHeight: "100%" }}
          // initialValues={{ variant: "underlined" }}
        >
          <Form.Item
            initialValue={formType}
            style={{ minWidth: "100%" }}
            label="Type"
            name="type"
          >
            <Radio.Group
              style={{ minWidth: "100%" }}
              value={formType}
              options={[
                { value: "set_holidays", label: "Holidays" },
                { value: "set_events", label: "Events" },
                {
                  value: "set_meeting_booking",
                  label: "Meeting Room Booking",
                },
                { value: "set_leaves", label: "Leaves" },
              ]}
              // defaultValue="set_holidays"
              optionType="button"
              buttonStyle="solid"
              onChange={(value) => setFormType(value.target.value)}
            />
          </Form.Item>
          {formType === "set_holidays" && (
            <HolidaysForm setHolidays={setHolidays} />
          )}

          {formType === "set_events" && (
            <EventsForm events={events} setEvents={setEvents} />
          )}
          {formType === "set_meeting_booking" && (
            <MeetingBookingForm setMeetingBookings={setMeetingBookings} />
          )}
          {formType === "set_leaves" && <LeavesForm setLeaves={setLeaves} />}

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "14px",
                }}
              >
                {formType === "set_holidays" && isHasHolidayOnCurrentDate() && (
                  <Button onClick={deleteHoliday} type="link">
                    Delete Holiday
                  </Button>
                )}

                <Button htmlType={"submit"} type="primary">
                  Create
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );

  return {
    ModelComponent,
    finalWeekends,
    holidays,
    events,
    leaves,
    meetingBooking,
    deletedWeekends,
    setCurrDate,
    currDate,
  };
};

export default CalendarModel;
