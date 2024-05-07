import axios from "axios";
import { useState, useEffect } from "react";

const ClientReservations = () =>{
    const [reservations, setReservations] = useState([]);
    const [offerId, setOfferId] = useState(null);


    const get_reservation_id = (offerId) =>{
        console.log("Offer Id:", offerId);

        if (!offerId) {
            console.error('Error: Offer ID is missing');
            return;
        }
        axios.get(`http://localhost:8000/api/offer/${offerId}/reservations`)
        
        .then(response =>{
            setReservations(response.data);
        console.log("Offer ID:", offerId);

        })
        .catch(error =>{
            console.error('Error fetching reservations:', error);
        })
    };
    useEffect(()=>{
        get_reservation_id(offerId);
    }, [offerId]);

    const handleDelete = async (reservationId) => {
        try {
            await axios.delete(`http://localhost:8000/api/reservations/${reservationId}`);
            
            setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationId));
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };
    const renderReservationInfo = (reservation) => {
        if (reservation.car_id) {
            return `start date: ${reservation.start_date}, end date: ${reservation.end_date}`;
        } else if (reservation.restaurant_id) {
            return `Date: ${reservation.reservation_date_restaurant}`;
        } else if (reservation.hotel_id) {
            return `Check-in Date: ${reservation.start_date}, Check-out Date: ${reservation.end_date}`;
        } else if (reservation.tour_id) {
            return `start date: ${reservation.start_date}, end date: ${reservation.end_date}`;
        } else {
            return '';
        }
    };

    return(
        <div className="reservations-container">
            <h2>Your Reservations</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        {renderReservationInfo(reservation)}
                        <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ClientReservations;