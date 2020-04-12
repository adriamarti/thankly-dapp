import styled from 'styled-components';
import { Collapse } from 'antd';

const StyledCollapse = styled(Collapse)`
  background: none;
  border: none;

  & .ant-collapse-header {
    padding: 12px 0 !important;

    & .ant-collapse-extra {
      position: absolute;
      top: 8px;
      right: 0px;
    }
  };

  & .ant-collapse-content-box {
    padding: 0 12px;
  }

  & .ant-list-item {
    padding: 8px 0;
  }

  & .ant-collapse-content-box {
    & svg {
      margin-right: 8px;
    }
  }
`;

const TransactionHeader = styled.div`
  display: flex;
  align-items: center;

  & span {
    margin-right: 3px;
  }
`;

export default {
  StyledCollapse,
  TransactionHeader
};
