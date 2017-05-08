import axios from 'axios';

import { SET, REMOVE } from '../constants/';

const setUser = user => ({ type: SET, user });
const removeUser = () => ({ type: REMOVE });

export const login = credentials => (dispatch) => {
  axios.post('/api/auth/login', credentials)
     .then(res => dispatch(setUser(res.data)))
     .catch(err => console.error('Login unsuccesful', err));
};

export const signup = credentials => (dispatch) => {
  axios.post('/api/auth/signup', credentials)
     .then(res => dispatch(setUser(res.data)))
     .catch(err => console.error('Signup unsuccesful', err));
};

export const retrieveLoggedInUser = () => (dispatch) => {
  axios.get('/api/auth/me')
    .then(res => dispatch(setUser(res.data)))
    .catch(err => console.error('retrieveLoggedInUser unsuccesful', err));
};

export const logout = () => (dispatch) => {
  dispatch(removeUser());
  axios.get('/auth/logout')
    .catch(err => console.error('logout unsuccesful', err));
};

