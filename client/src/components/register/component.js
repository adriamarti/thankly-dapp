// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Typography, Form, Input } from 'antd';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Paragraph } = Typography;
const { RegisterWrapper, StyledButton, StyledForm } = StyledComponents;


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
    <RegisterWrapper>
      <StyledButton size="large" type="primary" onClick={() => toggleModalVisibility(true)}>
        Register
      </StyledButton>
      <Modal
        title={getModalTitle()}
        visible={registerModalVisible}
        onCancel={() => toggleModalVisibility(false)}
        footer={[
          <Button key="cancel" onClick={() => toggleModalVisibility(false)}>
            Cancel
          </Button>,
          <Button key="register" type="primary" loading={isProcessingRegistration} onClick={() => handleSubmit()}>
            Register
          </Button>,
        ]}
      >
        <Paragraph>
          {getModalText()}
        </Paragraph>
        {
          !isSuccessRegistered &&
          <StyledForm form={registerForm} name="register">
            <Form.Item
              name="email" 
              rules={[{ required: true, message: 'Please input your email!' }]}
              >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password" 
              rules={[{ required: true, message: 'Please input your password!' }]}
              >
              <Input.Password name="password" placeholder="Password" />
            </Form.Item>
          </StyledForm>
        }
      </Modal>
    </RegisterWrapper>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;