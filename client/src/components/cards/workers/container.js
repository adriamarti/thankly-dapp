// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getWorkers, getActiveWorkers, getInactiveWorkers } from '../../../modules/workers/selectors';

const mapStateToProps = (state) => ({
  workers: getWorkers(state),
  active: getActiveWorkers(state),
  inactive: getInactiveWorkers(state),
});

const mapDispatchToProps = (dispatch) => ({
  
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
