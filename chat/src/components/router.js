import React from 'react';
import {Switch,Route} from 'react-router-dom'
import Signin from '../screen/signin';
import SignUp from '../screen/signup';
import Chat from '../screen/chat';
import Conversation from '../screen/conversation';
import Activate from '../screen/activate';
import Forgotpassword from '../screen/forgot';
import ResetPassword from '../screen/resetpassword';

export default function Router () {
    return(
        <Switch>
            <Route path="/signin" component={Signin} exact/>
            <Route path="/signup" component={SignUp} exact/>
            <Route path="/chat" component={Chat} exact/>
            <Route path="/chat/:id" component={Conversation} exact/>
            <Route path="/users/activate/:token" component={Activate} exact/>
            <Route path="/forgot-password" component={Forgotpassword} exact/>
            <Route path="/users/password/reset/:token" component={ResetPassword} exact/>
        </Switch>
    )
}