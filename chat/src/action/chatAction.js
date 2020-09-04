import Axios from 'axios';
import { 
  CHAT_LIST_REQUEST,
  CHAT_LIST_SUCCESS,
  CHAT_LIST_FAIL
 } from '../constants/chatConstants';

const getChats = (receiverid, userId) => async (dispatch) => {
    dispatch({ type: CHAT_LIST_REQUEST, payload: { receiverid, userId } });
    try {
      const { data } = await Axios.get("/api/chat/getchats", { receiverid, userId });
      dispatch({ type: CHAT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CHAT_LIST_FAIL, payload: error.message });
    }
  }


export {getChats}