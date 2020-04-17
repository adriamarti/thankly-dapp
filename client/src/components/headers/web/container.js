// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { isFetchingAsyncAction } from '../../../root/requests/selectors';
import { signInRequested } from '../../../modules/signIn/action-creators';
import { SIGN_IN_REQUESTED } from '../../../modules/signIn/action-types';

const mapStateToProps = (state) => ({
  singingIn: isFetchingAsyncAction(state, SIGN_IN_REQUESTED),
});

const mapDispatchToProps = (dispatch) => ({
  signIn: ({ email, password, typeOfUser }) => {
    dispatch(signInRequested(email, password, typeOfUser))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
