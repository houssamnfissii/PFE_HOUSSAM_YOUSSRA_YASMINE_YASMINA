import { Box } from "@mui/material";
import Header from "../../components/admin/Header";
import PieChart from "../../components/admin/PieChart";
import { useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Pie = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
<div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
            </main>
          </div>
  );
};

export default Pie;