// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { RegisterWrapper, StyledButton, StyledForm, StyledFormItem, PathwayWrapper, AddButton } = StyledComponents;

const pathways = [
  {
    name: 'Trainee',
    amount: '10'
  },
  {
    name: 'Junior',
    amount: '20'
  },
]

const Component = () => {
  const [companyPathways, setCompanyPathways] = useState(pathways);
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

  const addNewPathway = () => {
    setCompanyPathways([
      ...companyPathways,
      {
        name: '',
        amount: ''
      }
    ])
  };

  return (
    <div>
      {companyPathways.map(({ name, amount }, index) =>
        <StyledForm form={registerForm} name="register" key={`${name}-${index}`}>
          <StyledFormItem
            name={name}
            rules={[{ required: true, message: 'Please input the pathway name' }]}
            >
            <Input placeholder="Pathway" defaultValue={name} />
          </StyledFormItem>
          <StyledFormItem
            name="amount" 
            rules={[{ required: true, message: 'Please input the pathway amount to transfer' }]}
            >
              <Input name="amount" placeholder="Amount to transfer" defaultValue={amount} />
          </StyledFormItem>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </StyledForm>
      )}
      <StyledButton type="dashed" onClick={() => addNewPathway()}>
        <PlusOutlined /> Add new pathway
      </StyledButton>
    </div>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;