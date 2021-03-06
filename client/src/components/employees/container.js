// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getWorkers } from '../../modules/workers/selectors';
import { getPathways } from '../../modules/signIn/selectors';
import { getCompanyPathways } from '../../modules/company/selectors';
import { getUserId } from '../../modules/signIn/selectors';

const mapStateToProps = (state) => ({
  id: getUserId(state).toString(),
  workers: getWorkers(state),
  pathways: getPathways(state),
  pathwaysFromCompany: getCompanyPathways(state),
});

const mapDispatchToProps = (dispatch) => ({
  
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
