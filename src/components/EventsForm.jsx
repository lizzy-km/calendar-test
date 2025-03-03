import { Form, Input, Select,DatePicker,TimePicker  } from "antd";
import React from "react";
import dayjs from 'dayjs';
const format = 'HH:mm:ss';

const { RangePicker } = DatePicker;

const EventsForm = ({setEvents,events}) => {
    const startTime = dayjs('12:08:23', 'HH:mm:ss');
    const endTime = dayjs('12:08:23', 'HH:mm:ss');
    
  return (
    <>
      <Form.Item
        label="Event Name"
        name="name"
        rules={[{ required: true, message: "Require Events Name!" }]}
        
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Event Description"
        name="detail"
        rules={[{ required: true, message: "Require Events Description!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Event Rules"
        name="rules"
        rules={[{ required: true, message: "Require Events Rules!" }]}
      >
        <Select
          mode="tags"
          
          tokenSeparators={[","]} 
        />
      </Form.Item>

     <Form.Item
            label="Event Time"
            name="event_time"
            rules={[
              {
                required: true,
                message: "Require Event Time!",
              },
            ]}
          >
            <TimePicker.RangePicker defaultValue={[startTime, endTime]} format={format} />
          </Form.Item>
    </>
  );
};

export default EventsForm;
