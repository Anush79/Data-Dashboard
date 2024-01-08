
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Signup() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username:"",
    number:""
  })
  const { signupFunction } = useUser()
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="loginContainer">
  <h2>Sign Up</h2>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '30ch' },
        }}
      
        autoComplete="off"
      >
      
        
        <TextField id="outlined-basic"name="email"  type="email" label="Email" variant="outlined" required onChange={onChangeHandler}/>
        <TextField id="outlined-basic"name="username"   label="Username" variant="outlined" required onChange={onChangeHandler}/>
        <TextField id="outlined-basic"name="password" type="password" label="Password" variant="outlined" required onChange={onChangeHandler} />
        <TextField id="outlined-basic"name="number" type="Number" label="Phone Number" variant="outlined" required onChange={onChangeHandler}/>

      </Box>
      <Button variant="contained" size="medium" onClick={()=>{signupFunction(userData)}}>Sign up</Button>

      <br/>
      <Link to="/">Already a User, Login here...</Link>
      
    </div>
  );
}

/**
 * {
    "email": "anurag12@gmail.com",
    "password": "anurag8899",
    "profilePictureUrl": "https://lorem.picsum/200",
    "username": "k_anurag",
    "nickname": "raag",
    "phoneNumber": 9777723344,
    "address": "Mehrgarh"
}
 */