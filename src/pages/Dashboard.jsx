import { useData } from "../context/DataContext"
import BarChart from "../components/BarChart";
import { useState } from "react";
import { Chart as ChartJs } from 'chart.js/auto'
import LineChart from "../components/LineChart";
export default function Dashboard() {
  const { data, loading } = useData();
  const [chartData, setChartData] = useState({
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        label: "Total time spent",
        data: [23, 45, 65, 76, 87,68],
        backgroundColor: [
       "#3d5af1"
        ],
        hoverOffset: 6,
      }

    ],
  })
  console.log({ data })
  return <>
    <h1>Dashboard</h1>
    {
      data.length && <BarChart chartData={chartData} />
    }
     {
      data.length && <LineChart />
    }
  </>
}