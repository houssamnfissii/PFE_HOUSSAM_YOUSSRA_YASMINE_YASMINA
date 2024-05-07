import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './CarOfferFormMod.css'
import NavHost from "./NavHost";
import VerNavHost from "./VerNavHost";

export default function CarOfferFormMod() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [carData, setCarData] = useState({
    brand_id: "",
    model_id: "",
    price_per_day: "",
    production_date: "",
    fuel: "",
    nbr_places: "",
    description: "",
    city_id: ""
  });

  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt');

        const carResponse = await axios.get(`http://127.0.0.1:8000/api/carss/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const carOfferData = carResponse.data.car;
        setCarData(carOfferData);

        const brandResponse = await axios.get('http://127.0.0.1:8000/api/car/brands/brands');
        setBrands(brandResponse.data.brand);

        const cityResponse = await axios.get('http://localhost:8000/api/cities/cities');
        setCities(cityResponse.data.cities);

        if (carOfferData.brand_id) {
          const modelResponse = await axios.get(`http://127.0.0.1:8000/api/car/models/${carOfferData.brand_id}`);
          setModels(modelResponse.data.models);
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (name === "brand_id") {
      const fetchModelsByBrand = async () => {
        try {
          const modelResponse = await axios.get(`http://127.0.0.1:8000/api/car/models/${value}`);
          setModels(modelResponse.data.models);
        } catch (error) {
          setError(error.message);
        }
      };
      
      fetchModelsByBrand();
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const token = localStorage.getItem('jwt');

      const response = await axios.put(`http://127.0.0.1:8000/api/cars/${id}`, carData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Car offer successfully updated:", response.data);
      navigate('/hostPage');
    } catch (error) {
      setError(error.message);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <NavHost/>
      <div className="flexCarMod">
        <VerNavHost/>
        <div className="CarSectionMod">
          <h2>Modifier l'offre de voiture</h2>
          <form onSubmit={handleSubmit}>
            <div className="flexColCar">
              <label>Marque de voiture:</label>
              <select name="brand_id" value={carData.brand_id} onChange={handleInputChange}>
                <option value="">Sélectionner une marque</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            <div className="flexColCar">
              <label>Modèle de voiture:</label>
              <select name="model_id" value={carData.model_id} onChange={handleInputChange}>
                <option value="">Sélectionner un modèle</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </div>
            <div className="flexColCar">
              <label>Prix par jour:</label>
              <input type="text" name="price_per_day" value={carData.price_per_day} onChange={handleInputChange}/>
            </div>
            <div className="flexColCar">
              <label>Date de production:</label>
              <input type="date" name="production_date" value={carData.production_date} onChange={handleInputChange} />
            </div>
            <div className="flexColCar">
              <label>Carburant:</label>
              <input type="text" name="fuel" value={carData.fuel} onChange={handleInputChange} />
            </div>
            <div className="flexColCar">
              <label>Nombre de places:</label>
              <input type="text" name="nbr_places" value={carData.nbr_places} onChange={handleInputChange} />
            </div>
            <div className="flexColCar">
              <label>Description:</label>
              <textarea name="description" value={carData.description} onChange={handleInputChange}></textarea>
            </div>
            <div className="flexColCar">
              <label>Ville:</label>
              <select name="city_id" value={carData.city_id} onChange={handleInputChange}>
                <option value="">Sélectionner une ville</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="updateCarBtn">Enregistrer les modifications</button>
          </form>
        </div>
      </div>
      
    </div>
  );
}



  