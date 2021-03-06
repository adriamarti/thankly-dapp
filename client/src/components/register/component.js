// External Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Typography, Form, Input, Result } from 'antd';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Paragraph, Text } = Typography;
const { RegisterWrapper, StyledButton, StyledForm } = StyledComponents;

const Component = ({ ethereumAddress, contract, registerCompany, registeredName }) => {
  const [showMetamaskWarning, setShowMetamaskWarning] = useState(false);
  const [registerForm] = Form.useForm();
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [isProcessingRegistration, setIsProcessingRegistration] = useState(false);
  const [isSuccessRegistered, setIsSuccessRegistered] = useState(false);
  const [buttonText, setButtonText] = useState('Sign In');

  useEffect(() => {
    if (registeredName) {
      setIsSuccessRegistered(true);
      setIsProcessingRegistration(false);
    }
  }, [registeredName])

  useEffect(() => {
    if (!ethereumAddress) {
      setShowMetamaskWarning(true);
    } else {
      setShowMetamaskWarning(false);
    }
  }, [ethereumAddress])

  const toggleModalVisibility = (isVisible) => {
    setRegisterModalVisible(isVisible);
  };

  const toggleSignInButtonStatus = () => {
    setIsProcessingRegistration(!isSuccessRegistered);
    setButtonText(isSuccessRegistered ? 'Signing In' : 'Sign In');
  }

  const handleSubmit = async () => {
    toggleSignInButtonStatus();
    const { getFieldValue } = registerForm;
    const email = getFieldValue('email');
    const password = getFieldValue('password');
    const name = getFieldValue('name');

    try {
      await contract.methods.registerCompany().send({ from: ethereumAddress });
      registerCompany(email, name, password, ethereumAddress)
    } catch(err) {
      console.log(err)
    }
  };

  const getModalTitle = () => {
    if (isSuccessRegistered) {
      return 'Congratulations';
    }

    return 'Register Your Company';
  }

  const getModalText = () => {
    if (isSuccessRegistered) {
      return (
        <Result
          status="success"
          title="Successfully Registered"
        />
      )
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
          <Button key="register" type="primary" disabled={isSuccessRegistered} loading={isProcessingRegistration} onClick={() => handleSubmit()}>
            {buttonText}
          </Button>,
        ]}
      >
        <Paragraph>
          {getModalText()}
        </Paragraph>
        {ethereumAddress && <Text strong>Your ethereum address: {ethereumAddress}</Text>}
        {showMetamaskWarning && <Text type="warning">You need to enable Metamask to register the account and create your Token</Text>}
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
              name="name" 
              rules={[{ required: true, message: 'Please input your company name!' }]}
              >
              <Input placeholder="Company Name" />
            </Form.Item>

            <Form.Item
              name="password" 
              rules={[{ required: true, message: 'Please input your password!' }]}
              >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </StyledForm>
        }
      </Modal>
    </RegisterWrapper>
  );
}

Component.propTypes = {
  ethereumAddress: PropTypes.string,
  contract: PropTypes.object,
  registerCompany: PropTypes.func.isRequired,
  registeredName: PropTypes.string,
};

export default Component;