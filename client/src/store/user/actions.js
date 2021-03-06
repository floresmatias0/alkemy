export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const loginUser = (user) => {
    return async (dispatch) => {
        dispatch(getUserRequest())
        try{
            dispatch(getUserSuccess(user))
        }catch(err){
            dispatch(getUserFailure(err)) 
        }
    }
}

export const checkUserState = () => {
    return async (dispatch) => {
        dispatch(getUserRequest())
        try{
            let user = localStorage.getItem("user")

            if(user){
                dispatch(getUserSuccess(user))  
            }else{
                dispatch(getUserSuccess(false))
            }

        }catch(err){
            dispatch(getUserFailure(err)) 
        }
    }
}

const getUserRequest = () => {
    return {
        type: GET_USER_REQUEST
    }
}

const getUserSuccess = (user) => {
    return {
        type: GET_USER_SUCCESS,
        payload: user
    }
}

const getUserFailure = (error) => {
    return {
        type: GET_USER_FAILURE,
        payload: error
    }
}