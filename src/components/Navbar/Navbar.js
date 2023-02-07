import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


import { signOutUser } from '../../actions/auth';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { auth } from '../../firebase/firebase.config';


const Navbar = () => {
  const [user, setUser] = useState({});
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();


// monitor if user is signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      return () => unsubscribe();
    })
  }, [])


  const handleSignOut = () => {
    dispatch(signOutUser(navigate));
  }


    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography component={ Link } to="/" className={classes.heading} variant="h3" align="center">
            SnapShare
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height={60}
          />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.displayName} src={user?.photoURL} >{user?.displayName?.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6" >{user?.displayName}</Typography>
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