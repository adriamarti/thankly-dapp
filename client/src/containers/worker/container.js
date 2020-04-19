// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getWorkersRequested } from '../../modules/workers/action-creators';
import { getCompanyRequested } from '../../modules/company/action-creators';
import { getTokenRequested } from '../../modules/token/action-creators';
import { getCompanyId, getUserId } from '../../modules/signIn/selectors';
import { getAddress } from '../../modules/company/selectors';
import { getSmartContractInstance } from '../../modules/ethereum/selectors'

const mapStateToProps = (state) => ({
  id: getUserId(state).toString(),
  companyId: getCompanyId(state).toString(),
  address: getAddress(state),
  contract: getSmartContractInstance(state),
});

const mapDispatchToProps = (dispatch) => ({
  getCompany: (companyId) => {
    dispatch(getCompanyRequested(companyId))
  },
  getWorkers: (companyId) => {
    dispatch(getWorkersRequested(companyId))
  },
  getToken: (contract, address, id) => {
    dispatch(getTokenRequested(contract, address, id))
  },
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
