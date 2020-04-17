// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Statistic, Divider, Empty, Typography, Button } from 'antd';
import { DollarOutlined, FireOutlined, SwapOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { TokenSuppliedCard } = StyledComponents;

const Component = ({ token }) => {

  const getTokenData = () => {
    const { symbol, totalTransferred, totalBurned } = token;
    if (token.name) {
      const { symbol, totalTransferred, totalBurned } = token;

      return (
        <div>
          <div className='token-supplied-card-statistic'>
            <Statistic title="Supplied" value={totalTransferred + totalBurned} prefix={<DollarOutlined />} suffix={symbol}/>
          </div>
          <Divider />
          <div className='token-supplied-card-statistic'>
            <Statistic title="Transfered" value={totalTransferred} prefix={<SwapOutlined />} />
            <Statistic title="Burned" value={totalBurned} prefix={<FireOutlined />} />
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
        <Button type="primary">Create My Token</Button>
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