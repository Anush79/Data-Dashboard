
import { createContext, useContext, useState } from "react";
import { BASE_URL } from "../constants/variables";
import { useNavigate } from 'react-router-dom';
const UserContext = createContext()


export default function UserProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState({user:{}, token:false})
  const [loading, setLoading] = useState(false)
  async function loginFunction(inputData) {
    setLoading(true)
    try {
      console.log(inputData);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData),
        redirect: 'follow'
      };
      const response = await fetch(`${BASE_URL}/auth/login`, requestOptions)
      const data = await response.json()
      console.log(data);
      setUser({user:data?.user, token:data?.token})
      setLoading(false)
      navigate('/dashboard')
    } catch (e) {
      setLoading(false)

      console.log(e)
    }
  }
  async function signupFunction(inputData) {
    setLoading(true)
    try {
      console.log(inputData);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData),
        redirect: 'follow'

      };
      const response = await fetch(`${BASE_URL}/auth/signup`, requestOptions)
      const data = await response.json()
      console.log(data);
      setUser({user:data?.user, token:data?.token})
      setLoading(false)
      navigate('/dashboard')
    } catch (e) {
      setLoading(false)

      console.log(e)
    }
  }
function logout (){
  setUser({user:{}, token:false})
}
console.log(user)
  return <UserContext.Provider value={{ user, loginFunction, signupFunction ,logout, loading}}>
    {children}
  </UserContext.Provider>
}
export const useUser = () => useContext(UserContext)