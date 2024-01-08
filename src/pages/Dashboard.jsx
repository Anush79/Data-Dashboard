import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import { useData } from "../context/DataContext";
import { Chart as ChartJs } from "chart.js/auto";
import { useNavigate, useParams } from "react-router-dom";
import DateRange from "../components/DateSelector";
import LineChart from "../components/LineChart";
import Loading from "../components/Loading";
import { style } from "../constants/variables";
import { copyLinkToShare } from "../constants/utils";

export default function Dashboard() {
  const {
    data,
    totaltime,
    setFilters,
    getData,
    filters,
    loading,
    resetPreferences,
    selectedFeature,
    setFeature,
  } = useData();
 
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
    labels: Object.keys(totaltime),
    datasets: [
      {
        label: "Total time spent",
        data: Object.values(totaltime),
        backgroundColor: ["#3d5af1"],
        hoverOffset: 6,
      },
    ],
  });
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    getData();
  
  }, []);
  useEffect(() => {
    setChartData({
      labels: Object.keys(totaltime),
      datasets: [
        {
          label: "Total time spent",
          data: Object.values(totaltime),
          backgroundColor: ["#3d5af1"],
          hoverOffset: 6,
        },
      ],
    });
    navigate(
      `/dashboard/${filters.gender ? filters.gender : "undefined"}/${
        filters.age ? filters.age : "undefined"
      }/${new Date(filters.startDate) ?? "undefined"}/${new Date(filters.endDate) ?? "undefined"}`
    );
  }, [filters,totaltime, data]);

  return (
    <>
      {loading && <Loading />}
      <h1>Dashboard</h1>

      <form id="preferencesForm">
        <Button onClick={handleOpen} variant="outlined" size="small">
          select date range
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <DateRange />
          </Box>
        </Modal>

        <select
          id="age"
          name="age"
          onChange={onChangeHandler}
          value={filters.age}
        >
          <option value="">Select Age</option>
          <option value="15-25">15-25</option>
          <option value=">25"> {">"}25</option>
        </select>

        <select
          id="gender"
          name="gender"
          value={filters.gender}
          onChange={onChangeHandler}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <Button variant="contained" size="small" onClick={resetPreferences}>
          Reset{" "}
        </Button>
        <Button variant="contained" size="small" onClick={copyLinkToShare}>
         Share Chart
        </Button>
      </form>
      <div className="chartsContainer">
        {data.length && (
          <BarChart chartData={chartData} barClickHandler={setFeature} />
        )}
        {data.length && selectedFeature && <LineChart />}
      </div>
    </>
  );
}
