// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input, Result } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import StyledComponents from './styles';

import 'antd/dist/antd.css'

const { Wrapper, StyledForm } = StyledComponents;

const Component = ({ address, contract }) => {
  const [createTokenForm] = Form.useForm();
  const [tokenCreateVisibility, setTokenCreateVisibility] = useState(false);
  const [isProcessingTokenCreation, setIsProcessingTokenCreation] = useState(false);
  const [isSuccessCreated, setIsSuccessCreated] = useState(false);

  const toggleModalVisibility = (isVisible) => {
    setTokenCreateVisibility(isVisible);
  };

  const handleSubmit = async () => {
    setIsProcessingTokenCreation(true);
    const { getFieldValue } = createTokenForm;
    const name = getFieldValue('name');
    const symbol = getFieldValue('symbol');
    
    try {
      await contract.methods.createToken(name, symbol).send({ from: address });
      setIsSuccessCreated(true);
      setIsProcessingTokenCreation(false);
    } catch (err) {
      setIsSuccessCreated(false);
    }
  };

  const getForm = () => (
    <StyledForm form={createTokenForm} name="createToken">
      <Form.Item
        name="name" 
        rules={[{ required: true, message: 'Please input the token name!' }]}
        >
        <Input placeholder="Token name (ie. Thankly)" />
      </Form.Item>
      <Form.Item
        name="symbol" 
        rules={[{ required: true, message: 'Please input the token symbol!' }]}
        >
        <Input placeholder="Token symbol (ie. TKLY)" />
      </Form.Item>
    </StyledForm>
  )

  const getResult = () => (
    <Result
      status="success"
      title="Token Successfully Created"
    />
  )
  return (
    <Wrapper>
      <Button type="primary" icon={<FireOutlined />} onClick={() => toggleModalVisibility(true)}>
        Burn Tokens
      </Button>
      <Modal
        title="Fill the data of your token"
        visible={tokenCreateVisibility}
        onCancel={() => toggleModalVisibility(false)}
        footer={[
          <Button key="confirm" type="primary" disabled={isSuccessCreated} loading={isProcessingTokenCreation} onClick={() => handleSubmit()}>
            Burn Tokens
          </Button>,
        ]}
      >
        {isSuccessCreated ? getResult() : getForm()}
      </Modal>
    </Wrapper>
  );
}

Component.propTypes = {
  address: PropTypes.string.isRequired,
  contract: PropTypes.object.isRequired,
};

export default Component;