import React, { useCallback, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";


import { signOutUser } from '../../actions/auth';
import useStyles from './styles';
import snapShare from '../../images/snapshare.png';
import snapLogo from '../../images/snapLogo.png';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get current user
  const { currentUser } = useSelector((state) => state.auth);

// sign out user
  const handleSignOut = useCallback(() => {
    dispatch(signOutUser(navigate))
  }, [dispatch, navigate]);


  useEffect(() => {
    const token = localStorage.getItem("social-token");

    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleSignOut();
    }
  },[handleSignOut])


    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
          <Link to="/" className={classes.brandContainer}>
              <img className={classes.idmage} src={snapLogo} alt="icon" height="45px" />
              <img component={Link} to="/" src={snapShare} alt="icon" height="55px" />
        </Link>
            <Toolbar className={classes.toolbar}>
                {currentUser ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={currentUser?.displayName} src={currentUser?.photoURL} >{currentUser?.displayName?.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6" >{currentUser?.displayName}</Typography>
                        <Button className={classes.logout} onClick={handleSignOut} color="secondary" variant='contained' >Logout</Button>
                </div>
                ) : (
                        <Button component={Link} to='/auth' color='primary' variant='contained' >SignIn</Button>
                )}
            </Toolbar>
      </AppBar>
    );
};

export default Navbar;