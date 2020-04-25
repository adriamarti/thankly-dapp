// External Dependencies
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Typography } from 'antd';
import WebHeader from '../../components/headers/web';
import Resgister from '../../components/register'

import joinCommunity from '../../assets/images/join-community.png'
import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { StyledContent, ButtonsWrapper, StyledButton, Image, StyledColLeft, StyledColRight, RegisterWrapper } = StyledComponents;
const { Title, Paragraph } = Typography;
const { Footer } = Layout;

const Component = ({ getEthereumAddress }) => {
  useEffect(() => {
    getEthereumAddress();
  }, []);

  return (
    <Layout className="layout">
      <WebHeader />
      <StyledContent>
        <RegisterWrapper>
          <Row gutter={50}>
            <StyledColLeft className="gutter-row" span={12}>
              <Title>
                Join our community and engage with your employees
              </Title>
              <Paragraph>
                Thankly makes exceptional work visible to everyone in your organization, boosting morale with a shared sense of purpose and positivity. It is based on the Ethereum Blockchain Platform which gives a 100% transparency on all transaction done between employees and companies.
              </Paragraph>
              <ButtonsWrapper>
                <Resgister />
                <StyledButton size="large" disabled={true}>Take a tour</StyledButton>
              </ButtonsWrapper>
            </StyledColLeft>
            <StyledColRight className="gutter-row" span={12}>
              <Image src={joinCommunity} with="100%" height="auto" alt="Join our community" />
            </StyledColRight>
          </Row>
        </RegisterWrapper>
      </StyledContent>
      <Footer style={{ textAlign: 'center', position: 'absolute', bottom: '10px', width: '100%' }}>Created by Adrià Martí - adria.marti.blasco@gmail.com</Footer>
    </Layout>
  );
}

Component.propTypes = {
  getEthereumAddress: PropTypes.func.isRequired,
};

export default Component;