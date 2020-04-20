// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mentions } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Option } = Mentions;
const { StyledMentions, Box, StyledButton } = StyledComponents;

const Component = ({ workers, id, address, sendTokens }) => {
  const [prefix, setPrefix] = useState('@')
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [transactionText, setTransactionText] = useState('');

  const onSearch = (_, prefix) => {
    setPrefix(prefix)
  };

  const transformName = (name) => name.split(' ').join('.').toLowerCase();

  // @ This should be improved (or some validations into the text area)
  const getAmount = (text) => text.match(/(\+\S+\b)/ig)[0]; 
  const getUsers = (text) => text.match(/(\@\S+\b)/ig).map((user) => {
    const [matchingWorker] = workers.filter(({ name }) => transformName(name) === user.substring(1))

    return matchingWorker._id
  }); 

  const workerNames = workers.map(({ name }) => transformName(name))

  const autocomplete = {
    '@': workerNames
  }

  const handleSendTokens = async () => {
    setIsProcessingTransaction(true);
    // Only first user entered
    const to = getUsers(transactionText)[0];
    const amount = +getAmount(transactionText).substring(1);
    const description = transactionText;
    const from = id;

    const payload = { to, amount, description, from, address };

    await sendTokens(payload);
  }

  return (
    <Box>
      <StyledMentions
      style={{ width: '100%' }}
      placeholder="Type '@' to mention people who want to transfer tokens"
      prefix={['@']}
      onChange={(text) => setTransactionText(text)}
      onSearch={onSearch}
      >
        {(autocomplete[prefix] || []).map(value => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </StyledMentions>
      <StyledButton type="primary" icon={<SearchOutlined />} loading={isProcessingTransaction} onClick={handleSendTokens}>
        Send Tokens
      </StyledButton>
    </Box>
    
  );
}

Component.propTypes = {
  sendTokens: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  workers: PropTypes.array.isRequired,
};

export default Component;