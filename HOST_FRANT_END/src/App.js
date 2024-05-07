import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Auth from "./components/Auth";
import Inscr from "./components/Inscr";
import store from "./store";
import Details from "./components/Details";
import PageHost from "./components/PageHost";
import AddOffer from "./components/AddOffer";
import './index.css';

import Restaurants from "./components/Restaurants";
import RegisterH from "./components/RegisterH";
import CarOfferFormMod from "./components/CarOfferFormMod";
import HotelOfferFormMod from "./components/HotelOfferFormMod";
import RestaurantOfferFormMod from "./components/RestaurantOfferFormMod";
import TourOfferFormMod from "./components/TourOfferFormMod";

import RestaurantOfferForm from "./components/RestaurantOfferForm";
import HotelOfferForm from "./components/HotelOfferForm";
import TourOfferForm from "./components/TourOfferForm";
import CarOfferForm from "./components/CarOfferForm";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path="/" index element={<Auth />} />
          <Route path="/insc" element={<Inscr />} />
          <Route path="*" element={<h1>Error</h1>} />
          <Route path="/restaurant/:id" element={<Details/>} />
          <Route path="/restaurant/restaurant" element={<Restaurants/>} />
          <Route path="/host" element={<RegisterH/>} />
          <Route path="/hostPage" element={<PageHost hostId/>}/>
          <Route path="/addOffer" element={<AddOffer/>}/>
          <Route path="/addOffer/restaurant" element={<RestaurantOfferForm/>}/>
          <Route path="/addOffer/hotel" element={<HotelOfferForm/>}/>
          <Route path="/addOffer/tour" element={<TourOfferForm/>}/>
          <Route path="/addOffer/car" element={<CarOfferForm/>}/>
          <Route path="/car-offer-form/:id" element={<CarOfferFormMod/>}/>
          <Route path="/hotel-offer-form/:id" element={<HotelOfferFormMod/>}/>
          <Route path="/restaurant-offer-form/:restaurantId" element={<RestaurantOfferFormMod/>}/>
          <Route path="/tour-offer-form/:id" element={<TourOfferFormMod/>}/>




        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
