"use client";
import React, { useState } from "react";
import { apiService } from "@/app/services/apiService/apiService";
import { AuthContext } from "@/app/contexts/auth/authContext";

const Appointments = () => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const { role } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {};
  if (isAuthenticated && role === "Physiotherapist") {
    return <>{}</>;
  }
  if (isAuthenticated && role === "Patient") {
    return (
      <>
        {
          // show history of appointments after press on the button
        }
      </>
    );
  }
};

export default Appointments;
