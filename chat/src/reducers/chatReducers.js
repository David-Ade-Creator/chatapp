const { CHAT_LIST_REQUEST,CHAT_LIST_SUCCESS,CHAT_LIST_FAIL } = require("../constants/chatConstants")


function messageListReducer(state ={messages:[]}, action){
    switch(action.type){
        case CHAT_LIST_REQUEST:
            return {loading:true};
        case CHAT_LIST_SUCCESS:
            return {loading:false, messages:action.payload};
        case CHAT_LIST_FAIL:
            return {loading:false, error:action.payload};
        default: return state;
        }
}



export {messageListReducer};