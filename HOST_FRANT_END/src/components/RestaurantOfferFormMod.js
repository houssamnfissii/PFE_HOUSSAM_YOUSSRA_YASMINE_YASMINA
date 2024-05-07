import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VerNavHost from "./VerNavHost";
import NavHost from "./NavHost";
import './RestaurantOfferFormMod.css'

export default function RestaurantModificationPage() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    cuisine: "",
    city: "",
    description: "",
    tables: []
  }); 
  const [cities, setCities] = useState([]);
  const [cuisines, setCuisines] = useState([]);


  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/restaurants/${restaurantId}`);
        const { name, address, cuisine, city, description, tables } = response.data.restaurant;

        setRestaurant({
          name,
          address,
          cuisine, 
          city,
          description,
          tables
        });
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };
    const fetchCitiesAndCuisines = async () => {
        try {
          const citiesResponse = await axios.get('http://127.0.0.1:8000/api/cities');
          console.log(citiesResponse.data.cities)
          setCities(citiesResponse.data.cities);
  
          const cuisinesResponse = await axios.get('http://127.0.0.1:8000/api/cuisines/cuisines/cuisines');
          console.log(cuisinesResponse.data.cuisine)
          setCuisines(cuisinesResponse.data.cuisine);
        } catch (error) {
          console.error('Error fetching cities and cuisines:', error);
        }
      };
  
      fetchRestaurant();
      fetchCitiesAndCuisines();
    }, [restaurantId]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurant(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateRestaurant = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.put(`http://localhost:8000/api/restaurants/${restaurantId}`, restaurant, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Restaurant mis à jour:", response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du restaurant:', error);
    }
  };
  const handleTableInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTables = [...restaurant.tables];
    updatedTables[index][name] = value;
    setRestaurant(prevState => ({
      ...prevState,
      tables: updatedTables
    }));
  };

  const handleAddTable = () => {
    setRestaurant(prevState => ({
      ...prevState,
      tables: [...prevState.tables, { type: "", quantity: "" }]
    }));
  };

  const handleRemoveTable = (index) => {
    const updatedTables = [...restaurant.tables];
    updatedTables.splice(index, 1);
    setRestaurant(prevState => ({
      ...prevState,
      tables: updatedTables
    }));
  };

  return (
    <div>
      <NavHost/>
      <div className="flexResMod">
        <VerNavHost/>
        <div className="restaurant-offer-formMod">
          <h1>Modifier le restaurant</h1>
          <div className="flexColResMod">
            <label>Nom :</label>
            <input type="text" name="name" value={restaurant.name} onChange={handleInputChange} className="inputResMod"/>
          </div>
          <div className="flexColResMod">
            <label>Adresse :</label>
            <input type="text" name="address" value={restaurant.address} onChange={handleInputChange} className="inputResMod"/>
          </div>
          <div className="flexColResMod">
            <label>Cuisine :</label>
            <select name="cuisine" value={restaurant.cuisine} onChange={handleInputChange} className="inputResMod">
              <option value="">Sélectionner une cuisine</option>
              {cuisines.map((cuisine, index) => (
                <option key={index} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>
          <div className="flexColResMod">
            <label>Ville :</label>
            <select name="city" value={restaurant.city} onChange={handleInputChange} className="inputResMod">
              <option value="">Sélectionner une ville</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="flexColResMod">
            <label>Description :</label>
            <textarea name="description" value={restaurant.description} onChange={handleInputChange} className="inputResMod"></textarea>
          </div>
          <h2>Types de tables :</h2>
          {restaurant.tables && restaurant.tables.map((table, index) => (
            <div key={index}>
              <div className="flexColResMod">
                <label>Type de table :</label>
                <input type="text" name="type" value={table.type} onChange={(e) => handleTableInputChange(index, e)} className="inputResMod"/>
              </div>
              <div className="flexColResMod">
                <label>Quantité :</label>
                <input type="text" name="quantity" value={table.quantity} onChange={(e) => handleTableInputChange(index, e)} className="inputResMod"/>
              </div>
              <div className="flexBtns">
                <button type="button" onClick={() => handleRemoveTable(index)} className="suppTable">Supprimer</button>
                <button type="button" onClick={handleAddTable} className="AjouterTable">Ajouter une table</button>
              </div>
              
            </div>
          ))}
          
          <button onClick={handleUpdateRestaurant} className="updateBtnRes">Mettre à jour</button>
        </div>
      </div>
      
    </div>
  );
}

