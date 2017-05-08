import React from 'react';
import { Link } from 'react-router';

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Link to='/auth'>Authentication</Link>
    </div>
  );
};

export default App;
