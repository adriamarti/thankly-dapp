// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Statistic, List, Collapse, Empty } from 'antd';
import { FireOutlined, SwapOutlined, InfoCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Text } = Typography;
const { Item } = List;
const { Panel } = Collapse;
const { StyledCollapse, TransactionHeader } = StyledComponents;

const Component = ({ workers, user }) => {

  const getWorkerName = (workerId) => {
    const [worker] = workers.filter(({ _id, name }) => _id === workerId);

    if (worker && worker.name) {
      return worker.name
    }
    
    return user.name;
  }

  const getTransactionsFromWorkers = () => {
    let transactions = [];
    workers.forEach((worker) => {
      console.log(transactions)
      transactions.push(...worker.transactions);
    })

    return transactions
  }

  const getTranasctionType = (type, amount) => {
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
        value={amount}
        valueStyle={{ color: transactionType[type].color }}
        prefix={transactionType[type].icon}
      />
    )
  }

  const getTransactionHeader = (from, to) => {
    return (
      <TransactionHeader>
        <Text type="secondary">From</Text>
        <Text strong>{getWorkerName(from)}</Text>
        <Text type="secondary">to</Text>
        <Text strong>{getWorkerName(to)}</Text>
      </TransactionHeader>
    )
  }

  const noResults = () => (
    <Empty
      description={
        <Typography.Text>
          No data available as no transactions are processed
        </Typography.Text>
      }
    />
  )

  const transactions = getTransactionsFromWorkers();

  console.log(transactions);
  console.log(workers);

  const getTransactions = () => (
    <StyledCollapse>
      {transactions.map(({ transactionHash, from, to, type, message, amount, date }) =>
        <Panel showArrow={false} header={getTransactionHeader(from, to)} key={transactionHash} extra={getTranasctionType(type, amount)}>
          <List size="small">
            <Item>
              <Typography.Text>
                <InfoCircleOutlined />
                <Typography.Text copyable>
                  {transactionHash}
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
  )

  return (
    <div>
      {transactions.length === 0 ? noResults() : getTransactions()}
    </div>
  );
}

Component.propTypes = {
  user: PropTypes.object,
  workers: PropTypes.array,
};

Component.defaultProps = {
  user: {},
  workers: [],
};

export default Component;