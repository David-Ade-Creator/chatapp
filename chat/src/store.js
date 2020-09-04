import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import {composeWithDevTools} from 'redux-devtools-extension';
import { userSigninReducer, userSignupReducer, listUsersReducer, activateuserReducer, forgotpasswordReducer, resetpasswordReducer } from './reducers/userReducers';
import { messageListReducer } from './reducers/chatReducers';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
    userSignin: {userInfo}
};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userSignup:userSignupReducer,
    listUsers:listUsersReducer,
    messageList: messageListReducer,
    activatedUser:activateuserReducer,
    forgetPassword:forgotpasswordReducer,
    resetPassword:resetpasswordReducer
})

const store = createStore(
    reducer, 
    initialState , 
    composeWithDevTools(applyMiddleware(thunk)));
export default store;