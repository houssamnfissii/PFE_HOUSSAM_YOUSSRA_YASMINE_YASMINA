import { Box } from "@mui/material";
import Header from "../../components/admin/Header";
import BarChart from "../../components/admin/BarChart";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState } from "react";

const Bar = () => {
  const [isSidebar, setIsSidebar] = useState(true)
  return (
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
    </main> 
  </div>
  );
};

export default Bar;