const { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_FAIL, 
    LIST_USER_REQUEST, 
    LIST_USER_SUCCESS, 
    LIST_USER_FAIL, 
    USER_ACTIVATE_REQUEST, 
    USER_ACTIVATE_SUCCESS, 
    USER_ACTIVATE_FAIL,
    USER_FORGOT_REQUEST,
    USER_FORGOT_SUCCESS,
    USER_FORGOT_FAIL, 
    USER_RESET_REQUEST,
    USER_RESET_SUCCESS,
    USER_RESET_FAIL
} = require("../constants/userConstants")

function userSigninReducer(state={}, action){
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading:false, error: action.payload};
            default: 
            return state;
    }
}


function activateuserReducer(state={}, action){
    switch(action.type){
        case USER_ACTIVATE_REQUEST:
            return {loading:true};
        case USER_ACTIVATE_SUCCESS:
            return {loading: false, message: action.payload};
        case USER_ACTIVATE_FAIL:
            return {loading:false, error: action.payload};
            default: 
            return state;
    }
}


function forgotpasswordReducer(state={}, action){
    switch(action.type){
        case USER_FORGOT_REQUEST:
            return {loading:true};
        case USER_FORGOT_SUCCESS:
            return {loading: false, message: action.payload};
        case USER_FORGOT_FAIL:
            return {loading:false, error: action.payload};
            default: 
            return state;
    }
}

function resetpasswordReducer(state={}, action){
    switch(action.type){
        case USER_RESET_REQUEST:
            return {loading:true};
        case USER_RESET_SUCCESS:
            return {loading: false, message: action.payload};
        case USER_RESET_FAIL:
            return {loading:false, error: action.payload};
            default: 
            return state;
    }
}

function userSignupReducer(state={}, action){
    switch(action.payload){
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading:false, userInfo: action.payload, success:true};
        case USER_REGISTER_FAIL:
            return {loading:false, error: action.payload,success:false};

        default:
            return state;
    }
}

function listUsersReducer(state ={
    users: []
}, action){
    switch(action.type){
        case LIST_USER_REQUEST:
            return {loading:true};
        case LIST_USER_SUCCESS:
            return {loading:false, users:action.payload};
        case LIST_USER_FAIL:
            return {loading:false, error:action.payload};
        default: return state;
        }
}



export {
    userSigninReducer,
    userSignupReducer,
    activateuserReducer,
    listUsersReducer,
    forgotpasswordReducer,
    resetpasswordReducer
}; 