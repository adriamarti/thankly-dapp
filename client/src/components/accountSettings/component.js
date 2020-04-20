// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { RegisterWrapper, StyledButton, StyledForm, StyledFormItem } = StyledComponents;

const Component = () => {
  const [registerForm] = Form.useForm();
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [isProcessingRegistration, setIsProcessingRegistration] = useState(false);
  const [isSuccessRegistered, setIsSuccessRegistered] = useState(false);

  const toggleModalVisibility = (isVisible) => {
    setRegisterModalVisible(isVisible);
  };

  const handleSubmit = () => {
    const { getFieldValue } = registerForm;
    const email = getFieldValue('email');
    const password = getFieldValue('password');

    // Simulate success signup
    console.log('email:', email)
    console.log('password:', password)
    setIsSuccessRegistered(true);
  };

  const getModalTitle = () => {
    if (isSuccessRegistered) {
      return 'Congratulations';
    }

    return 'Register Your Company';
  }

  const getModalText = () => {
    if (isSuccessRegistered) {
      return 'Check your email and follow the instruction to confirm your account';
    }

    return 'This registry is only for companies. If you are an employee from a company registered in our platform ask to HR department to join the platform';
  };


  return (
    <StyledForm form={registerForm} name="register">
      <StyledFormItem
        name="email" 
        rules={[{ required: true, message: 'Please input your email!' }]}
        >
        <Input placeholder="Email" />
      </StyledFormItem>
      <StyledFormItem
        name="name" 
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input name="name" placeholder="Company Name" />
      </StyledFormItem>
      <Button type="primary" htmlType="submit">
        Update
      </Button>
    </StyledForm>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;