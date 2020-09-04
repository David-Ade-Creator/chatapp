import Axios from 'axios';
import Cookie from 'js-cookie';
import { 
  USER_SIGNIN_REQUEST, 
  USER_SIGNIN_SUCCESS, 
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  LIST_USER_REQUEST,
  LIST_USER_SUCCESS,
  LIST_USER_FAIL,
  USER_ACTIVATE_REQUEST,
  USER_ACTIVATE_SUCCESS,
  USER_ACTIVATE_FAIL,
  USER_FORGOT_REQUEST,
  USER_FORGOT_SUCCESS,
  USER_FORGOT_FAIL ,
  USER_RESET_REQUEST,
  USER_RESET_SUCCESS,
  USER_RESET_FAIL,
  USER_LOGOUT
 } from '../constants/userConstants';

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post("/api/users/signin", { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload:error });
    }
  }

const activateUser =(token) => async (dispatch)=> {
    dispatch({type: USER_ACTIVATE_REQUEST, payload:token});
    try {
      const {message} = await Axios.post('/api/users/activate', {token});
      dispatch({type:USER_ACTIVATE_SUCCESS, payload:message});
    } catch (error) {
      dispatch({type: USER_ACTIVATE_FAIL, payload:error.errors});
    }
  }


  const signup = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
      const { data } = await Axios.post("/api/users/signup", { name, email, password });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  }

  const forgotPassword = (email) => async (dispatch)=> {
    dispatch ({type: USER_FORGOT_REQUEST, payload: email});
    try {
      const {data} = Axios.put('/api/users/forgetPassword', {email})
      dispatch ({type: USER_FORGOT_SUCCESS, payload:data });
    } catch (error) {
      dispatch ({type: USER_FORGOT_FAIL,payload:error});
    }
  }

  const resetNewPassword = (resetpasswordLink,newPassword) => async (dispatch)=> {
    dispatch ({type: USER_RESET_REQUEST, payload: {resetpasswordLink,newPassword}});
    try {
      const {data} = Axios.put('/api/users/resetPassword', {resetpasswordLink,newPassword})
      dispatch ({type: USER_RESET_SUCCESS, payload:data });
    } catch (error) {
      dispatch ({type: USER_RESET_FAIL,payload:error});
    }
  }

  const listUser = (userId) => async (dispatch, getState) => {
      try {
          dispatch({type: LIST_USER_REQUEST });
          const { userSignin: { userInfo } } = getState();
          const {data} = await Axios.get("/api/users/:userId", {
            headers:
        { Authorization: 'Bearer ' + userInfo.token }  
          });
          dispatch({ type: LIST_USER_SUCCESS, payload: data})
      } catch (error) {
          dispatch({ type: LIST_USER_FAIL, payload: error.message});
      }
  }

  const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
  }


export {signin,signup,logout, listUser, activateUser,forgotPassword,resetNewPassword}