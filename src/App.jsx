import React from "react";
import {  BrowserRouter as Router , Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import ForgotPassword from "./pages/ForgotPassword"
import Login from "./pages/Login"
import Register from "./pages/Register"
import OTP from "./pages/OTP"
import ResetPassword from "./pages/ResetPassword"
import {ToastContainer} from "react-toastify"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" elatment={<Home />} />
        <Route path="/login" elatment={<Login />} />
        <Route path="/register" elatment={<Register />} />
        <Route path="/password/forgot" elatment={<ForgotPassword />} />
        <Route path="/otp-verification/:email" elatment={<OTP />} />
        <Route path="/password/reset/:token" elatment={<ResetPassword />} />
      </Routes>
      <ToastContainer theme="dark"/>
    </Router>
  );
};

export default App;
