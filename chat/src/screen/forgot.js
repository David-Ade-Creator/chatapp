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
import { forgotPassword } from '../action/userAction';


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

export default function Forgotpassword(props) {
  const classes = useStyles();
  const [email,setEmail]=useState('');

  const forgetPassword = useSelector(state=>state.forgetPassword);
  const {loading, message , error} = forgetPassword;

  const dispatch = useDispatch();
  toast.error(error);

  useEffect(() =>{

}, []);


  const submithandler = (e) =>{
    e.preventDefault();
    if (email){
    dispatch(forgotPassword(email));
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
                id="email"
                label="Email Address"
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                autoComplete="email"
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
            Submit
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