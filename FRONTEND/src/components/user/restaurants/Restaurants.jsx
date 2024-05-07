import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [cities, setCities] = useState([]); 
  const [cuisines, setCuisines] = useState([]);
  const [selectedCity, setSelectedCity] = useState(''); 
  const [selectedCuisine, setSelectedCuisine] = useState(''); 

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/restaurants/restaurant_offers');
        console.log(response.data.data)
        setRestaurants(response.data.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cities');
        setCities(response.data.cities); 
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    const fetchCuisines = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cuisines/cuisines/cuisines');
        console.log(response.data.cuisine)
        setCuisines(response.data.cuisine); 
      } catch (error) {
        console.error('Error fetching cuisines:', error);
      }
    };

    fetchRestaurants();
    fetchCities();
    fetchCuisines();
  }, []);

  const filteredRestaurants = restaurants.filter(({ restaurant }) => {
    const cityMatch = !selectedCity || restaurant.city_name === selectedCity;
    const cuisineMatch = !selectedCuisine || restaurant.cuisine_name === selectedCuisine;
    return cityMatch && cuisineMatch;
  });

  return (
    <div>
      <h1>TOP RESTAURANTS</h1>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select a city</option>
        {Array.isArray(cities) && cities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>

      <select
        value={selectedCuisine}
        onChange={(e) => setSelectedCuisine(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select a cuisine</option>
        {Array.isArray(cuisines) && cuisines.map((cuisine, index) => (
          <option key={index} value={cuisine}>{cuisine}</option>
        ))}
      </select>

      {filteredRestaurants.map(({ restaurant }, index) => (
        <div key={index} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
          <div className="order-1 sm:ml-6 xl:ml-0">
            <h3 className="mb-1 text-slate-900 font-semibold">
              <span className="mb-1 block text-sm leading-6 text-indigo-500">{restaurant.name}</span><br/>
              Description: {restaurant.description}
            </h3>
            <p className="text-slate-600 mb-2">Cuisine: {restaurant.cuisine_name}</p>
            <p className="text-slate-600 mb-2">City: {restaurant.city_name}</p>
            <h4 className="text-slate-600 mb-2">Offer Images:</h4>
            {restaurant.offer && restaurant.offer.images && restaurant.offer.images.length > 0 && (
              <img
                src={restaurant.offer.images[0].url}
                alt=""
                className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                width="1216"
                height="640"
              />
            )}
            <Link
              to={`/restaurants/${restaurant.id}`}
              className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
            >
              Learn more
              <span className="sr-only"></span>
              <svg
                className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
                width="3"
                height="6"
                viewBox="0 0 3 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0L3 3L0 6"></path>
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Restaurants;