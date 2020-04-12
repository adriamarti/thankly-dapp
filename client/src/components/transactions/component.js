// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Statistic, List, Collapse } from 'antd';
import EditWorker from '../editWorker'
import TransferTokensToWorker from '../transferTokensToWorker'
import { FireOutlined, SwapOutlined, InfoCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Text } = Typography;
const { Item } = List;
const { Panel } = Collapse;
const { StyledCollapse, TransactionHeader } = StyledComponents;

const transactions = [
  {
    from: 'Dunya Salazar',
    to: 'Adria Marti',
    type: 'burnable',
    message: 'This is a random message.',
    amount: '2',
    date: '12-12-2020',
    id: '0x1e25112f2b5fcd3de05853ed97cd70eef2f11f126193ba5f10e208cfce912c9a',
  },
  {
    from: 'Adidas',
    to: 'Adria Marti',
    type: 'transferable',
    message: 'This is a regular transaction from the company to the employee.',
    amount: '12',
    date: '12-12-2020',
    id: '0x1e25112f2b5fcd3de05853ed97cd70eef2f11f126193ba5f10e208cfce912c9j',
  },
  {
    from: 'Adria Marti',
    to: 'Amazon Boucher',
    type: 'burned',
    message: 'This is a regular burned transaction, where the employeed has tranformed the company tokens to a bouchure.',
    amount: '34',
    date: '12-12-2020',
    id: '0x1e25112f2b5fcd3de05853ed97cd70eef2f11f126193ba5f10e208cfce912c9x',
  },
];

const Component = () => {

  const getTranasctionType = (type) => {
    const transactionType = {
      transferable: {
        color: '#7dd068',
        icon: <SwapOutlined />,
      },
      burnable: {
        color: '#faad14',
        icon: <SwapOutlined />,
      },
      burned: {
        color: '#ff4d4f',
        icon: <FireOutlined />,
      }
    };

    return (
      <Statistic
        value={11}
        valueStyle={{ color: transactionType[type].color }}
        prefix={transactionType[type].icon}
      />
    )
  }

  const getTransactionHeader = (from, to) => {
    return (
      <TransactionHeader>
        <Text type="secondary">From</Text>
        <Text strong>{from}</Text>
        <Text type="secondary">to</Text>
        <Text strong>{to}</Text>
      </TransactionHeader>
    )
  }

  return (
    <StyledCollapse>
      {transactions.map(({ from, to, type, message, amount, date, id }) =>
        <Panel showArrow={false} header={getTransactionHeader(from, to)} key={id} extra={getTranasctionType(type)}>
          <List size="small">
            <Item>
              <Typography.Text>
                <InfoCircleOutlined />
                <Typography.Text copyable>
                  {id}
                </Typography.Text>
              </Typography.Text>
            </Item>
            <Item>
              <Typography.Text>
                <ClockCircleOutlined />
                <Typography.Text>
                  {date}
                </Typography.Text>
              </Typography.Text>
            </Item>
            <Item>
              <Typography.Text>
                <Typography.Text>
                  {message}
                </Typography.Text>
              </Typography.Text>
            </Item>
          </List>
        </Panel>
      )}
    </StyledCollapse>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;