// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getWorkersRequested } from '../../modules/workers/action-creators';
import { getTokenRequested } from '../../modules/token/action-creators';
import { getUserId } from '../../modules/signIn/selectors';
import { getSelectedAddress, getSmartContractInstance } from '../../modules/ethereum/selectors';

const mapStateToProps = (state) => ({
  id: getUserId(state).toString(),
  address: getSelectedAddress(state),
  contract: getSmartContractInstance(state),
});

const mapDispatchToProps = (dispatch) => ({
  getWorkers: (companyId) => {
    dispatch(getWorkersRequested(companyId))
  },
  getToken: (contract, address) => {
    dispatch(getTokenRequested(contract, address))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
