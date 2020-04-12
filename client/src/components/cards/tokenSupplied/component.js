// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Statistic, Divider } from 'antd';
import { DollarOutlined, FireOutlined, SwapOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { TokenSuppliedCard } = StyledComponents;

const Component = () => {
  return (
    <TokenSuppliedCard title="Your Token Economy" bordered={false}>
      <div className='token-supplied-card-statistic'>
        <Statistic title="Supplied" value={1128} prefix={<DollarOutlined />} />
      </div>
      <Divider />
      <div className='token-supplied-card-statistic'>
        <Statistic title="Transfered" value={1128} prefix={<SwapOutlined />} />
        <Statistic title="Burned" value={1128} prefix={<FireOutlined />} />
      </div>
    </TokenSuppliedCard>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;