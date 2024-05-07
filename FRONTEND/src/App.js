import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Navbar from "./components/user/Navbar";
import Hero from "./components/user/Hero";
import Featured from "./components/user/Featured";
import Packages from "./components/user/Packages";
// import Cars from "./components/user/voitures/Cars";
import Car from "./components/user/voitures/Car";
import Restaurants from "./components/user/restaurants/Restaurants";
import Details from "./components/user/restaurants/Details";
import Auth from "./components/Auth";
import Hotels from "./components/user/hotels/Hotels";
// import Hotel from "./components/user/hotels/Hotel";
import { UserProvider } from "./components/UserContext";
import Pages from "./components/Pages";
import PrivateRoute from "./PrivateRoute";
import Logout from "./components/Logout";
import AddOffer from "./components/host/AddOffer";
import CarOfferForm from "./components/user/redeo";
import HotelOfferForm from "./components/host/HotelOfferForm";
import PageHost from "./components/host/PageHost";
import RegisterH from "./components/host/RegisterH";
import RestaurantOfferForm from "./components/host/RestaurantOfferForm";
import TourOfferForm from "./components/host/TourOfferForm";
import Client from "./scenes/contacts/Client";
import Notifications from "./components/host/Notifications";


import "./App.css";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Hotel from "./pages/Hotel";
import HotelDetails from "./pages/HotelDetails";
import Restaurant from "./pages/Restaurant";
import RestaurantDetails from "./pages/RestaurantDetails";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterHosterPage from "./pages/HostRegistration";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);


  return (
    <div>
          
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/client/:id" element={<Client/>} />
              </Routes>
       
   


      {/* <Route path="/add_offer" element={<AddOffer/>} />
        <Route path="/car_offer_form" element={<CarOfferForm/>} />
        <Route path="/hotel_offer_form" element={<HotelOfferForm/>} />
        <Route path="/page_host" element={<PageHost/>} />
        <Route path="/register_host" element={<RegisterH/>} />
        <Route path="Restaurant_offer_form" element={<RestaurantOfferForm/>} />
        <Route path="TourOfferForm" element={<TourOfferForm/>} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}



      {/* <div>
        <Routes>
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<Car />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<Details />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div> */}

      {/* <Routes>
        <Route path="/login" element={<Auth onLogin={handleLogin} />} />

        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

        <PrivateRoute path="/dashboard" element={<Dashboard />} isLoggedIn={isLoggedIn} />

      </Routes> */}


      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/restaurants" element={<Restaurant />} />
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/RegisterHosterForm" element={<RegisterHosterPage />} />
     
      </Routes>

    </div>
  );
}

export default App;
