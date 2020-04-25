// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { signInRequested } from '../../modules/signIn/action-creators';
import { getSelectedAddress } from '../../modules/ethereum/selectors';
import { getRequestStatus } from '../../root/requests/selectors';

const mapStateToProps = (state) => ({
  ethereumAddress: getSelectedAddress(state),
  requestStatus: getRequestStatus(state, 'SIGN_IN_REQUESTED'),
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (email, password, typeOfUser) => {
    dispatch(signInRequested(email, password, typeOfUser))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
