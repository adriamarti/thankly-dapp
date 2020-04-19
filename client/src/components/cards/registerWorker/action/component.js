// External Dependencies
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input, Select, Result, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import StyledComponents from './styles';

import 'antd/dist/antd.css'

const { Option } = Select;

const { StyledForm } = StyledComponents;

const Component = ({ token, pathways, registerWorker, id, contract, address, workers }) => {
  const [registerWorkerForm] = Form.useForm();
  const [editWorkerModalVisible, setEditWorkerModalVisible] = useState(false);
  const [isProcessingRegistration, setIsProcessingRegistration] = useState(false);
  const [isSuccessRegistered, setIsSuccessRegistered] = useState(false);
  const [selectedPathway, setSelectedPathway] = useState('');
  const isButtonDisabled = token.name ? false : true;
  const [registeredEmail, setRegisteredEmail] = useState('')

  const toggleModalVisibility = (isVisible) => {
    setEditWorkerModalVisible(isVisible);
  };

  const handleSubmit = () => {
    setIsProcessingRegistration(true);
    const { getFieldValue } = registerWorkerForm;
    const name = getFieldValue('name');
    const email = getFieldValue('email');

    try {
      registerWorker(id, name, email, selectedPathway, contract, address);
      setRegisteredEmail(email);
      setIsSuccessRegistered(true);
      isProcessingRegistration(false);
    } catch(err) {
      console.log(err)
    }
  };

  const getForm = () => (
    <StyledForm form={registerWorkerForm} name="register">
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
      <Select onChange={(selected) => setSelectedPathway(selected)} placeholder="Pathway">
        {pathways.map(({ name, _id }) =>
          <Option value={_id} key={_id}>{name}</Option>
        )}
      </Select>
    </StyledForm>
  )

  const setSubtitle = () => {
    const link = `/confirm-account?email=${registeredEmail}`

    return (
      <Typography.Text>
        The employee should active the account into the following link:
        <Link to={link}>
          {`${window.location.origin}${link}`}
        </Link>
      </Typography.Text>
    )
  }

  const getResult = () => (
    <Result
      status="success"
      title="Employee Successfully Created"
      subTitle={setSubtitle()}
    />
  )

  return (
    <div>
      <Button type="primary" icon={<UserAddOutlined />} disabled={isButtonDisabled} onClick={() => toggleModalVisibility(true)}>
        Register a new employee
      </Button>
      <Modal
        title="Here you can edit the employee details"
        visible={editWorkerModalVisible}
        onCancel={() => toggleModalVisibility(false)}
        footer={[
          <Button key="cancel" onClick={() => toggleModalVisibility(false)}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" loading={isProcessingRegistration} disabled={isSuccessRegistered} onClick={() => handleSubmit()}>
            Register employee
          </Button>,
        ]}
      >
        {isSuccessRegistered ? getResult() : getForm()}
      </Modal>
    </div>
  );
}

Component.propTypes = {
  registerWorker: PropTypes.func.isRequired,
  id: PropTypes.string,
  token: PropTypes.object,
  pathways: PropTypes.array,
  workers: PropTypes.array,
  contract: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
};

Component.defaultProps = {
  id: '',
  token: {},
  pathways: [],
  workers: [],
};

export default Component;