// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Typography, Result } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import StyledComponents from './styles';
import Web3 from 'web3';

import 'antd/dist/antd.css'

const { Text } = Typography;

const { Amount } = StyledComponents;

const Component = ({ updateToken, addTransaction, id, workerId, contract, address, amount, token }) => {
  const [sendTokensModalVisibile, setSendTokensModalVisibile] = useState(false);
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [isSuccessTransfered, setIsSuccessTransfered] = useState(false);

  const handleSubmit = async () => {
    setIsProcessingTransaction(true);

    try {
      const transacionCost = +amount * Web3.utils.toWei('1', 'shannon');;
      const transactionFee = transacionCost * 10 / 100;
      const totalTransactionCost = `${transacionCost + transactionFee}`;
      const workerIdHex = Web3.utils.toHex(workerId);
      const { transactionHash, transactionIndex, blockHash, blockNumber } = await contract.methods
        .transferTokensFromCompanyToWorker(workerIdHex, amount)
        .send({ from: address, value: totalTransactionCost })
      const transactionPayload = {
        transactionHash,
        transactionIndex,
        blockHash,
        blockNumber,
        from: id,
        to: workerId,
        amount: amount,
        date: new Date(),
        type: 'transferable',
      }
      addTransaction(transactionPayload);
      updateToken(contract, address);
      setIsSuccessTransfered(true);
      setIsProcessingTransaction(false);
    } catch (err) {
      console.log(err)
    }

    console.log('Amount transfered')
  };

  const getInitialTest = () => (
    <div>
      <Text>
        Following your configuration about how many tokens should be transfered to this employee based on her/his pathway you will transfer:
      </Text>
      <Amount>
        <Text strong>{amount}</Text>
        <Text>{token.symbol}</Text>
      </Amount>
    </div>
  )

  const getResult = () => (
    <Result
      status="success"
      title="Tokens transferred successfuly"
    />
  )
  
  // Close modal and reset everything
  const closeModal = () => {
    setIsProcessingTransaction(false);
    setIsSuccessTransfered(false);
    setSendTokensModalVisibile(false);
  }

  return (
    <div>
      <Button type="primary" shape="circle" onClick={() => setSendTokensModalVisibile(true)} icon={<SwapOutlined />} />
      <Modal
        title="Transfer tokens to the employee"
        visible={sendTokensModalVisibile}
        onCancel={() => closeModal()}
        footer={[
          <Button key="confirm" type="primary" disabled={isSuccessTransfered} loading={isProcessingTransaction} onClick={() => handleSubmit()}>
            Tranfer Tokens
          </Button>,
        ]}
      >
        {isSuccessTransfered ? getResult() : getInitialTest()}
      </Modal>
    </div>
  );
}

Component.propTypes = {
  updateToken: PropTypes.func.isRequired,
  addTransaction: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  workerId: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  contract: PropTypes.object.isRequired,
};

export default Component;