// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Typography, Form, Input } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import StyledComponents from './styles';

import 'antd/dist/antd.css'

const { Text, Title } = Typography;

const { Amount } = StyledComponents;

const Component = () => {
  const [registerForm] = Form.useForm();
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [isProcessingRegistration, setIsProcessingRegistration] = useState(false);
  const [isSuccessRegistered, setIsSuccessRegistered] = useState(false);

  const toggleModalVisibility = (isVisible) => {
    setRegisterModalVisible(isVisible);
  };

  const handleSubmit = () => {
    const amount = '20';

    console.log('Amount transfered')
    toggleModalVisibility(false);
  };

  return (
    <div>
      <Button type="primary" shape="circle" onClick={() => toggleModalVisibility(true)} icon={<SwapOutlined />} />
      <Modal
        title="Transfer tokens to the employee"
        visible={registerModalVisible}
        onOk={() => handleSubmit()}
        onCancel={() => toggleModalVisibility(false)}
      >
        <Text>
          Following your configuration about how many tokens should be transfered to this employee based on her/his pathway you will transfer:
        </Text>
        <Amount>
          <Text strong>20</Text>
          <Text>ADD</Text>
        </Amount>
      </Modal>
    </div>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;