import axios from "axios";
import { useEffect, useState } from "react";

export default function CarOfferForm() {
    const [priceDay, setPriceDay] = useState('');
    const [prodDate, setProdDate] = useState('');
    const [fuel, setFuel] = useState('');
    const [nbrPlace, setNbrPlace] = useState('');
    const [description, setDescription] = useState('');
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [images, setImages] = useState(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/car/brands/brands');
                setBrands(response.data.brand);
            } catch (error) {
                console.error('Error fetching brand:', error);
            }
        };

        const fetchModels = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/car/models`);
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
                console.error("An error occurred:", error);
            }
        }

        fetchModels();
        fetchBrands();
        fetchCities();
    }, []);

    const handleFileChange = (e) => {
        const files = e.target.files;
        setImages(files);
    };
    
    const handleBrand = async (e) => {
        const selectedBrandId = e.target.value;
        console.log("Selected brand ID:", selectedBrandId);
        setBrand(selectedBrandId); 
    
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/car/models/${selectedBrandId}`);
            console.log(response.data.models);
            setModels(response.data.models);
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
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
            formData.append('type', 'Car');
    
            if (images) {
                for (let i = 0; i < images.length; i++) {
                    formData.append(`images[${i}]`, images[i]);
                }
            }
    
            const response = await axios.post('http://127.0.0.1:8000/api/cars/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
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
            <div>
    <label>Images:</label>
    <input type="file" accept="image/*" multiple onChange={handleFileChange} />
</div>






            <button type="submit">Submit</button>
        </form>
    );
}


