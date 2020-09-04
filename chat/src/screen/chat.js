import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {listUser} from '../action/userAction';


const useStyles = makeStyles((theme) => ({
  paper:{
      width:'100%',
      display:'flex',
      flexDirection:'row',
      height:'100%'
  },
  header:{
      height:'5vh',
      margin:'0',
      borderRadius:'0',
      padding:'10px',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center'
  },
  paperuser:{
      width:'40%',
      borderRadius:'0',
      padding:'1px',
      height:'90vh',
  },
  userlist:{
      width:'100%',
      display:'flex',
      border:'1px solid grey'
  },
  avatarcon:{
      display:'flex',
      alignItems:'center',
      justifyContent:'flex-start'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  chatmessagesec:{
      position:'relative',
      width:'60%',
      height:'90vh',
      borderRadius:'0'
  },
  formcon:{
      width:'100%',
      position:'absolute',
      bottom:'3%'
  },
  form:{
      width:'100%',
      height:'40px'
  },
  submit:{
      borderRadius:'0',
      height:'100%'
  },
  formdiv:{
      borderRadius:'0',
      border:'0'
  },
  conversation:{
      display:'flex',
      flexDirection:'column',
      padding:'10px',
      width:'100%'
  },
  userconvo:{
      float:'right'
  }

}));

export default function Chat() {
  const classes = useStyles();
  const [receiverid,setReceiverid] = useState('');
  const [message,setMessage] = useState('');
  const userSignin = useSelector(state=>state.userSignin);
  const { userInfo} = userSignin;
  const userId = userInfo._id;
  const username = userInfo.name



const listUsers = useSelector(state=> state.listUsers);
const {loading,users,error} = listUsers;

const server = "http://localhost:5050";

const socket = io(server);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUser(userId));
    socket.on("Output Chat Message", messageFromBackend => {
        console.log("messageGromBackend",messageFromBackend);
    })
    return () => {
        //
    };
  }, []);

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
    <Container maxWidth="md">
      <CssBaseline />
      <Paper className={classes.header} elevation={3}>
          <div><h4>Chat</h4></div>
          <div>Sp</div>
      </Paper>
      <div className={classes.paper}>


        <Paper className={classes.paperuser} elevation={2}>
            <h3 style={{textAlign:'center'}}>Chat with friends</h3>
            {loading ? <div>Loading...</div> : error? <div>{error}</div> :
            users.map( user => (
            <Grid onClick={()=>setReceiverid(user._id)} key={user._id} item xs={12}>
                <Link to={"/chat/" + user._id} >
            <div className={classes.userlist}>
                <div className={classes.avatarcon}>
                  <Avatar className={classes.avatar}>
                         {user.name.substring(0,1)}
                  </Avatar>
                </div>
                <div>
                 <h4>{user.name}</h4>
                 <p>Omo wetin dey sup nah , wetin dey for me</p>
                </div>
            </div></Link>
        </Grid>))
            }
            
        </Paper>


        <Paper className={classes.chatmessagesec} elevation={1}>
        <div className={classes.formcon}>
            <form className={classes.form} onSubmit={submitHandler}>
                <Grid container>
                    <Grid item md={10} lg={10} sm={10} xs={10}>
                    <TextField
                variant="outlined"
                fullWidth
                id="msg"
                label="Enter message"
                name="msg"
                onChange={(e)=>setMessage(e.target.value)}
                className={classes.formdiv}
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
        </Paper>
       
      </div>
    </Container>
  );
}