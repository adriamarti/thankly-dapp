// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getToken } from '../../../../modules/token/selectors';
import Component from './component';
import { getPathways, getUserId } from '../../../../modules/signIn/selectors';
import { registerWorkersRequested } from '../../../../modules/workers/action-creators';
import { getWorkers } from '../../../../modules/workers/selectors';
import { getSelectedAddress, getSmartContractInstance } from '../../../../modules/ethereum/selectors';

const mapStateToProps = (state) => ({
  id: getUserId(state),
  token: getToken(state),
  pathways: getPathways(state),
  workers: getWorkers(state),
  contract: getSmartContractInstance(state),
  address: getSelectedAddress(state),
});

const mapDispatchToProps = (dispatch) => ({
  registerWorker: (companyId, name, email, pathwayId, contract, address) => {
    dispatch(registerWorkersRequested(companyId, name, email, pathwayId, contract, address))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
