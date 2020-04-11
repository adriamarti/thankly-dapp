// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Typography, Col, Card, Statistic, Divider, Button, Tabs, List } from 'antd';
import { DollarOutlined, UserAddOutlined, UserDeleteOutlined, SwapOutlined, FireOutlined } from '@ant-design/icons';
import AppHeader from '../../components/headers/app';
import Sider from '../../components/sider'

import registerEmployee from '../../assets/images/flame-sign-up.png'

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { StyledContent, ButtonsWrapper, StyledButton, Image, StyledColLeft, StyledColRight, RegisterWrapper, TokenSuppliedCard, WorkersCard, RegisterWorkerCard } = StyledComponents;
const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const workers = [
  {
    name: 'Dunya Salazar',
    email: 'dunya.salazar@gmail.com',
    job: 'Junior Developer',
  },
  {
    name: 'Dunya Salazar',
    email: 'dunya.salazar@gmail.com',
    job: 'Junior Developer',
  },
  {
    name: 'Dunya Salazar',
    email: 'dunya.salazar@gmail.com',
    job: 'Junior Developer',
  },
  {
    name: 'Dunya Salazar',
    email: 'dunya.salazar@gmail.com',
    job: 'Junior Developer',
  },
];

const Component = () => {
  return (
    <Layout className="layout">
      <AppHeader />
      <Sider />
      <StyledContent>
        <Row gutter={50}>
          <Col className="gutter-row" span={16}>
            <Title>
              Welcome to your dashboard
            </Title>
            <Paragraph>
              This is the dashboard of the company. Through it you have the opportunity to transfer your company's tokens so that your workers can make good collaborations public.
            </Paragraph>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Registered Employees" key="1">
                <List
                  itemLayout="horizontal"
                  dataSource={workers}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={`${item.name} | ${item.email}`}
                        description={item.job}
                      />
                      <Button type="primary" shape="circle" icon={<SwapOutlined />} size="large" />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="Transactions" key="2">
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </Col>
          <Col className="gutter-row" span={8}>
            <RegisterWorkerCard cover={<img alt="Register" src={registerEmployee} />}>
              <Button type="primary" icon={<UserAddOutlined />} size="large">
                Register a new employee
              </Button>
            </RegisterWorkerCard>
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
            <WorkersCard title="Registered Employees" bordered={false}>
              <Statistic title="Active" value={1128} valueStyle={{ color: '#3f8600' }} prefix={<UserAddOutlined />} />
              <Statistic title="Inactive" value={1128} valueStyle={{ color: '#cf1322' }} prefix={<UserDeleteOutlined />} />
            </WorkersCard>
          </Col>         
        </Row>
      </StyledContent>
    </Layout>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;