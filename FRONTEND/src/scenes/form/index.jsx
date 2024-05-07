import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/admin/Header";
import { Input } from '@mui/material';
import { useState } from "react";
import axios from "axios";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [fieldValue, setFieldValue] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebar, setIsSidebar] = useState(true);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (values) => {
    values = {...values,file: selectedFile};
    console.log(selectedFile);
    console.log(values);
    try {
      const response = await axios.put("http://localhost:8000/api/admin", values);
      console.log(response.data);
    } catch (error) {
      console.log("error updating user", error);
    }

  };

  return (
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Box m="20px">
      <Header title="UPDATE PROFILE" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        sx={{ enctype: "multipart/form-data" }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              /> */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ConfirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />

              <input type="file" onChange={handleFileChange} />
              {/* <Input
                type="file"
                name="file" // Ajout de l'attribut name
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  handleChange(event); // Pour mettre à jour la valeur dans Formik
                  setFieldValue("file", file); // Pour mettre à jour la valeur de file
                }}
                sx={{ gridColumn: "span 4" }}
              /> */}

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                SUBMIT
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </main>
  </div>
  );
};



const checkoutSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});
const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  file: "",
};

export default Form;