// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Statistic } from 'antd';
import { FireOutlined, SwapOutlined } from '@ant-design/icons';
import Action from './action'

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { TokenSuppliedCard } = StyledComponents;

const Component = ({ token }) => {

  const getTokenData = () => {
    if (token.name) {
      const { symbol, balance } = token
      const { transferableTokens, burnableTokens } = balance;

      return (
        <div>
          <div className='token-supplied-card-statistic'>
            <Statistic title="Transferable" value={transferableTokens} prefix={<SwapOutlined />} suffix={symbol} />
            <Statistic title="Burnable" value={burnableTokens} prefix={<FireOutlined />} suffix={symbol} />
          </div>
          <Action />       
        </div>
      )
    }
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