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
import { signup } from '../action/userAction';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { urlencoded } from 'body-parser';


const useStyles = makeStyles((theme) => ({
  paper: {
    margin:'25px',
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
    margin: theme.spacing(1, 0, 0),
  },
  toast:{
    position:'absolute',
    right:'0'
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password1,setPassword1]=useState('');
  const [password2,setPassword2]=useState('');
  const userSignup = useSelector(state=>state.userSignup);
  const {loading,success, error} = userSignup;
  const dispatch = useDispatch();


  useEffect(()=>{
    if (success) {
      props.history.push('/signin');
    }
    return () =>{

    };
    //
  }, [success])

  const submitHandler = (e) => {
    e.preventDefault();
    if(name && email && password1) {
      if (password1 === password2){
        dispatch(signup(name,email,password1));
      } else {
        toast.error('Passwords don\'t match')
      }
    } else {
      toast.error('Please fill all fields')
    }
  };

  return (
    <Container component="main" style={{display:'flex',height:'100vh',alignItems:'center',padding:'0'}} maxWidth="md">
      <CssBaseline />
      <Grid container style={{border:'1px solid blue'}}>
        <Grid item md={4} style={{backgroundColor:'white'}}>
      <div className={classes.toast}>
        <ToastContainer/>
      </div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {loading && <div>Loading....</div>}
                {error && <div>{error}</div>}
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e)=>setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
                onChange={(e)=>setPassword1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={(e)=>setPassword2(e.target.value)}
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
            Sign Up
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Grid>
      <Grid item lg={8} md={8} style={{backgroundImage: 'url(/image/register1.jpg)',backgroundPosition:'center', backgroundSize:'cover'}}>
      </Grid>
      </Grid>
    </Container>
  );
}