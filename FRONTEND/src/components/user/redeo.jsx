import axios from "axios";
import { useEffect, useState } from "react";
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
                const response = await axios.get(`http://localhost:8000/api/cities`);
                console.log('get_cities');
                console.log(response.data);
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
        setBrand(e.target.value);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/car/models/${brand}`);
            console.log(response.data.models)
            setModels(response.data.models);
        } catch (error) {
            console.error('Error fetching models:', error);
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cars/store', {
                    city_id:city,
                    prodDate,
                    priceDay,
                    fuel,
                    nbrPlace,
                    model_id: model,
                    description,
               
            });
            console.log("Offer created:", response.data);
            alert("Offer created successfully!");
        } catch (error) {
            console.error("Error creating offer:", error);
            alert("An error occurred while creating the offer.");
        }
    };


    


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label>City</label>
                    <select value={city}
                        onChange={(e)=>{setCity(e.target.value)}}
                    
                    >
                        
                        {
                            cities.map((city, index) => (
                                <option key={index} value={city.id}>
                                    {city.name}
                                </option>
                            ))
                        }
                    </select>
                    <label>Brand:</label>
                    <select value={brand} onChange={handleBrand}>
                        <option value="">Select Brand</option>
                        {Array.isArray(brands) && brands.map((brand_, index) => (
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
                <label>Description:</label>
                <textarea name="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label>Fuel:</label>
                <input type="text" value={fuel} onChange={(e) => setFuel(e.target.value)} />
            </div>
            <div>
                <label>Nombre place:</label>
                <input type="text" value={nbrPlace} onChange={(e) => setNbrPlace(e.target.value)} />
            </div>
            <div>
                <label>Price by Day:</label>
                <input type="text" value={priceDay} onChange={(e) => setPriceDay(e.target.value)} />
            </div>
            <div>
                <label>Production Date:</label>
                <input type="date" value={prodDate} onChange={(e) => setProdDate(e.target.value)} />
            </div>




            <button type="submit">Submit</button>
        </form>
    );
}