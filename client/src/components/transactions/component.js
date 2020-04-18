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

const Component = ({ transactions }) => {

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

  const noResults = () => (
    <Empty
      description={
        <Typography.Text>
          No data available as no transactions are processed
        </Typography.Text>
      }
    />
  )

  const getTransactions = () => (
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
  )

  return (
    <div>
      {transactions.length === 0 ? noResults() : getTransactions()}
    </div>
  );
}

Component.propTypes = {
  transactions: PropTypes.array,
};

Component.defaultProps = {
  transactions: [],
};

export default Component;