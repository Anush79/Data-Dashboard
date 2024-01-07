
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/variables";
import { useNavigate } from 'react-router-dom';
const DataContext = createContext()


export default function DataProvider({ children }) {
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/data/getData`);
      const result = await response.json()
      setData(result.response);
      setLoading(false)
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return <DataContext.Provider value={{ data, loading }}>
    {children}
  </DataContext.Provider>
}
export const useData= () => useContext(DataContext)