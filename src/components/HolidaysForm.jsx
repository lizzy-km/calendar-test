import { Form, Button, Divider, Input, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import React, { useRef, useState } from 'react';

let index = 0;

const HolidaysForm = () => {
    const [items, setItems] = useState(['Public Holidays']);
  const [holidaysTypes, setHolidaysTypes] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, holidaysTypes || `New item ${index++}`]);
    setHolidaysTypes('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <Form.Item
        label="Holidays Type"
        name="holidaysType"
        rules={[{ required: true, message: "Require Holidays Name!" }]}
        
      >
         <Select
      style={{
        width: 300,
      }}
      placeholder="Holidays Type"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
            rules={[{required:false}]}
              placeholder="Please enter Type"
              ref={inputRef}
              value={holidaysTypes}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add Holidays Type
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({
        label: item,
        value: item,
      }))}
    />
      </Form.Item>
  )
}

export default HolidaysForm