// External Dependencies
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Typography, Col, Tabs } from 'antd';
import AppHeader from '../../components/headers/app';
import Sider from '../../components/sider'
import Employees from '../../components/employees'
import Transactions from '../../components/transactions';
import WorkerTokens from '../../components/cards/workerTokens';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { StyledContent } = StyledComponents;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const Component = ({ id, getCompany, getWorkers, companyId, address, getToken, contract }) => {

  const getContent = () => {
    return (
      <div>
        <Title>
          Welcome to your dashboard
        </Title>
        <Paragraph>
          This is the dashboard of the employee. Start interacting with your team mates. Does someone did outstanding work that helped you or your team somehow? Don hesitate to give thanks to him.
        </Paragraph>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Colleagues" key="1">
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
    getCompany(companyId);
    getWorkers(companyId);
    // getToken(contract, address, companyId);
  }, [])

  useEffect(() => {
    if (address.length > 0) {
      getToken(contract, address, id);
    }
  }, [address])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider selectedSiderItem={'home'}/>
      <Layout className="site-layout">
        <AppHeader />
        <StyledContent>
          <Row gutter={50}>
            <Col className="gutter-row" span={16}>
              {getContent()}
            </Col>
            <Col className="gutter-row" span={8}>
              <WorkerTokens />
            </Col>         
          </Row>
        </StyledContent>
      </Layout>
    </Layout>
  );
}

Component.propTypes = {
  id: PropTypes.string.isRequired,
  companyId: PropTypes.string.isRequired,
  getCompany: PropTypes.func.isRequired,
  getWorkers: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  contract: PropTypes.object.isRequired,
};

export default Component;