import React, { useState } from 'react';
import RestaurantOfferForm from './RestaurantOfferForm';
import CarOfferForm from './CarOfferForm';
import HotelOfferForm from './HotelOfferForm';
import TourOfferForm from './TourOfferForm';
import './AddOfferStyles.css'; 
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import NavHost from './NavHost';

export default function AddOffer() {
    const [selected, setSelected] = useState("");
    const navigate=useNavigate();

    
    

    return (
        <div className="container">
            <NavHost/>
            <div className='AddOfferSection'>
                <select value={selected} onChange={(e)=> setSelected(e.target.value)} className='selectOffer'>
                    <option value="">Select an offer</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="tour">Tour</option>
                    <option value="hotel">Hotel</option>
                    <option value="car">Car</option>
                </select>
                {selected === "restaurant" && <RestaurantOfferForm />}
                {selected === "car" && <CarOfferForm />}
                {selected === "hotel" && <HotelOfferForm />}
                {selected === "tour" && <TourOfferForm />}
            </div>
            
        </div>
    );
}
