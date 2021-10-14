import * as actionTypes from '../actions/actionTypes';

const storeUserData = (data) => {
  return {
    type: actionTypes.USER_LOGIN,
    payload: data,
  };
};

const logout = () => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};

const tokenLogin = (data) => {
  return {
    type: actionTypes.USER_TOKEN_LOGIN,
    payload: data,
  };
};

const updatePlaces = (id) => {
  return {
    type: actionTypes.USER_DELETED_PLACE,
    payload: id,
  };
};

export { storeUserData, logout, updatePlaces, tokenLogin };
