import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";


import "./index.css";
import Auth from "./components/Auth/Auth";

const App = () => {
 
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
