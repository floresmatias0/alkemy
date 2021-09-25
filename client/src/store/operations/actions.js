import axios from 'axios';

export const GET_OPERATION_REQUEST = 'GET_OPERATION_REQUEST';
export const GET_OPERATION_SUCCESS = 'GET_OPERATION_SUCCESS';
export const GET_OPERATION_FAILURE = 'GET_OPERATION_FAILURE';

export const getAllOperations = (idUser) => {
    return async (dispatch) => {
        dispatch(getOperationRequest())
        return await axios.get(`http://localhost:3001/users/${idUser}`)
        .then(op => dispatch(getOperationSuccess(op.data.operations)))
        .catch(err => dispatch(getOperationFailure(err)))
    }
}

export const getOperationsFilter = (type) => {
    return async (dispatch) => {
        dispatch(getOperationRequest())
        return await axios.get('http://localhost:3001/operations')
        .then(op => type ? dispatch(getOperationSuccess(op.data.filter(elem => elem.type === type))) : dispatch(getOperationSuccess(op.data)))
        .catch(err => dispatch(getOperationFailure(err)))
    }
}

export const deleteOperation = (operationId) => {
    return async (dispatch,getState) => {
        let state = getState().operationReducer.operations
        dispatch(getOperationRequest())
        return await axios.delete(`http://localhost:3001/operations/delete/${operationId}`)
        .then(() => dispatch(getOperationSuccess(state.filter(elem => elem.id !== operationId))))
        .catch(err => dispatch(getOperationFailure(err))) 
        
    }
}

export const putOperation = (idOperation,concept,mount,type) => {
    return async (dispatch) => {
        dispatch(getOperationRequest())
        let options = {
            "method": "PUT",
            "url": `http://localhost:3001/operations/update/${idOperation}`,
            "header" : {
                ContentType : "application/json"
            },
            "data": {
                concept,
                mount,
                type 
            }
        }
        await axios.request(options)
        getAllOperations()(dispatch)
    }
}

const getOperationRequest = () => {
    return {
        type: GET_OPERATION_REQUEST
    }
}

const getOperationSuccess = (operations) => {
    return {
        type: GET_OPERATION_SUCCESS,
        payload: operations
    }
}

const getOperationFailure = (error) => {
    return {
        type: GET_OPERATION_FAILURE,
        payload: error
    }
}