import axios from 'axios';

import { SET, REMOVE } from '../constants/';

// auth reducer, handling login and logout
export default function reducer(currentUser = null, action) {
  switch (action.type) {
    case SET:
      return action.user;
    case REMOVE:
      return null;
    default:
      return currentUser;
  }
}

