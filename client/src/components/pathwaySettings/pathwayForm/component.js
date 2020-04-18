// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { StyledForm, StyledFormItem } = StyledComponents;

const Component = ({ addPathway, companyId, name, amount }) => {
  const [addPathwayForm] = Form.useForm();
  const [isProcessingAddingPathway, setIsProcessingAddingPathway] = useState(false);
  const [isSuccessAddedPassword, setIsSuccessAddedPassword] = useState(false);

  const onFinish = () => {
    const { getFieldValue } = addPathwayForm;
    const name = getFieldValue('name');
    const amount = getFieldValue('amount');

    addPathway(companyId, name, amount);

    // Simulate success signup
    // console.log('email:', email)
    // console.log('password:', password)
    // setIsSuccessRegistered(true);
  };


  return (
    <StyledForm form={addPathwayForm} name="add-pathway" initialValues={{ name, amount }} onFinish={onFinish}>
      <StyledFormItem
        name="name"
        rules={[{ required: true, message: 'Please input the pathway name' }]}
        >
        <Input placeholder="Pathway" />
      </StyledFormItem>
      <StyledFormItem
        name="amount" 
        rules={[{ required: true, message: 'Please input the pathway amount to transfer' }]}
        >
          <Input name="amount" placeholder="Amount to transfer" />
      </StyledFormItem>
      <Button type="primary" htmlType="submit">
        Update
      </Button>
    </StyledForm>
  );
}

Component.propTypes = {
  addPathway: PropTypes.func.isRequired,
  companyId: PropTypes.string,
  name: PropTypes.string,
  amount: PropTypes.string,
};

Component.defaultProps = {
  companyId: '',
  name: '',
  amount: '',
};

export default Component;