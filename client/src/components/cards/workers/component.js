// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Statistic, Typography, Empty, Card } from 'antd';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Statistics } = StyledComponents;

const Component = ({ workers, active, inactive }) => {
  
  const getWorkersData = () => {
    if (workers.length === 0) {
      return (
        <Empty
          description={
            <Typography.Text>
              No data available as you have not registered any employee
            </Typography.Text>
          }
        />
      )
    }

    return (
      <Statistics>
        <Statistic title="Active" value={active} valueStyle={{ color: '#7dd068' }} prefix={<UserAddOutlined />} />
        <Statistic title="Inactive" value={inactive} valueStyle={{ color: '#ff4d4f' }} prefix={<UserDeleteOutlined />} />
      </Statistics>
    )
  }

  return (
    <Card title="Registered Employees" bordered={false}>
      {getWorkersData()}
    </Card>
  );
}

Component.propTypes = {
  workers: PropTypes.object,
  active: PropTypes.number,
  inactive: PropTypes.number,
};

Component.defaultProps = {
  workers: [],
  active: 0,
  inactive: 0
};

export default Component;