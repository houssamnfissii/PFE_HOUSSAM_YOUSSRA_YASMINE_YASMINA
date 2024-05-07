import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/admin/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);
  
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/offers_");
      
      const formattedRows = response.data.offers.map(offer => {
        let host = (offer.host.first_name || "") + " " + (offer.host.last_name || "");
        let date = new Date(offer.created_at);

        return {
          id: offer.id,
          type: offer.type,
          host: host,
          date: date.toLocaleDateString('fr-FR')
        };
      });
      setRows(formattedRows);
    } catch (error) {
      console.log("Error fetching offers", error);
    }
  };
  useEffect(() => {
    console.log(rows);
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "host",
      headerName: "Host",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.date}
        </Typography>
      ),
    },

  ];

  const handleDeleteSelectedOffers = async () => {
    console.log(selectedRows);
    try {
      await axios.delete("http://localhost:8000/api/delete_offers", {
        data: { ids_of_offers_to_delete: selectedRows }
      });
      fetchData();
    } catch (error) {
      console.log("error deleting offers", error);
    }
  }
  return (
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Box m="20px">
      <Header title="OFFERS" subtitle="List of Offers" />
      <Box sx={{ m: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDeleteSelectedOffers}
        >
          Delete Selected Offers
        </Button>
      </Box>
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          selectionModel={selectionModel}

          onRowSelectionModelChange={(ids) => {
            console.log(ids);
            setSelectedRows(ids);
          }} />
      </Box>
    </Box>
    </main>
  </div>
  );
};

export default Invoices;