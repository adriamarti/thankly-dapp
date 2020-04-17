// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getUser } from '../../../modules/signIn/selectors';
import { getToken } from '../../../modules/token/selectors';
import Component from './component';

const mapStateToProps = (state) => ({
  token: getToken(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Component);
