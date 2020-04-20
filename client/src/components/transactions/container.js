// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getWorkers } from '../../modules/workers/selectors'
import { getUser, getUserTransactions } from '../../modules/signIn/selectors';
import { getName } from '../../modules/company/selectors';

const mapStateToProps = (state) => ({
  workers: getWorkers(state),
  user: getUser(state),
  transactions: getUserTransactions(state),
  companyName: getName(state),
});

const mapDispatchToProps = (dispatch) => ({
  
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
