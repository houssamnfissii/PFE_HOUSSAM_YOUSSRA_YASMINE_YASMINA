import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './PageHost.css';
import NavHost from "./NavHost";
import VerNavHost from "./VerNavHost";

//imported icons
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";


export default function HostPage() {
  const [offers, setOffers] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [filteredOffers, setFilteredOffers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem('jwt');
        console.log('Token from localStorage:', token);

        const response = await fetch('http://127.0.0.1:8000/api/offers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Data from API:', data);
          setOffers(data);
          setFilteredOffers(data); 
        } else if (response.status === 401) {
          navigate('/');
        } else {
          console.error('Une erreur s\'est produite lors de la récupération des offres');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite:', error);
      }
    };

    fetchOffers();
  }, [navigate]);
  
  

  const handleDeleteOffer = async (offerId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/offers/${offerId}`);
      if (response.status === 200) {
        setOffers(prevOffers => prevOffers.filter(offer => offer.id !== offerId));
        setFilteredOffers(prevOffers => prevOffers.filter(offer => offer.id !== offerId));
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    if (type === "") {
      setFilteredOffers(offers); 
    } else {
      const filtered = offers.filter(offer => offer.type === type);
      setFilteredOffers(filtered);
    }
  };
  const handleSelectOffer = (offer) => {
    switch (offer.type) {
      case 'Car':
        navigate(`/car-offer-form/${offer.id}`); 
        break;
      case 'Hotel':
        navigate(`/hotel-offer-form/${offer.id}`);
        break;
      case 'Restaurant':
        navigate(`/restaurant-offer-form/${offer.id}`);
        break;
      case 'Tour':
        navigate(`/tour-offer-form/${offer.id}`);
        break;
      default:
        navigate(`/default-offer-form/${offer.id}`);
    }

    
  };
  return (
    <div className="page-container">
      <NavHost/>

      <div className="OffresSection">
        <div>
          <VerNavHost/>
        </div>
         
        
        <div className="content-container">
          <div className="FlexTitles">
            <h2 className="Title">My Offers</h2>
            <select value={selectedType} onChange={handleTypeChange} className="SelectOffres">
              <option value="">Search offer by type</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Hotel">Hotel</option>
              <option value="Tour">Tour</option>
              <option value="Car">Car</option>
            </select>
          </div>
        

        <div className="offers-container">
          
          <ul>
          {filteredOffers.map(offer => (
  <li key={offer.id}>
    
    {/* {offer.images.length > 0 &&
      <img src={offer.images[0].url}  className="offer-image" />
    } */}
  {offer.type === 'Restaurant' && offer.restaurant && (
  <>
    <table className="TableOffers">
      <tr>
        <th>Restaurant Name</th>
        <th>Description</th>
        <th>City</th>
        <th>Cuisine</th>
        <th>Tables</th>
        <th>Actions</th>
      </tr>
    
      <tr>
        <td>{offer.restaurant.name}</td>
        <td>{offer.restaurant.description}</td>
        <td>{offer.restaurant.city.name}</td>
        <td>{offer.restaurant.cuisine.name}</td>
        <td>
          {offer.restaurant.tables && offer.restaurant.tables.map(table => (
            <div key={table.id}>
              <p>{table.type}</p>
            </div>
          ))}
        </td>
        <td className="Action">
          <button onClick={() => handleDeleteOffer(offer.id)} className="deleteOffer" ><MdDelete className="Icon"/></button>
          <button onClick={() => handleSelectOffer(offer)} className="UpdateOffer"><FiEdit className="Icon"/></button>,
          <button className=" DetailsOffer"><IoIosArrowForward className="Icon"/></button>
        </td>
      </tr>
    </table>
    {/* <p>Restaurant Name: {offer.restaurant.name}</p>
    <p>Description: {offer.restaurant.description}</p>
    <p>City: {offer.restaurant.city.name}</p>
    <p>Cuisine: {offer.restaurant.cuisine.name}</p>
    <h3>Tables:</h3>
    {offer.restaurant.tables && offer.restaurant.tables.map(table => (
      <div key={table.id}>
        <p>Table Type: {table.type}</p>
      </div>
    ))} */}
  
  </>
  
)}



   {offer.type === 'Hotel' && offer.hotel &&
  <>
    <table className="TableOffers">
      <tr>
        <th>Hotel Name</th>
        <th>Address</th>
        <th>Description</th>
        <th>Number of Stars</th>
        <th>City</th>
        <th>Actions</th>
      </tr>
    
      <tr>
        <td>{offer.hotel.name}</td>
        <td>{offer.hotel.address}</td>
        <td>{offer.hotel.description}</td>
        <td>{offer.hotel.nbr_stars}</td>
        <td>{offer.hotel.city.name}</td>
        <td className="Action">
          <button onClick={() => handleDeleteOffer(offer.id)} className="deleteOffer"><MdDelete className="Icon"/></button>
          <button onClick={() => handleSelectOffer(offer)} className="UpdateOffer"><FiEdit className="Icon"/></button>
          <button className=" DetailsOffer"><IoIosArrowForward className="Icon"/></button>
        </td>
      </tr>
    </table>
    {/* <p>Hotel Name: {offer.hotel.name}</p>
    <p>Address: {offer.hotel.address}</p>
    <p>Description: {offer.hotel.description}</p>
    <p>Number of Stars: {offer.hotel.nbr_stars}</p>
    <p>City: {offer.hotel.city.name}</p> Access city name */}

    {/* Render other hotel-specific details here */}

    {/* <h3>Rooms:</h3> */}
    {/* <ul> */}
      {/* {offer.hotel.rooms.map(room => (
        <li key={room.id}> */}
          {/* <p>Room Type: {room.roomtype.name}</p>
          <p>Number of Beds: {room.nbr_beds}</p>
          <p>Price per Night: {room.price_per_night}</p>
          <p>Description: {room.description}</p> */}
          {/* Render other room-specific details here */}
        {/* </li> */}
      {/* ))} */}
    {/* </ul> */}
  </>
    }
  {offer.type === 'Tour' && offer.tour && (
  <>
    <table className="TableOffers">
      <tr>
        <th>Tour Name</th>
        <th>Description</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Number of People</th>
        <th>Price per Person</th>
        <th>Actions</th>
      </tr>
    
      <tr>
        <td>{offer.tour.name}</td>
        <td>{offer.tour.description}</td>
        <td>{offer.tour.start_date}</td>
        <td>{offer.tour.end_date}</td>
        <td>{offer.tour.nbr_people}</td>
        <td>{offer.tour.price_per_person}</td>
        <td className="Action">
          <button onClick={() => handleDeleteOffer(offer.id)} className="deleteOffer"><MdDelete className="Icon"/></button>
          <button onClick={() => handleSelectOffer(offer)} className="UpdateOffer"><FiEdit className="Icon"/></button>
          <button className=" DetailsOffer"><IoIosArrowForward className="Icon"/></button>
        </td>
      </tr>
    </table>
    {/* <p>Tour Name: {offer.tour.name}</p>
    <p>Description: {offer.tour.description}</p>
    <p>Start Date: {offer.tour.start_date}</p>
    <p>End Date: {offer.tour.end_date}</p>
    <p>Number of People: {offer.tour.nbr_people}</p>
    <p>Price per Person: {offer.tour.price_per_person}</p> */}
    
    {/* <h3>Activities:</h3> */}
    {/* <ul> */}
      {/* {offer.tour.activities && offer.tour.activities.map(activity => (
        <li key={activity.id}>
          <p>{activity.name}</p>
          <p>Description: {activity.description}</p> */}
          {/* Render other activity-specific details here */}
        {/* </li>
      ))}
    </ul> */}

    {/* <h3>Staff Members:</h3>
    <ul>
      {offer.tour.staffs && offer.tour.staffs.map(staff => (
        <li key={staff.id}>
          <p>Name: {staff.first_name} {staff.last_name}</p>
          <p>Role: {staff.role}</p>
          <p>Telephone: {staff.telephone}</p> */}
          {/* Render other staff-specific details here */}
        {/* </li>
      ))}
    </ul> */}

    {/* <h3>Transportation:</h3>
    <ul>
      {offer.tour.transportations && offer.tour.transportations.map(transportation => (
        <li key={transportation.id}>
          <p>Registration Number: {transportation.registration_number}</p>
          <p>Type: {transportation.type}</p>
          <p>Number of Places: {transportation.nbr_places}</p> */}
          {/* Render other transportation-specific details here */}
        {/* </li>
      ))}
    </ul> */}
    
    {/* <h3>Cities:</h3>
    <ul>
      {offer.tour.cities && offer.tour.cities.map(city => (
        <li key={city.id}>
          <p>{city.name}</p> */}
          {/* Render other city-specific details here */}
        {/* </li>
      ))}
    </ul> */}
  </>
)}


  {offer.type === 'Car' && offer.car && offer.car.cmodel && offer.car.cmodel.cbrand && // Perform null checks
  <>
  <table className="TableOffers">
      <tr>
        <th>Car Brand</th>
        <th>Car Model</th>
        <th>Price per Day</th>
        <th>Production Date</th>
        <th>Fuel Type</th>
        <th>City</th>
        <th>Number of Places</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    
      <tr>
        <td>{offer.car.cmodel.cbrand.name || "Unknown Brand"}</td>
        <td>{offer.car.cmodel.name || "Unknown Model"}</td>
        <td>{offer.car.price_per_day}</td>
        <td>{offer.car.production_date}</td>
        <td>{offer.car.fuel}</td>
        <td>{offer.car.city.name}</td>
        <td>{offer.car.nbr_places}</td>
        <td>{offer.car.description}</td>
        <td className="Action">
          <button onClick={() => handleDeleteOffer(offer.id)} className="deleteOffer"><MdDelete className="Icon"/></button>
          <button onClick={() => handleSelectOffer(offer)} className="UpdateOffer"><FiEdit className="Icon"/></button>
          <button className=" DetailsOffer"><IoIosArrowForward className="Icon"/></button>
        </td>
      </tr>
    </table>
    {/* <p>Car Brand: {offer.car.cmodel.cbrand.name || "Unknown Brand"}</p>
    <p>Car Model: {offer.car.cmodel.name || "Unknown Model"}</p>
    <p>Price per Day: {offer.car.price_per_day}</p>
    <p>Production Date: {offer.car.production_date}</p>
    <p>Fuel Type: {offer.car.fuel}</p>
    <p>City: {offer.car.city.name}</p>

    <p>Number of Places: {offer.car.nbr_places}</p>
    <p>Description: {offer.car.description}</p> */}
    {/* Render other car-specific details here */}
  </>
}


    {/* <button onClick={() => handleDeleteOffer(offer.id)}>Delete</button>
    <button onClick={() => handleSelectOffer(offer)}>Update</button> */}
  </li>
            ))}
          </ul>
        </div>
      </div>
      </div>

      
    </div>
  );
}
