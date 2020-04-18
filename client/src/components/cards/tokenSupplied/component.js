// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Statistic, Divider, Empty, Typography } from 'antd';
import { FireOutlined, SwapOutlined } from '@ant-design/icons';
import Action from './action'

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { TokenSuppliedCard } = StyledComponents;

const Component = ({ token }) => {

  const getTokenData = () => {
    if (token.name) {
      const { symbol, totalSupplied, totalTransfered, totalBurned } = token;

      return (
        <div>
          <div className='token-supplied-card-statistic'>
            <Statistic title="Supplied" value={totalSupplied} suffix={symbol}/>
          </div>
          <Divider />
          <div className='token-supplied-card-statistic'>
            <Statistic title="Transfered" value={totalTransfered} prefix={<SwapOutlined />} suffix={symbol} />
            <Statistic title="Burned" value={totalBurned} prefix={<FireOutlined />} suffix={symbol} />
          </div>
        </div>
      )
    }

    return (
      <Empty
        description={
          <Typography.Text>
            No data available as you have not created your token
          </Typography.Text>
        }
      >
        <Action />
      </Empty>
    )
  }

  return (
    <TokenSuppliedCard title="Your Token Economy" bordered={false}>
      {getTokenData()}
    </TokenSuppliedCard>
  );
}

Component.propTypes = {
  token: PropTypes.object.isRequired,
};

export default Component;