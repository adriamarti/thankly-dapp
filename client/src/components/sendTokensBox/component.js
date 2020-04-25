// External Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Mentions, message, Typography, Button } from 'antd';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Option } = Mentions;
const { Text } = Typography;
const { StyledMentions, Box, Footer } = StyledComponents;

const Component = ({ workers, id, address, sendTokens, requestStatus }) => {
  const [prefix, setPrefix] = useState('@')
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [transactionText, setTransactionText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [helpText, setHelpText] = useState('Please specify one colleague and the amount to send');
  const [typeOfText, setTypeOfText] = useState('secondary');

  const onSearch = (_, prefix) => {
    setPrefix(prefix)
  };

  const success = () => {
    message.success('Th transactions was correctly processed!');
  };
  
  const error = () => {
    message.error('The transaction failed. Try again and!');
  };

  const transformName = (name) => name.split(' ').join('.').toLowerCase();

  // @ This should be improved (or some validations into the text area)
  const getAmount = (text) => text.match(/(\+\S+\b)/ig);
  const getUsers = (text) => text.match(/(\@\S+\b)/ig);
  const matchWorkerWithTyped = (typedWorker) => {
    if (typedWorker && typedWorker.length === 1) {
      console.log(typedWorker[0])
      console.log(typedWorker[0].substring(1))
      const filteredWorker = workers.filter(({ name }) => transformName(name) === typedWorker[0].substring(1))
      console.log(filteredWorker)
      if (filteredWorker.length === 1) {
        return filteredWorker[0]._id
      }

      return null;
    }

    return null;
  }

  const workerNames = workers.map(({ name }) => transformName(name))

  const autocomplete = {
    '@': workerNames
  }

  const handleSendTokens = async () => {
    // Only first user entered
    const to = matchWorkerWithTyped(getUsers(transactionText));

    if (!to) {
      setHelpText('The introduced worker doesn\'t match with any from your company');
      setTypeOfText('danger');
    }

    const amount = getAmount(transactionText)
    let transformedAmount;

    if (amount && amount.length > 0) {
      transformedAmount = getAmount(transactionText)[0].substring(1);

      const description = transactionText;
      const from = id;

      const payload = { to, amount: +transformedAmount, description, from, address };
      await sendTokens(payload);
    } else {
      setHelpText('The introduced amount is invalid');
      setTypeOfText('danger');
    }
  }

  useEffect(() => {
    const { status } = requestStatus
    if (status === 'SUCCESSFUL') {
      setIsProcessingTransaction(false);
      setTransactionText('')
      success();
    }

    if (status === 'FETCHING') {
      setIsProcessingTransaction(true);
    }

    if (status === 'FAILURE') {
      setIsProcessingTransaction(false);
      setTransactionText('')
      error()
    }
  }, [requestStatus])

  const onChange = (text) => {
    setTransactionText(text);
    setHelpText('Please specify one colleague and the amount to send');
    setTypeOfText('secondary');

    if (text.length > 10) {
      setIsDisabled(false)
    }
  }

  return (
    <Box>
      <StyledMentions
      style={{ width: '100%' }}
      placeholder="Type '@' to mention people who want to transfer tokens"
      prefix={['@']}
      onChange={onChange}
      onSearch={onSearch}
      >
        {(autocomplete[prefix] || []).map(value => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </StyledMentions>
      <Footer>
        <Text type={typeOfText}>{helpText}</Text>
        <Button type="primary" loading={isProcessingTransaction} onClick={handleSendTokens} disabled={isDisabled}>
          Send Tokens
        </Button>
      </Footer>
    </Box>
    
  );
}

Component.propTypes = {
  requestStatus: PropTypes.object.isRequired,
  sendTokens: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  workers: PropTypes.array.isRequired,
};

export default Component;