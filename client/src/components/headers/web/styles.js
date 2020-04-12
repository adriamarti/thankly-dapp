import styled from 'styled-components';
import { Layout, Button } from 'antd';
import { ReactComponent as Icon } from '../../../assets/images/thankly_icon.svg'
import { ReactComponent as Logo } from '../../../assets/images/thankly_logo.svg'

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

const ThanklyIcon = styled(Icon)`
  height: 35px;
  margin-right: 15px;
  fill: #c3c4c5
`;

const ThanklyLogo = styled(Logo)`
  height: 45px;
  fill: #1890ff;
`;

export default {
  HeaderWrapper,
  Header,
  Navigation,
  Image,
  SignInButton,
  ThanklyLogo,
  ThanklyIcon,
};