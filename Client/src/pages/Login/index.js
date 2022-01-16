import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../../contexts/AuthContext";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginTop: 20,
  },
});
export default function Login() {
  console.log("Login");
  const classes = useStyles();
  const { login } = useAuth();
  const [user, setUser] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleLogin = () => {
    login(user);
  };

  return (
    <div className={classes.root}>
      <TextField
        required
        label="Email or Username"
        name="emailOrUsername"
        value={user.emailOrUsername}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        required
        type="password"
        label="Password"
        name="password"
        value={user.password}
        onChange={handleChange}
        margin="normal"
      />
      <div className={classes.btn}>
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>
      </div>
    </div>
  );
}
