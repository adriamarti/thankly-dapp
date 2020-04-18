// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getWorkersRequested } from '../../modules/workers/action-creators';
import { getUserId } from '../../modules/signIn/selectors';

const mapStateToProps = (state) => ({
  id: getUserId(state).toString(),
});

const mapDispatchToProps = (dispatch) => ({
  getWorkers: (companyId) => {
    dispatch(getWorkersRequested(companyId))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
