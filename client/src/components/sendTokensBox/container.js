// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getWorkers } from '../../modules/workers/selectors';
import { getUserId, getCompanyId } from '../../modules/signIn/selectors';
import { getAddress } from '../../modules/company/selectors';
import { sendTokensRequested } from '../../modules/workers/action-creators';
import { getRequestStatus } from '../../root/requests/selectors';

const mapStateToProps = (state) => ({
  address: getAddress(state),
  workers: getWorkers(state),
  id: getUserId(state).toString(),
  companyId: getCompanyId(state).toString(),
  requestStatus: getRequestStatus(state, 'SEND_TOKENS_REQUESTED'),
});

const mapDispatchToProps = (dispatch) => ({
  sendTokens: (payload) => {
    dispatch(sendTokensRequested(payload))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
