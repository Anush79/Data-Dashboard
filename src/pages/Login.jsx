import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useData } from "../context/DataContext";

export default function Login() {
  const { gender, age, startDate, endDate } = useParams();
  console.log("from params", { gender, age, startDate, endDate } )
  const { setFilters, setCookie } = useData();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { loginFunction } = useUser();
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFilters({
      gender,
      age,
      startDate,
      endDate,
    });
    setCookie(
      "filters",
      {
        gender,
        age,
        startDate,
        endDate,
      },
      { path: "/" }
    );
  }, []);
  return (
    <div className="loginContainer">
      <h2>
        Welcome to Data Visualization Center{" "}
      </h2>
      <h3>Login</h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          required
          type="email"
          label="Email"
          variant="outlined"
          name="email"
          value={userData.email}
          onChange={onChangeHandler}
        />
        <TextField
          id="outlined-basic"
          required
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          value={userData.password}
          onChange={onChangeHandler}
        />
      </Box>
   

   
      <Button
        variant="contained"
        size="medium"
        onClick={() => {
          loginFunction(userData);
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        size="medium"
        onClick={() => {
          loginFunction({
            email: "lorem11@gmail.com",
            password: "password@5565",
          });
        }}
      >
        Default Login
      </Button>

      <Link to="/signup">New User, Sign Up here...</Link>
     
    </div>
  );
}
