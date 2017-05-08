import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './react/';
import AuthContainer from './react/containers/authContainer';

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/">
        <Route path="/auth" component={AuthContainer} />
        <IndexRoute component={App} />
      </Route>
    </Router>
  );
};

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
