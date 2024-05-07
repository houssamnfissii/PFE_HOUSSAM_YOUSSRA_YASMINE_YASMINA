import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './HotelOfferFormMod.css'

import NavHost from './NavHost'
import VerNavHost from './VerNavHost'

export default function HotelOfferFormMod() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [offerData, setOfferData] = useState({
    hotel: {
      name: "",
      address: "",
      nbr_stars: "",
      description: "",
      city_id: "", // Updated to use city_id
      rooms: [
        {
          quantity: 1, // Default quantity is 1
          nbr_beds: "",
          price_per_night: "",
          description: "",
          roomtype_id: ""
        }
      ]
    }
  });
  const [cities, setCities] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`http://127.0.0.1:8000/api/hotels/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const offerData = response.data;
        setOfferData(offerData);
      } catch (error) {
        console.error("An error occurred while fetching offer details:", error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cities/cities');
        setCities(response.data.cities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Get the authentication token from localStorage
        const response = await axios.get('http://127.0.0.1:8000/api/rooms/rooms/typee', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        setRoomTypes(response.data.roomTypes || []);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    }; 
    

    fetchOfferDetails();
    fetchCities();
    fetchRoomTypes();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOfferData(prevData => ({
      ...prevData,
      hotel: { ...prevData.hotel, [name]: value }
    }));
  };

  const handleRoomChange = (index, key, value) => {
    const updatedRooms = [...offerData.hotel.rooms];
    updatedRooms[index][key] = value;
    setOfferData(prevData => ({
      ...prevData,
      hotel: {
        ...prevData.hotel,
        rooms: updatedRooms
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('jwt');
      console.log('Offer data to be sent:', offerData);

      await axios.put(`http://127.0.0.1:8000/api/hotels/${id}`, offerData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Offer successfully updated");
      navigate('/hostPage');
    } catch (error) {
      console.error("An error occurred while updating the offer:", error);
    }
  };

  const handleAddRoom = () => {
    setOfferData(prevData => ({
      ...prevData,
      hotel: {
        ...prevData.hotel,
        rooms: [
          ...prevData.hotel.rooms,
          {
            quantity: 1, 
            nbr_beds: '',
            price_per_night: '',
            description: '',
            roomtype_id: ''
          }
        ]
      }
    }));
  };

  const handleRemoveRoom = async (index) => {
    try {
        const updatedRooms = [...offerData.hotel.rooms];
        const deletedRoomId = updatedRooms[index].id;

        if (deletedRoomId) {
            const token = localStorage.getItem('jwt');
            await axios.delete(`http://127.0.0.1:8000/api/rooms/${deletedRoomId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        updatedRooms.splice(index, 1);
        setOfferData(prevData => ({
            ...prevData,
            hotel: { ...prevData.hotel, rooms: updatedRooms }
        }));
    } catch (error) {
        console.error("An error occurred while removing the room:", error);
    }
};

  return (
    <div >
      <NavHost/>
      <div className="flexHotelOffer">
        <VerNavHost/>
        <div className="HotelOfferSection">
        <h2>Modify Hotel Offer</h2>
      <form onSubmit={handleSubmit}>
        <div className="FlexColHotel">
          <label>Hotel Name:</label>
          <input type="text" name="name" value={offerData.hotel.name} onChange={handleInputChange} />
        </div>
        <div className="FlexColHotel">
          <label>Hotel Description:</label>
          <input type="text" name="description" value={offerData.hotel.description} onChange={handleInputChange} />
        </div>
        <div className="FlexColHotel">
          <label>City:</label>
          <select name="city_id" value={offerData.hotel.city_id} onChange={handleInputChange}>
  <option value="">Select City</option>
  {cities.map((city) => (
    <option key={city.id} value={city.id}>{city.name}</option>
  ))}
</select>

        </div>
        <div className="FlexColHotel">
          <label>Address:</label>
          <input type="text" name="address" value={offerData.hotel.address} onChange={handleInputChange} />
        </div>
        <div className="FlexColHotel">
          <label>Stars Number:</label>
          <input type="text" name="nbr_stars" value={offerData.hotel.nbr_stars} onChange={handleInputChange} />
        </div>
        {offerData.hotel.rooms.map((room, index) => (
  <div key={index}>
    <h3>Room {index + 1}</h3>
    <div className="FlexColHotel">
      <label>Nbr of this Room</label>
      <input type="number" value={room.quantity} onChange={(e) => handleRoomChange(index, 'quantity', e.target.value)} />
    </div>
    <div className="FlexColHotel">
      <label>Nbr of beds</label>
      <input type="text" name="nbr_bedss"  value={room.nbr_beds} onChange={(e) => handleRoomChange(index, 'nbr_beds', e.target.value)} placeholder="Number of beds" />
    </div>
    <div className="FlexColHotel">
      <label>Price per night</label>
      <input type="text" name="price_per_night" value={room.price_per_night} onChange={(e) => handleRoomChange(index, 'price_per_night', e.target.value)} placeholder="Price per night" />
    </div>
    <div className="FlexColHotel">
      <label>description</label>
      <input type="text" value={room.description} onChange={(e) => handleRoomChange(index, 'description', e.target.value)} placeholder="Room description" />
    </div>
    
    <div className="FlexColHotel">
    <label>Room type</label>
    <div>Room Type: {room.roomtype_id ? room.roomtype_id[0] : "Not available"}</div>
    <select value={room.roomtype_id} onChange={(e) => handleRoomChange(index, 'roomtype_id', e.target.value)}>
  <option value="">Select Room Type</option>
  {roomTypes.map(roomType => (
    <option key={roomType.id} value={roomType.id}>{roomType.name}</option>
  ))}
</select>



    <button type="button" onClick={() => handleRemoveRoom(index)} className="RoomBtn">Remove Room</button>
    <button type="button" onClick={handleAddRoom} className="RoomBtn">Add Room</button>
    </div>
  </div>
))}

        
        <button type="submit" className="RoomBtn">Save Changes</button>
      </form>
        </div>
      </div>
      
    </div>

// {room.room_type ? room.room_type[0] : "Not available"}
  );
}
