import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker } from 'react-date-range';
import { useData } from '../context/DataContext';
export default function DateRange(){

const {filters,setFilters} = useData()
  const selectionRange = {
    startDate:filters.startDate ?? new Date(),
    endDate:filters.endDate ?? new Date(),
    key: 'selection',
  }
  console.log(selectionRange)

  function handleSelect(ranges){
    console.log(ranges);
   setFilters(prev=>({...prev, startDate:ranges.selection.startDate,endDate:ranges.selection.endDate }))
  }
  
  return <>
    <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
  </>
}