
import { Bar } from "react-chartjs-2";

import { Chart as ChartJs } from 'chart.js/auto'

export default function BarChart({ chartData }) {
function onClickHandler (e){
  console.log(e)
  console.log("hosdaidosao")
}


  return (
    <div className="chart-container">
      <h3 style={{ textAlign: "center" }}>Bar Chart with features and total time</h3>
      <Bar
        data={chartData}
        options={{
          onClick:(e)=>{
            console.log("hhhhhhhhhhhhhh",e);
          },
          plugins: {
            title: {
              display: true,
              text: "Interactive Data Visualization"
            },
            legend: {
              display: false
            }
          },
          indexAxis:"y"
        }}
      />
    </div>
  );
};