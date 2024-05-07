import { Box, Typography, useTheme, Button, Checkbox, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/admin/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";



const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formDisplay, setFormDisplay] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrorEmail('Email is required');
      return;
    } else if (!emailRegex.test(email)){
      setErrorEmail("Invalid email format");
    } else {
      setErrorEmail('');
    }
    if (!password) {
      setErrorPassword('Password is required');
      return;
    } else if (password.length<8){
      setErrorPassword("Password must be at least 8 characters long");
    } else {
      setErrorPassword('');
    }
    try {
      await axios.post(`http://localhost:8000/api/users`, {
        email: email,
        password: password
      });
      fetchData();
      // setFormDisplay(false);
      setEmail("");
      setPassword("");
      console.log(rows);
    } catch (error) {
      console.log("error adding user", error);
    }
    console.log('Adding admin user:', { email, password });
    setEmail('');
    setPassword('');
    setFormDisplay(false);
  };

  const handleAddUserClick = () => {
    setFormDisplay(!formDisplay);
  };

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);



  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      const formattedRows = response.data.users.map(user => {
        let phone = "";
        let name = "";
        if (user.type === "client") {
          if (user.client) {
            phone = user.client.telephone || "";
            name = (user.client.first_name || "") + " " + (user.client.last_name || "");
          }
        } else if (user.type === "host") {
          if (user.host) {
            phone = user.host.telephone || "";
            name = (user.host.first_name || "") + " " + (user.host.last_name || "");
          }
        }
        return {
          id: user.id,
          name: name,
          email: user.email,
          type: user.type,
          phone: phone,
          status: user.status,
        };
      });
      setRows(formattedRows);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 0 ? 1 : 0;
    try {
      await axios.put(`http://localhost:8000/api/users/${userId}`, {
        status: newStatus
      });
      setRows(prevRows =>
        prevRows.map(row =>
          row.id === userId ? { ...row, status: newStatus } : row
        )
      );
    } catch (error) {
      console.log("error toggling user status", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(rows);
  }, []);


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      type: 'boolean',
      editable: true,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={row.status === 0}
            onChange={() => toggleStatus(row.id, row.status)}
          />
          <Typography>{row.status === 0 ? "Valid" : "Blocked"}</Typography>
        </Box>
      )
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Account",
      align: "right",
      flex: 1,
      renderCell: ({ row: { type } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              type === "admin"
                ? colors.greenAccent[600]
                : type === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {type === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {type === "host" && <SecurityOutlinedIcon />}
            {type === "client" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {type}
            </Typography>
          </Box>
        );
      },
    },


  ];

  const handleDeleteSelectedUsers = async () => {
    try {
      await axios.delete("http://localhost:8000/api/users", {

        data: { IdOfusersToDelete: selectedRows }
      });
      fetchData();
    } catch (error) {
      console.log("error deleting users", error);
    }
  }

  return (
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Box m="20px">
      
      <Header title="Users" subtitle="Managing the Users" />
      <Box sx={{ m: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDeleteSelectedUsers}
        >
          Delete Selected Users
        </Button>
      </Box>
      <Box sx={{ m: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddUserClick}>
          Add New Admin
        </Button>
        <div className="bg-grey-500 p-4" style={{ display: formDisplay ? 'block' : 'none' }}>
          <form onSubmit={handleSubmit}>
            {/* {errorEmail != "" || errorPassword != "" && setFormDisplay(true)} */}
            <TextField
              sx={{ m: 1 }}
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              error={!!errorEmail}
              helperText={errorEmail}
              fullWidth
              required
            />
            <TextField
              sx={{ m: 1 }}
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              error={!!errorPassword}
              helperText={errorPassword}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </div>
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
          }}
        />
      </Box>
    </Box>
    </main>
  </div>
  );
};

export default Team;
