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
import { activateUser } from '../action/userAction';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jsonwebtoken';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export default function Activate({match}) {
  const classes = useStyles();
  const [name,setName]=useState('');
  const [token,setToken]=useState('');

  const activatedUser = useSelector(state=>state.activatedUser);
  const {loading,error,message} = activatedUser;
  const dispatch = useDispatch();
  toast.error(error);

  useEffect(()=>{
      let token = match.params.token;
      let {name} = jwt.decode(token)

      if(token) {
          setName(name);
          setToken(token);
      }

      
  }, [match.params]);
  console.log(token, name);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(activateUser(token));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.toast}>
        <ToastContainer/>
      </div>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Welcome {name}
        </Typography>
        
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Activate your Account
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Or Sign up again
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}