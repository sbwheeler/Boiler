import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import AuthComponent from '../components/authComponent';
import { login, signup, logout } from '../../redux/action-creators/authActionCreators';

const mapStateToProps = state => ({ user: state.auth });
const mapDispatchToProps = dispatch => ({
  login: (credentials) => {
    dispatch(login(credentials));
    browserHistory.push('/');
  },
  signup: (credentials) => {
    dispatch(signup(credentials));
    browserHistory.push('/');
  },
  logout: () => {
    dispatch(logout());
    browserHistory.push('/');
  },
});

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
export default AuthContainer;
