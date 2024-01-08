import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/variables";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const UserContext = createContext();

export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user: localStorage.getItem("userData") ?? {},
    token: localStorage.getItem("token") ?? false,
  });
  const [loading, setLoading] = useState(false);
  async function loginFunction(inputData) {
    setLoading(true);
    if (!inputData.email || !inputData.password) {
      toast.error("Please provide correct input");
      setLoading(false);
      return;
    }
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
        redirect: "follow",
      };
      const response = await fetch(`${BASE_URL}/auth/login`, requestOptions);
      const data = await response.json();
      setUser({ user: data?.user, token: data?.token });
      setLoading(false);
      navigate("/dashboard");
      localStorage.setItem("token", data?.token);
      localStorage.setItem("userData", data?.user )
      toast.success(data.message);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }
  async function signupFunction(inputData) {
    setLoading(true);
    if (
      !inputData.email ||
      !inputData.password ||
      !inputData.username ||
      !inputData.number
    ) {
      toast.error("Please provide correct input");
      setLoading(false);
      return;
    }
    try {
      console.log(inputData);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
        redirect: "follow",
      };
      const response = await fetch(`${BASE_URL}/auth/signup`, requestOptions);
      const data = await response.json();
        setUser({ user: data?.user, token: data?.token });
      setLoading(false);
      navigate("/dashboard");
      toast.success(data.message);
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
      console.log(e);
    }
  }
  function logout() {
    setUser({ user: {}, token: false });
    toast.success("logged out successfully");
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    navigate("/");
  }

  return (
    <UserContext.Provider
      value={{ user, loginFunction, signupFunction, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => useContext(UserContext);
