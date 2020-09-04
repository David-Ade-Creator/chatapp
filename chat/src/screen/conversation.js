import React, { useEffect, useState } from 'react';
import { getChats } from '../action/chatAction';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding:'0',
        position:'relative'
    },
    convosec : {
        backgroundColor: 'red',
        width:'100%',
        height:'92vh'
    },
    formcon:{
        width:'100%',
        height:'59px',
        padding:'0'
    },formdiv:{
        padding:'0'
    },
    formtext:{
        width:'100%',
        height:'89%',
        border: 'none'
    },
    submit:{
        height:'59px',
        borderRadius:'0'
    }
}));

export default function Conversation (props) {
    const classes = useStyles();
 const receiverid = props.match.params.id;
 const [message,setMessage] = useState('');
  const userSignin = useSelector(state=>state.userSignin);
  const { userInfo} = userSignin;
  const userId = userInfo._id;
  const username = userInfo.name;


    const messageList = useSelector(state=>state.messageList);
    const {loading,messages,error} = messageList;

    const dispatch = useDispatch();

    const server = "http://localhost:5050";

    const socket = io(server);


    useEffect(()=>{
           socket.on("Output Chat Message", messageFromBackend => {
               console.log("messageGromBackend",messageFromBackend);
           })
            dispatch(getChats(receiverid,userId))
            console.log(messages);
        return () => {
            //
        };
    });

    const submitHandler = (e)=> {
        e.preventDefault();
        let type = "text"
        socket.emit("Input Chat Message", {
            message,
            receiverid,
            userId,
            username,
            type
        });
        setMessage("")
    }


    return (
        <Container maxWidth="sm" className={classes.root}>
            <div className={classes.convosec}>
                <div>
                    <p>WOrking</p>
                </div>
            </div>
            <div className={classes.formcon}>
            <form className={classes.form} onSubmit={submitHandler}>
                <Grid container>
                    <Grid item md={10} lg={10} sm={10} xs={10} className={classes.formdiv}>
                    <input
                id="msg"
                name="msg"
                placeholder="Enter your message"
                onChange={(e)=>setMessage(e.target.value)}
                className={classes.formtext}
              />
                    </Grid>
                    <Grid item md={2} lg={2} sm={2} xs={2}>
                    <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send
          </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
        </Container>
        
                )
            
}