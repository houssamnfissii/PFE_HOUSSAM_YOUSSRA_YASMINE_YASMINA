import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Details = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reservationDate, setReservationDate] = useState('');
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/restaurants/${id}`);
        console.log(response.data);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

 

    fetchRestaurant();
  
  }, [id]);



  const handleReservation = (id,date,type) => {
    axios.post('http://localhost:8000/api/reservations/store_table', {
            id:id,
            date:date,
            type:type
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error("Une erreur s'est produite !", error);
        });
  };

  return (
    <div className="details-container">
      <div className="details-content">
        {restaurant && (
          <>
            <h2>{restaurant.restaurant.name}</h2>
            <div >
              
                {restaurant.offer && restaurant.offer.images && restaurant.offer.images.map((image, index) => (
                  <div key={index} className="image-slide">
                    <img src={image} alt={`Image ${index + 1}`} className="restaurant-image" />
                  </div>
                ))}
              
            </div>
            <p>Description: {restaurant.restaurant.description}</p>
            <p>City: {restaurant.restaurant.city.name}</p>
            <p>Cuisine: {restaurant.restaurant.cuisine.name}</p>

            <div className="reservation-section">
              <label>Date de Reservation</label>
              <input
                type="date"
                className="reservation-input"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                placeholder="Date de réservation"
              />
              <label>Choose Table</label>
              <select value={type} onChange={(e)=>{setType(e.target.value)}}>
                {restaurant.tables.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
              <button className="btn" onClick={()=>{handleReservation(restaurant.restaurant.id,reservationDate,type)}}>
                Réserver
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
