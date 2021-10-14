import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: {},
  token: '',
  tokenExpDate: '',
  isAuthenicate: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        user: { ...action.payload.user },
        token: action.payload.token,
        tokenExpDate: action.payload.tokenExpDate,
        isAuthenicate: true,
      };
    case actionTypes.USER_TOKEN_LOGIN:
      return {
        ...state,
        user: { ...action.payload.user },
        token: action.payload.token,
        tokenExpDate: action.payload.tokenExpDate,
        isAuthenicate: true,
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        user: {},
        token: '',
        tokenExpDate: '',
        isAuthenicate: false,
      };
    case actionTypes.USER_DELETED_PLACE:
      const filtredPlaces = state.user.ownPlaces.filter(
        (el) => el._id !== action.payload
      );

      return {
        ...state,
        user: {
          ...state.user,
          ownPlaces: filtredPlaces,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
