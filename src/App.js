import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as actions from './constants/actionTypes';

import { auth } from "./firebase/firebase.config";
import { verifyToken } from "./api";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import "./index.css";


const App = () => {
  const dispatch = useDispatch();

  // monitor if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {  
        // store user in redux
        dispatch({ type: actions.AUTH_USER, payload: user });

         const currentUser = {
           email: user?.email,
           uid: user?.uid,
         };
         //verify token
         verifyToken(currentUser)
           .then((res) => {
             const token = res.data.token;
             localStorage.setItem('social-token', token);
            })
            .catch((err) => {
              toast.err(err.message);
            });
      }
      return () => unsubscribe();
    })
  }, [dispatch])
 
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/auth" element={<Auth />} />  
        </Routes>
        <Toaster />
      </Container>
    </BrowserRouter>
  );
};

export default App;
