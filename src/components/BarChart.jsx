
import { Bar } from "react-chartjs-2";

import { Chart as ChartJs } from 'chart.js/auto'

export default function BarChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
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