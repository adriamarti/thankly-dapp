// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { editWorkersRequested } from '../../modules/workers/action-creators';
import { getPathways } from '../../modules/signIn/selectors';
import { getRequestStatus } from '../../root/requests/selectors';

const mapStateToProps = (state) => ({
  pathways: getPathways(state),
  requestStatus: getRequestStatus(state, 'EDIT_WORKERS_REQUESTED'),
});

const mapDispatchToProps = (dispatch) => ({
  editWorkers: (_id, email, name, pathwayId) => {
    dispatch(editWorkersRequested(_id, email, name, pathwayId))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
