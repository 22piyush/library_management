import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { error, message, user, isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate()

  return <div>Register</div>;
}

export default Register;
