// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getUserId } from '../../modules/signIn/selectors';
import { getSelectedAddress, getSmartContractInstance } from '../../modules/ethereum/selectors';
import { getToken } from '../../modules/token/selectors';
import { addTransactionRequested } from '../../modules/workers/action-creators';
import { getTokenRequested } from '../../modules/token/action-creators';

const mapStateToProps = (state) => ({
  token: getToken(state),
  id: getUserId(state),
  address: getSelectedAddress(state),
  contract: getSmartContractInstance(state),
});

const mapDispatchToProps = (dispatch) => ({
  addTransaction: (transaction) => {
    dispatch(addTransactionRequested(transaction))
  },
  updateToken: (contract, address) => {
    dispatch(dispatch(getTokenRequested(contract, address)))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
