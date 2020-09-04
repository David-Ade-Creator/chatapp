import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { signin } from '../action/userAction';
import config from '../components/config';
import axios from 'axios';
import GoogleLogin from 'react-google-login';


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    padding:'15px',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'white'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  toast:{
    position:'absolute',
    right:'0'
  }
}));

export default function Signin(props) {
  const classes = useStyles();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const userSignin = useSelector(state=>state.userSignin);
  const {loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  toast.error(error);

  


  useEffect(() =>{
    if(userInfo){
      props.history.push('/chat');
      console.log(userInfo);
    }
  return () => {
   //
  };
}, []);


  const submithandler = (e) =>{
    e.preventDefault();
    if (email && password){
    dispatch(signin(email,password));
    } else {
      toast.error('Please fill all fields');
    }
  }


  return (
    <Container component="main" maxWidth="md" style={{height:'100vh',padding:'0',display:'flex',alignItems:'center'}}>
      <CssBaseline />
      <div className={classes.toast}>
        <ToastContainer/>
      </div>
      <Grid container style={{border:'1px solid blue'}}>
        <Grid item lg={4} md={4}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {loading && <div>Loading....</div>}
                {error && <div>{error}</div>}
        <form className={classes.form} onSubmit={submithandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e)=>setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>


          <Grid container justify="space-between">
            <Grid item>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link href="/signup" variant="body2">
                Create New Account
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Grid>
      <Grid item lg={8} md={8} style={{backgroundImage:'url(/image/login.jpg)',backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat'}}>
      </Grid>
      </Grid>
    </Container>
  );
}