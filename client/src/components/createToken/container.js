// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getEthereumAddress } from '../../modules/ethereum/selectors';
import Component from './component';

const mapStateToProps = (state) => ({
  ethereumAddress: getEthereumAddress(state),
});

const mapDispatchToProps = (dispatch) => ({
  
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
