import { Form, Input, Select,DatePicker, InputNumber,TimePicker   } from "antd";
import React from "react";
import dayjs from 'dayjs';
const format = 'HH:mm:ss';

const { RangePicker } = DatePicker;

const MeetingBookingForm = () => {
    const startTime = dayjs('12:08:23', 'HH:mm:ss');
    const endTime = dayjs('12:08:23', 'HH:mm:ss');
    
  return (
    <>
      <Form.Item
        label="Meeting Room Number"
        name="meeting_room_number"
        rules={[{ required: true,  message: "Require Meeting Room Number!" }]}
        
      >
        <InputNumber min={1} max={10} defaultValue={1} />
      </Form.Item>

      <Form.Item
        label="Meeting Description"
        name="detail"
        rules={[{ required: true, message: "Require Meeting Description!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Meeting Rules"
        name="rules"
        rules={[{ required: true, message: "Require Meeting Rules!" }]}
      >
        <Select
          mode="tags"
          
          tokenSeparators={[","]}
        />
      </Form.Item>

      <Form.Item
        label="Meeting Time"
        name="meeting_time"
        rules={[
          {
            required: true,
            message: "Require Meeting Time!",
          },
        ]}
      >
        <TimePicker.RangePicker type={"start"|"end"} disabledHours={''} disabledMinutes={""} disabledSeconds={""} defaultValue={[startTime, endTime]} format={format} />
      </Form.Item>
    </>
  );
};

export default MeetingBookingForm;
