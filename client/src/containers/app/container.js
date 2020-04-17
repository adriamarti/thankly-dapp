// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import {
  getEthereumAddressRequested,
  getEthereumNetworkRequested,
  createContractInterface,
} from '../../modules/ethereum/action-creators';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  getEthereumAddress: () => {
    dispatch(getEthereumAddressRequested())
  },
  getEthereumNetwork: () => {
    dispatch(getEthereumNetworkRequested())
  },
  setSmartContract: (web3Instance, contractAddress) => {
    dispatch(createContractInterface(web3Instance, contractAddress))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
