
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/variables";
import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";


const DataContext = createContext()


export default function DataProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(['filters']);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const {gender, age} = useParams()

  const [filters, setFilters] = useState(cookies.filters ||  {age, gender, startDate:"", endDate:new Date()})
  

  const genderFiltered = filters?.gender ? data.filter(item => item.Gender === filters.gender) : data
 
  const ageFiltered = filters.age ? genderFiltered.filter(
    item=> item.Age === filters.age
  ) : genderFiltered
  

  const dateFiltered =data.length > 0 && filters.startDate ? ageFiltered?.filter((item)=>{
    let itemDate = new Date(item.Day) ;
    return (
      itemDate >= filters.startDate &&
      itemDate <= filters.endDate
    )
  }) : ageFiltered
console.log(dateFiltered)
  const totaltime = dateFiltered?.reduce((acc, curr) => {
    return {
      A: acc.A + curr.A,
      B: acc.B + curr.B,
      C: acc.C + curr.C,
      D: acc.D + curr.D,
      E: acc.E + curr.E,
      F: acc.F + curr.F,
    }
  }, { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 })

  



  function calculateTotalTime(data, startDate, endDate, feature) {
    const result = {};
  
    // Filter the data based on the specified date range
    const filteredData = data.filter(entry => {
      const entryDate = new Date(entry.Day);
      return entryDate >= startDate && entryDate <= endDate;
    });
  
    // Calculate the total time spent by 'A' for each day in the filtered data
    filteredData.forEach(entry => {
      const day = entry.Day;
      const timeSpentA = entry[feature];
      result[day] = (result[day] || 0) + timeSpentA;
    });
  
    return result;
  }

  
  const totalTimeSpentByFeature = calculateTotalTime(dateFiltered, filters.startDate, filters.endDate, "A");
  console.log({totalTimeSpentByFeature});
  









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

  const resetPreferences = () => {
    removeCookie('filters', { path: '/' });
    setFilters({age:"", gender:"",startDate:new Date(data[0].Day), endDate:new Date() })
  };
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    setCookie('filters', filters, { path: '/' });
  }, [filters, setCookie]);

  return <DataContext.Provider value={{getData, data, loading, totaltime ,ageFiltered,resetPreferences,setFilters,filters}}>
    {children}
  </DataContext.Provider>
}
export const useData= () => useContext(DataContext)