import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../../contexts/AuthContext';
import { makeStyles } from '@mui/styles';
import { Card } from '../../components';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 20,
  },
});

export default function Register() {
  const classes = useStyles();

  const { register } = useAuth();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    setUser((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleRegister = () => {
    register(user);
  };

  return (
    <div className={classes.root}>
      <Card>
        <TextField
          required
          label='Username'
          name='userName'
          value={user.userName}
          onChange={handleChange}
          margin='normal'
        />
        <TextField
          required
          label='Email'
          name='email'
          value={user.email}
          onChange={handleChange}
          margin='normal'
        />
        <TextField
          required
          type='password'
          label='Password'
          name='password'
          value={user.password}
          onChange={handleChange}
          margin='normal'
        />
        <TextField
          required
          type='password'
          label='Confirm Password'
          name='confirmPassword'
          value={user.confirmPassword}
          onChange={handleChange}
          margin='normal'
        />
        <div className={classes.btn}>
          <Button onClick={handleRegister} fullWidth variant='contained'>
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
}
