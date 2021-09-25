import { combineReducers } from 'redux';
import operationReducer from './operations/reducers';
import userReducer from './user/reducers';

export default combineReducers({
    operationReducer,
    userReducer
})