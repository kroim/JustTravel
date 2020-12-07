import {combineReducers} from 'redux';

import  authReducer from './authReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({authReducer, homeReducer});
export default rootReducer;
