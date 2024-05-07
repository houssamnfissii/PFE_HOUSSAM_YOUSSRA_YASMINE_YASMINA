import axios from "axios";
import { useEffect, useState } from "react";
import './CarOfferForm.css'; 
import NavHost from "./NavHost";
import VerNavHost from "./VerNavHost";

export default function CarOfferForm() {
    const [priceDay, setPriceDay] = useState('');
    const [prodDate, setProdDate] = useState('');
    const [fuel, setFuel] = useState('');
    const [nbrPlace, setNbrPlace] = useState('');
    const [description, setDescription] = useState('');
    const [models, setModels] = useState([])
    const [brands, setBrands] = useState([])
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('');
    const [cities,setCities] = useState([]);
    const [city,setCity] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/car/brands/brands');
                console.log(response.data.brand)
                setBrands(response.data.brand);
            } catch (error) {
                console.error('Error fetching brand:', error);
            }
        };

        const fetchModels = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/car/models`);
                console.log(response.data.model)
                setModels(response.data.model);
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        const fetchCities = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/cities/cities`);
                setCities(response.data.cities);
            } catch (error) {
                console.error("Une erreur s'est produite:", error);
            }
        }
        fetchModels();
        fetchBrands();
        fetchCities();
    }, []);

    const handleBrand = async (e) => {
        const selectedBrandId = e.target.value;
        setBrand(selectedBrandId); 
    
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/car/models/${selectedBrandId}`);
            setModels(response.data.models);
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem('jwt');
    
        try {
            const formData = new FormData();
            formData.append('car[brand_id]', brand);
            formData.append('car[model_id]', model);
            formData.append('car[priceDay]', priceDay);
            formData.append('car[production_date]', prodDate);
            formData.append('car[fuel]', fuel);
            formData.append('car[nbrPlace]', nbrPlace);
            formData.append('car[description]', description);
            formData.append('car[city_id]', city);
            formData.append('type', "Car");
    
            
    
            const response = await axios.post('http://127.0.0.1:8000/api/cars/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });
    
            console.log("Offer created:", response.data);
            alert("Offer created successfully!");
        } catch (error) {
            console.error("Error creating offer:", error);
            alert("An error occurred while creating the offer.");
        }
    };
    

    const handleImageChange = (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        setImages(filesArray);
    };

    return (
        <div>
            <NavHost/>
            <div className="FlexCar">
                <div>
                    <VerNavHost/>
                </div>
                <form onSubmit={handleSubmit} className="car-offer-form">
         
            <div>
                <label>City</label>
                <select value={city} onChange={(e)=>{setCity(e.target.value)}}>
                    {cities.map((city, index) => (
                        <option key={index} value={city.id}>{city.name}</option>
                    ))}
                </select>
                <label>Brand:</label>
                <select value={brand} onChange={handleBrand}>
                    <option value="">Select Brand</option>
                    {brands.map((brand_, index) => (
                        <option key={index} value={brand_.id}>{brand_.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Model:</label>
                <select value={model} onChange={(e) => setModel(e.target.value)}>
                    <option value="">Select Model</option>
                    {Array.isArray(models) && models.map((model_, index) => (
                        <option key={index} value={model_.id}>{model_.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
            </div>
            <div>
                <label>Fuel:</label>
                <input type="text" value={fuel} onChange={(e) => setFuel(e.target.value)} placeholder="Fuel" />
            </div>
            <div>
                <label>Number of places:</label>
                <input type="text" value={nbrPlace} onChange={(e) => setNbrPlace(e.target.value)} placeholder="Number of Places"/>
            </div>
            <div>
                <label>Price by Day:</label>
                <input type="text" value={priceDay} onChange={(e) => setPriceDay(e.target.value)} placeholder="Price by Day" />
            </div>
            <div>
                <label>Production Date:</label>
                <input type="date" value={prodDate} onChange={(e) => setProdDate(e.target.value)} placeholder="Production Date"/>
            </div>
            <button type="submit">Submit</button>
        </form>
            </div>
        </div>
    );
}
