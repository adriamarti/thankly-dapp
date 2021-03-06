import styled from 'styled-components';
import { Menu } from 'antd';
import { ReactComponent as Icon } from '../../assets/images/thankly_icon.svg'
import { ReactComponent as Logo } from '../../assets/images/thankly_logo.svg'

const ThanklyIcon = styled(Icon)`
  height: 35px;
  fill: #c3c4c5;
  transform: translateX(-6px);
`;

const ThanklyLogo = styled(Logo)`
  height: 45px;
  fill: #fff;
  transform: translate(18px, 10px);
`;

const LogoMenuItem = styled(Menu.Item)`
  height: 64px !important;
  opacity: 1 !important;
  background-color: rgb(0, 33, 64) !important;
  cursor: default !important;
  margin: 0 !important;
`;

const StyledMenuItem = styled(Menu.Item)`
  margin: 0 !important;
  height: 40px !important;
`;

export default {
  ThanklyIcon,
  ThanklyLogo,
  LogoMenuItem,
  StyledMenuItem,
};

