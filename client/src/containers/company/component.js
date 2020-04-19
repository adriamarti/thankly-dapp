// External Dependencies
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Typography, Col, Tabs } from 'antd';
import AppHeader from '../../components/headers/app';
import Sider from '../../components/sider'
import Employees from '../../components/employees'
import Transactions from '../../components/transactions';
import RegisterWorkerCard from '../../components/cards/registerWorker';
import TokenSuppliedCard from '../../components/cards/tokenSupplied';
import WorkersCard from '../../components/cards/workers';
import AccountSettings from '../../components/accountSettings';
import PathwaySettings from '../../components/pathwaySettings';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { StyledContent } = StyledComponents;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const Component = ({ content, getWorkers, id, address, getToken, contract }) => {

  const getContent = (content) => {
    if (content === 'settings') {
      return (
        <div>
          <Title>
            Configure your account
          </Title>
          <Paragraph>
            Here you can configure the basic details of your account.
          </Paragraph>
          <AccountSettings />
          <Title>
            Configure your token economy
          </Title>
          <Paragraph>
            In order to enable transactions between your employees you need to configure the available pathways from your economy. This pathways will determinate how many tokens will be transfered to each employee.
          </Paragraph>
          <PathwaySettings />
        </div>
      )
    }

    return (
      <div>
        <Title>
          Welcome to your dashboard
        </Title>
        <Paragraph>
          This is the dashboard of the company. Through it you have the opportunity to transfer your company's tokens so that your workers can make good collaborations public.
        </Paragraph>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Registered Employees" key="1">
            <Employees />
          </TabPane>
          <TabPane tab="Transactions" key="2">
            <Transactions />
          </TabPane>
        </Tabs>
      </div>
    )
  }

  useEffect(() => {
    getWorkers(id);
    getToken(contract, address);
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider selectedSiderItem={content === 'settings' ? 'settings' : 'home'}/>
      <Layout className="site-layout">
        <AppHeader />
        <StyledContent>
          <Row gutter={50}>
            <Col className="gutter-row" span={16}>
              {getContent(content)}
            </Col>
            <Col className="gutter-row" span={8}>
              <RegisterWorkerCard />
              <TokenSuppliedCard />
              <WorkersCard />
            </Col>         
          </Row>
        </StyledContent>
      </Layout>
    </Layout>
  );
}

Component.propTypes = {
  getWorkers: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  contract: PropTypes.object.isRequired,
};

export default Component;