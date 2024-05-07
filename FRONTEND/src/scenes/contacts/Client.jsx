import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

export default function Client() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isSidebar, setIsSidebar] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/clients/${id}`);
      if (response.data) {
        setData(response.data.client);
      }
    } catch (error) {
      console.log("error fetching the client", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={6}>
        {data && (
          <Card sx={{  textAlign: "center" }}>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                {data.user && data.user.image ? (
                  <img
                    src={data.user.image}
                    alt="User"
                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                  />
                ) : (
                  <Typography>No Image Available</Typography>
                )}
              </Box>
              <Typography variant="h4" component="div">
                {data.first_name} {data.last_name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {data.user.type}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Address: {data.address}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Telephone: {data.telephone}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Birth Date: {data.birth_date}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
    </main>
  </div>
  );
}
