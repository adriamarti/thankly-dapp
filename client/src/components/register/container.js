// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getSelectedAddress, getSmartContractInstance } from '../../modules/ethereum/selectors';
import { getRegistrationName } from '../../modules/signUp/selectors'
import { signUpCompanyRequested } from '../../modules/signUp/action-creators';

const mapStateToProps = (state) => ({
  ethereumAddress: getSelectedAddress(state),
  contract: getSmartContractInstance(state),
  registeredName: getRegistrationName(state),
});

const mapDispatchToProps = (dispatch) => ({
  registerCompany: (email, name, password, ethereumAddress) => {
    dispatch(signUpCompanyRequested(email, name, password, ethereumAddress))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
