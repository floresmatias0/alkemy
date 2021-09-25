import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from './actions'

const initialState = {
    user : false,
    userLoading : true,
    userError : ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_REQUEST:
        return {
          ...state,
          userLoading: true,
        };
      case GET_USER_SUCCESS:
        return {
          ...state,
          userLoading: false,
          user: action.payload,
        };
      case GET_USER_FAILURE:
        return {
          ...state,
          userError: "Error 404 not found",
          userLoading: false,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;