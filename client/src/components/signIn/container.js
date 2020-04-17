// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { signInRequested } from '../../modules/signIn/action-creators';
import { getUser } from '../../modules/signIn/selectors';
import { getSelectedAddress } from '../../modules/ethereum/selectors';

const mapStateToProps = (state) => ({
  user: getUser(state),
  ethereumAddress: getSelectedAddress(state),
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
