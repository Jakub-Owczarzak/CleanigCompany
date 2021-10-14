import { combineReducers } from 'redux';

import modalReducer from './reduers/modalReducer';
import authReducer from './reduers/authReducer';

const rootReducer = combineReducers({ modalReducer, authReducer });

export default rootReducer;
