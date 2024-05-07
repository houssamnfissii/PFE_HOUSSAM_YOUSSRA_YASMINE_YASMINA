import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/admin/Header";
import { Box, Typography, useTheme, Button, Checkbox, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/reservations");
      const formattedRows = response.data.reservations.map(reservation => {
        let client = (reservation.client.first_name || "") + " " + (reservation.client.last_name || "");

        return {
          id: reservation.id,
          client_id: reservation.client_id,
          client: client,
          offer: reservation.offer.id,
          offer_type: reservation.offer.type,
          billed: reservation.billed,
        };
      });
      setRows(formattedRows);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(rows);
  }, []);

  

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "client", headerName: "Client", flex: 1, cellClassName: "name-column--cell",
    renderCell: (params) => (
      <Link to={`/client/${params.row.client_id}`}>
        {console.log(params.row.client_id)}
        {params.value}
      </Link>
    ),
  },
    {
      field: "offer",
      headerName: "Offer ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "offer_type",
      headerName: "Offer Type",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: 'billed',
      headerName: 'Billed',
      width: 100,
      type: 'boolean',
    },
  ];

  return (
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Box m="20px">
      <Header
        title="Reservations"
        subtitle="List of reservations"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
    </main>
  </div>
  );
};

export default Contacts;