import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const login = sessionStorage.getItem("login");
    // if (!login) {
    //     navigate(sessionStorage.getItem("retrul"))
    // }
  }, [location]);
  return <div>
    <Component/>
  </div>;
};

export default ProtectedRoute;
