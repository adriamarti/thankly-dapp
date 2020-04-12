import styled from 'styled-components';
import { Layout, Button, Typography } from 'antd';

const Header = styled(Layout.Header)`
  background-color: #fff;
  width: 100%;
  padding: 0;
`;

const Navigation = styled.div`
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  margin: 0 auto;
  height: 100%;
  padding: 0 25px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 10px;
`;

const SignInButton = styled(Button)`
  width: 100%;
`;

export default {
  Header,
  SignInButton,
  User,
  UserName,
  Navigation,
};