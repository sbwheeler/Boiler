import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './react/';

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={App} />
        <Route path="*" component={App} />
      </Route>
    </Router>
  );
};

const mapStateToProps = (state) => { 
  return {
    firstState: state.firstState,
  };
};
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
