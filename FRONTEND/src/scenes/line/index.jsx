import { Box } from "@mui/material";
import Header from "../../components/admin/Header";
import LineChart from "../../components/admin/LineChart";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState } from "react";

const Line = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
    </main>
  </div>
  );
};

export default Line;