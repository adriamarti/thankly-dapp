import styled from 'styled-components';
import { Layout, Button } from 'antd';

const Header = styled(Layout.Header)`
  background-color: #fff;
  position: fixed;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 10px;
`;

const Image = styled.img`
  margin-right: 20px;
`;

const SignInButton = styled(Button)`
  width: 100%;
`;

export default {
  Header,
  Image,
  SignInButton,
  User,
  UserName,
};