import React, { useState } from "react";
import { Avatar, Button, Container, Grid, Paper,  Typography } from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import { googleSignUp, signIn, signUp } from "../../actions/auth";
import Input from "./Input";
import useStyles from "./styles";
import { toast } from "react-hot-toast";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState)
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //handle password visibility
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    // handle sign in and sign up
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            if (formData.password !== formData.confirmPassword) {
                return toast.error("Passwords do not match!");
            }
            dispatch(signUp(formData, navigate));
        } else {
            dispatch(signIn(formData, navigate));
        }
    }

    //handle form input change
    const handleChange = (e) => {
        return setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // switch between signup and login
    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    }

    // google sign up
    const handleGoogleSignUp = () => {
        dispatch(googleSignUp(navigate));
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
              <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5">
                  {isSignup ? 'Sign Up' : 'Sign In'}
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2} >
                      {
                          isSignup && <>
                            <Input name="firstName"  label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName"  label="Last Name" handleChange={handleChange}  half />
                          </>
                      }
                      <Input name="email" label="Email" type="email" handleChange={handleChange} autoFocus />
                      <Input name="password" label="Password" type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} handleChange={handleChange} />
                      {isSignup && <Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} /> }
                      
                      <Button type="submit" size="small" fullWidth variant="contained" color="primary" className={classes.submit} >
                          {isSignup ? 'Sign Up' : 'Sign In'}
                      </Button>
                      <Button variant="contained" size="small" startIcon={ <GoogleIcon />} onClick={handleGoogleSignUp} fullWidth style={{marginBottom: "20px"}} color="secondary" >
                          Sign In with Google
                      </Button>
                  </Grid>
                  <Grid container justifyContent="center" >
                      <Grid item >
                          <Button style={{ textDecoration: "normal"}} onClick={switchMode}>
                              {isSignup? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                          </Button>
                      </Grid>  
                </Grid> 
              </form>
          </Paper>
    </Container>
  );
};

export default Auth;
