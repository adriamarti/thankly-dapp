// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Component from './component';
import { getPathways, getUserId } from '../../modules/signIn/selectors';

const mapStateToProps = (state) => ({
  pathways: getPathways(state),
  companyId: getUserId(state).toString(),
});

const mapDispatchToProps = (dispatch) => ({
  
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
