// External Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Typography, Form, Input, Select, Result } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import StyledComponents from './styles';

import 'antd/dist/antd.css'

const { Text, Title } = Typography;
const { Option } = Select;

const { Amount, StyledForm } = StyledComponents;

const Component = ({ pathways, workerData, editWorkers, requestStatus }) => {
  const [editWorkerForm] = Form.useForm();
  const [editWorkerModalVisible, setEditWorkerModalVisible] = useState(false);
  const [selectedPathway, setSelectedPathway] = useState(workerData.pathway);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessUpdated, setIsSuccessUpdated] = useState(false);
  const [buttonText, setButtonText] = useState('Update');

  const toggleModalVisibility = (isVisible) => {
    setEditWorkerModalVisible(isVisible);
  };

  const handleSubmit = () => {
    const { getFieldValue } = editWorkerForm;
    const name = getFieldValue('name');
    const email = getFieldValue('email');
    const pathway = selectedPathway;
    
    editWorkers(workerData._id, email, name, pathway);
  };

  const toggleSignInButtonStatus = () => {
    setIsProcessing(!isProcessing);
    const buttonText = isProcessing ? 'Updating' : 'Update'
    setButtonText(buttonText);
  }

  useEffect(() => {
    const { status } = requestStatus
    if (status === 'SUCCESSFUL') {
      setIsProcessing(false)
      setIsSuccessUpdated(true)
    }

    if (status === 'FETCHING') {
      toggleSignInButtonStatus()
    }
  }, [requestStatus])

  const getForm = () => (
    <StyledForm form={editWorkerForm} name="register" initialValues={{ email: workerData.email, name: workerData.name }}>
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

  const getResult = () => (
    <Result
      status="success"
      title="Employee Successfully Updated"
    />
  )

  const closeModal = () => {
    editWorkerForm.resetFields();
    toggleModalVisibility(false);
    setIsSuccessUpdated(false);
    setIsProcessing(false);
  }

  return (
    <div>
      <Button type="default" shape="circle" onClick={() => toggleModalVisibility(true)} icon={<EditOutlined />} />
      <Modal
        title="Here you can edit the employee details"
        visible={editWorkerModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" loading={isProcessing} disabled={isSuccessUpdated} onClick={() => handleSubmit()}>
            {buttonText}
          </Button>,
        ]}
      >
        {isSuccessUpdated ? getResult() : getForm()}
      </Modal>
    </div>
  );
}

Component.propTypes = {
  editWorkers: PropTypes.func.isRequired,
  requestStatus: PropTypes.object.isRequired,
  workerData: PropTypes.object.isRequired,
  pathways: PropTypes.array.isRequired,
};

export default Component;