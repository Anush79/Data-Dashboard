import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants/variables";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { isNonEmptyObject, convertDateFormat } from "../constants/utils";
const DataContext = createContext();

export default function DataProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["filters"]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeature, setFeature] = useState("");
  const initialFilters = isNonEmptyObject(cookies.filters) 
    ? cookies.filters
    : {
        age: "",
        gender: "",
        startDate: new Date(data[0]?.Day) ?? new Date(),
        endDate: new Date(),
      };
  const [filters, setFilters] = useState(initialFilters);
  console.log(filters);

  const genderFiltered =
    filters?.gender !== "undefined" && filters.gender
      ? data.filter((item) => item.Gender === filters.gender)
      : data;

  const ageFiltered =
    filters.age !== "undefined" && filters.age
      ? genderFiltered.filter((item) => item.Age === filters.age)
      : genderFiltered;

  const dateFiltered =
    data.length > 0
      ? ageFiltered?.filter((item) => {
          let itemDate = new Date(item?.Day);
          return itemDate >= filters.startDate && itemDate <= filters.endDate;
        })
      : ageFiltered;

  //calculating total time of each feature
  const totaltime = dateFiltered?.reduce(
    (acc, curr) => {
      return {
        A: acc.A + curr.A,
        B: acc.B + curr.B,
        C: acc.C + curr.C,
        D: acc.D + curr.D,
        E: acc.E + curr.E,
        F: acc.F + curr.F,
      };
    },
    { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
  );

  function calculateTotalTime(data, startDate, endDate, feature) {
    const result = {};

    // Filter the data based on the specified date range
    const filteredData = data.filter((entry) => {
      const entryDate = new Date(entry.Day);
      return entryDate >= startDate && entryDate <= endDate;
    });

    // Calculate the total time spent by 'A' for each day in the filtered data
    filteredData.forEach((entry) => {
      const day = entry.Day;
      const timeSpentA = entry[feature];
      result[day] = (result[day] || 0) + timeSpentA;
    });

    return result;
  }

  const totalTimeSpentByFeature = calculateTotalTime(
    dateFiltered,
    filters.startDate,
    filters.endDate,
    selectedFeature
  );

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/data/getData`);
      const result = await response.json();
      const fixedDatedArray = result?.response?.map((item) => ({
        ...item,
        Day: convertDateFormat(item.Day),
      }));
      setData(fixedDatedArray);
      setFilters(prev=>({...prev, 
        startDate: cookies?.filters?.startDate ?? new Date(fixedDatedArray[0]?.Day),
        endDate:cookies?.filters?.endDate ?? new Date(),
      })
     
      )
      setLoading(false);
    } catch (e) {
      console.error(e);
      toast.error(e.message);
      setLoading(false);
    }
  };

  const resetPreferences = () => {
    setCookie(
      "filters",
      {
        age: "undefined",
        gender: "undefined",
        startDate: new Date(data[0]?.Day),
        endDate: new Date(),
      },
      { path: "/" }
    );
    setFilters({
      age: "undefined",
      gender: "undefined",
      startDate: new Date(data[0]?.Day),
      endDate: new Date(),
    });
    setFeature("");
  };


  useEffect(() => {
    setCookie("filters", filters, { path: "/" });
  }, [filters]);

  useEffect(() => {
    if (data.length <= 0) {
      setLoading(true);
    } else {     
      setFilters(prev=>({
        ...prev,
        startDate:new Date(filters.startDate) ?? new Date(data[0]?.Day) ?? new Date(filters.startDate) ,
        endDate:new Date( filters.endDate )?? new Date(),
      }));
      setLoading(false);
    }
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        getData,
        data,
        loading,
        totaltime,
        ageFiltered,
        resetPreferences,
        setFilters,
        filters,
        selectedFeature,
        setFeature,
        setCookie,
        totalTimeSpentByFeature,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export const useData = () => useContext(DataContext);
