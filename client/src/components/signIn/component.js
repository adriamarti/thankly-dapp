// External Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio } from 'antd';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { StyledForm, SignInButton, RadioGroup, Text } = StyledComponents;

const Component = ({ user, signIn, ethereumAddress, history }) => {
  const [signInForm] = Form.useForm();
  const [typeOfUser, setTypeOfUsers] = useState('companies');
  const [showMetamaskWarning, setShowMetamaskWarning] = useState(false);
  const [isProcessingSignIn, setIsProcessingSignIn] = useState(false);
  const [buttonText, setButtonText] = useState('Sign In');

  const showWarning = () => {
    if (!ethereumAddress && typeOfUser === 'companies') {
      setShowMetamaskWarning(true);
    } else {
      setShowMetamaskWarning(false);
    }
  }

  useEffect(() => {
    showWarning();
  }, [ethereumAddress, typeOfUser])

  useEffect(() => {
    if (user._id) {
      const redirectPath = typeOfUser === 'companies' ? 'company' : 'worker';
      history.push(`/${redirectPath}`)
    }
  }, [user]);

  const toggleSignInButtonStatus = () => {
    setIsProcessingSignIn(!isProcessingSignIn);
    const buttonText = isProcessingSignIn ? 'Signing In' : 'Sign In'
    setButtonText(buttonText);
  }

  const onChangeTypeOfUser = ({ target }) => {
    setTypeOfUsers(target.value);
  }

  const onFinish = () => {
    toggleSignInButtonStatus()
    const { getFieldValue } = signInForm;
    const email = getFieldValue('email');
    const password = getFieldValue('password');

    if (!showMetamaskWarning) {
      signIn(email, password, typeOfUser); 
    }
  }

  return (
    <StyledForm name="sign_in" form={signInForm} onFinish={onFinish}>
      {showMetamaskWarning && <Text type="warning">You need to enable Metamask</Text>}
      <RadioGroup onChange={onChangeTypeOfUser} value={typeOfUser}>
        <Radio value="companies">Company</Radio>
        <Radio value="workers">Employee</Radio>
      </RadioGroup>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <SignInButton type="primary" htmlType="submit" loading={isProcessingSignIn}>
        {buttonText}
      </SignInButton>
    </StyledForm>
  );
}

Component.propTypes = {
  user: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  ethereumAddress: PropTypes.string
};

export default Component;