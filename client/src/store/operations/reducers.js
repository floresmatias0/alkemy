import {
    GET_OPERATION_REQUEST,
    GET_OPERATION_SUCCESS,
    GET_OPERATION_FAILURE
} from './actions'

const initialState = {
    operations : [],
    operationsLoading : true,
    operationsError : ""
}

const operationReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_OPERATION_REQUEST:
        return {
          ...state,
          operationsLoading: true,
        };
      case GET_OPERATION_SUCCESS:
        return {
          ...state,
          operationsLoading: false,
          operations: action.payload,
        };
      case GET_OPERATION_FAILURE:
        return {
          ...state,
          operationsError: "Error 404 not found",
          operationsLoading: false,
        };
      default:
        return state;
    }
  };
  
  export default operationReducer;
