// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { addPathwayRequested } from '../../../modules/signIn/action-creators'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  addPathway: (companyId, name, amount) => {
    dispatch(addPathwayRequested(companyId, name, amount))
  }
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
