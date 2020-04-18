// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getWorkers } from '../../modules/workers/selectors';
import { getPathways } from '../../modules/signIn/selectors';

const mapStateToProps = (state) => ({
  workers: getWorkers(state),
  pathways: getPathways(state),
});

const mapDispatchToProps = (dispatch) => ({
  
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
