import styled from 'styled-components';
import { Layout, Button } from 'antd';

const HeaderWrapper = styled(Layout.Header)`
  background-color: #fff;
  position: fixed;
  z-index: 1;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  margin-right: 20px;
`;

const SignInButton = styled(Button)`
  width: 100%;
`;

export default {
  HeaderWrapper,
  Header,
  Navigation,
  Image,
  SignInButton,
};