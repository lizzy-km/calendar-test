import { Form, Button, Divider, Input, Select, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import React, { useRef, useState } from "react";

let index = 0;
const LeavesForm = () => {
  const [items, setItems] = useState([
    "Casual Leave",
    "Annual Leave",
    "Medical Leave",
    "Funeral Leave",
    "Maternity Leave",
    "Paternity Leave",
    "Unpaid Leave",
  ]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <>
      <Form.Item
        label="Leave Case"
        name="detail"
        rules={[{ required: true, message: "Require Leave Case!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Leaves Type"
        name="name"
        rules={[{ required: true, message: "Require Holidays Name!" }]}
      >
        <Select
          style={{
            width: 300,
          }}
          placeholder="Leaves Type"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: "8px 0",
                }}
              />
              <Space
                style={{
                  padding: "0 8px 4px",
                }}
              >
                <Input
                  placeholder="Please enter Type"
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Add Leaves Type
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
    </>
  );
};

export default LeavesForm;
