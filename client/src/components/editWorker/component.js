// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Typography, Form, Input, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import StyledComponents from './styles';

import 'antd/dist/antd.css'

const { Text, Title } = Typography;
const { Option } = Select;

const { Amount, StyledForm } = StyledComponents;

const Component = () => {
  const [editWorkerForm] = Form.useForm();
  const [editWorkerModalVisible, setEditWorkerModalVisible] = useState(false);
  const [isProcessingRegistration, setIsProcessingRegistration] = useState(false);
  const [isSuccessRegistered, setIsSuccessRegistered] = useState(false);

  const toggleModalVisibility = (isVisible) => {
    setEditWorkerModalVisible(isVisible);
  };

  const handleSubmit = () => {
    const amount = '20';

    console.log('Amount transfered')
    toggleModalVisibility(false);
  };

  return (
    <div>
      <Button type="default" shape="circle" onClick={() => toggleModalVisibility(true)} icon={<EditOutlined />} />
      <Modal
        title="Here you can edit the employee details"
        visible={editWorkerModalVisible}
        onCancel={() => toggleModalVisibility(false)}
        footer={[
          <Button key="cancel" onClick={() => toggleModalVisibility(false)}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" loading={isProcessingRegistration} onClick={() => handleSubmit()}>
            Confirm Changes
          </Button>,
        ]}
      >
        <StyledForm form={editWorkerForm} name="register">
          <Form.Item
            name="email" 
            rules={[{ required: true, message: 'Please input the employee email!' }]}
            >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="name" 
            rules={[{ required: true, message: 'Please input the employee name!' }]}
            >
            <Input placeholder="Name" />
          </Form.Item>
          <Select defaultValue="lucy" onChange={console.log}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </StyledForm>
      </Modal>
    </div>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;