import React, { useState } from 'react';
import RestaurantOfferForm from './RestaurantOfferForm';
import CarOfferForm from './CarOfferForm';
import HotelOfferForm from './HotelOfferForm';
import TourOfferForm from './TourOfferForm';
export default function AddOffer() {
    const [selected, setSelected] = useState("");

   

    return (
        <div>
            <select value={selected} onChange={(e)=> setSelected(e.target.value)}>
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
    );
}