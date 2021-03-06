// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getEthereumAddressRequested } from '../../modules/ethereum/action-creators';

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  getEthereumAddress: () => {
    dispatch(getEthereumAddressRequested())
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
