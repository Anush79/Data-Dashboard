import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Login() {


  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const { loginFunction } = useUser()
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >

        <TextField id="outlined-basic" type="email" label="Email" variant="outlined" name='email' value={userData.email} onChange={onChangeHandler}/>
        <TextField id="outlined-basic" type="password" label="Password" variant="outlined" name='password' value={userData.password} onChange={onChangeHandler}/>
      </Box>
      <Button variant="contained" size="medium" onClick={() => {
        loginFunction(userData)
      }}>Login</Button>
      <Button variant="contained" size="medium" onClick={() => {
        loginFunction({
          "email":"lorem11@gmail.com","password":"password@5565"
        })


      }}>Default Login</Button>

      <Link to="/signup">New User, Sign Up here...</Link>

    </div>
  );
}