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
import { resetNewPassword } from '../action/userAction';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding:'25px',
    display: 'flex',
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

export default function ResetPassword({match}) {
  const classes = useStyles();
  const [newPassword,setPassword1]=useState('');
  const [password2,setPassword2]=useState('');
  const [resetpasswordLink,setToken]=useState('');

  const resetPassword = useSelector(state=>state.resetPassword);
  const {loading, message, error } = resetPassword;
  const dispatch = useDispatch();
  toast.error(error);

  useEffect(() =>{
  let token = match.params.token;
  setToken(token);
}, [match.params]);


  const submithandler = (e) =>{
    e.preventDefault();
    console.log(newPassword, password2);
    if (newPassword && password2){
    dispatch(resetNewPassword(resetpasswordLink,newPassword));
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
        Reset your password
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
              name="password"
              label="Enter new password"
              type="password"
              id="password"
              onChange={(e)=>setPassword1(e.target.value)}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password1"
              label="Confirm Password"
              type="password"
              id="password2"
              onChange={(e)=>setPassword2(e.target.value)}
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
          Save new password
        </Button>

      </form>
    </div>
    </Grid>
    <Grid item lg={8} md={8} style={{backgroundImage:'url(/image/login.jpg)',backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat'}}>
    </Grid>
    </Grid>
  </Container>
  );
}