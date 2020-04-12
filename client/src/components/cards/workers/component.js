// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Statistic } from 'antd';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { WorkersCard } = StyledComponents;

const Component = () => {
  return (
    <WorkersCard title="Registered Employees" bordered={false}>
      <Statistic title="Active" value={1128} valueStyle={{ color: '#7dd068' }} prefix={<UserAddOutlined />} />
      <Statistic title="Inactive" value={1128} valueStyle={{ color: '#ff4d4f' }} prefix={<UserDeleteOutlined />} />
    </WorkersCard>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;