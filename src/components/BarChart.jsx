
import { Bar } from "react-chartjs-2";

import { Chart as ChartJs } from 'chart.js/auto'
import { useData } from "../context/DataContext";

export default function BarChart({ chartData, barClickHandler }) {
 const {filters:{startDate, endDate}} = useData()


  return (
    <div className="chart-container">
      <h3 style={{ textAlign: "center" }}>Bar Chart with features and total time</h3>
      <Bar
        data={chartData}
        options={{
          onClick: (event, elements) => {
         
      
            if (elements.length > 0) {
              const clickedElementIndex = elements[0].index;
              barClickHandler(chartData.labels[clickedElementIndex])
            }
          },

          plugins: {
            title: {
              display: true,
              text:`Showing Data from ${startDate?? startDate?.toDateString()} till ${endDate?? endDate?.toDateString()}`
            },
            legend: {
              display: false
            }
          },
          indexAxis: "y"
        }}
      />
    </div>
  );
};