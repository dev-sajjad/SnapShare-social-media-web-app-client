import React, { useState } from "react";
import { Avatar, Button, Container, Grid, Paper,  Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";


import Input from "./Input";
import useStyles from "./styles";

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleChange = (e) => {
        e.preventDefault();
    }

    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
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
                            <Input name="lastName"  label="Last Name" handleChange={handleChange} autoFocus half />
                          </>
                      }
                      <Input name="email" label="Email" type="email" handleChange={handleChange} />
                      <Input name="password" label="Password" type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} handleChange={handleChange} />
                      {isSignup && <Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} /> }
                      
                      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                          {isSignup ? 'Sign Up' : 'Sign In'}
                      </Button>
                  </Grid>
                  <Grid container justifyContent="center" >
                      <Grid item >
                          <Button onClick={switchMode}>
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
