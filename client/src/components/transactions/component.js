// External Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Statistic, List, Collapse, Empty } from 'antd';
import { FireOutlined, SwapOutlined, InfoCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Text } = Typography;
const { Item } = List;
const { Panel } = Collapse;
const { StyledCollapse, TransactionHeader } = StyledComponents;

const Component = ({ companyName, transactions, workers, user, location }) => {
  const [allTransactions, setAllTransactions] = useState(transactions); 

  const getWorkerName = (workerId) => {
    const [worker] = workers.filter(({ _id }) => _id === workerId);

    if (worker && worker.name) {
      return worker.name
    }

    if (userLoggedIsWorker()) {
      return companyName;
    }

    return user.name;
  }

  const getTransactionsFromWorkers = () => {
    let transactions = [];
    workers.forEach((worker) => {
      if (worker.transactions && worker.transactions.length > 0) {
        transactions.push(...worker.transactions);
      }
    })

    return transactions.filter((transaction, index, self) =>
      index === self.findIndex((t) => (
        t.transactionHash === transaction.transactionHash
      ))
    )
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

  const userLoggedIsWorker = () => location.pathname.includes('worker');

  useEffect(() => {
    console.log(transactions);
    if (userLoggedIsWorker()) {
      return setAllTransactions(transactions)
    }

    setAllTransactions(getTransactionsFromWorkers())
  }, [transactions, workers])


  const getTransactions = () => (
    <StyledCollapse>
      {allTransactions.map(({ transactionHash, from, to, type, description, amount, date }) =>
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
                  {description && description.length > 0 ? description : 'I hope you use this amount of transferable tokens on a responsive way! :)'}
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
      {allTransactions.length === 0 ? noResults() : getTransactions()}
    </div>
  );
}

Component.propTypes = {
  companyName: PropTypes.string,
  transactions: PropTypes.array,
  user: PropTypes.object,
  workers: PropTypes.array,
};

Component.defaultProps = {
  companyName: '',
  transactions: [],
  user: {},
  workers: [],
};

export default Component;