import styled from 'styled-components';
import { Menu, List } from 'antd';
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

const ListItem = styled(List.Item)`
  border-bottom: 1px solid #d9d9d9 !important;
`;

const ListItemMeta = styled(List.Item.Meta)`
  &.inactive {
    & .ant-avatar {
      background-color: #ff4d4f !important;
    }
  }

  &.active {
    & .ant-avatar {
      background-color: #7dd068 !important;
    }
  }
`

const Actions = styled.div`
  display: flex;
  & div:first-child {
    margin-right: 10px;
  }
`;

export default {
  ThanklyIcon,
  ThanklyLogo,
  LogoMenuItem,
  ListItemMeta,
  StyledMenuItem,
  ListItem,
  Actions,
};

