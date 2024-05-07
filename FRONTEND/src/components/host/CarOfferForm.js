import axios from "axios";
import { useEffect,useState } from "react";
export default function CarOfferForm(){
    const [priceDay, setPriceDay] = useState('');
    const [prodDate, setProdDate] = useState('');
    const [fuel, setFuel] = useState('');
    const [nbrPlace, setNbrPlace] = useState('');
    const [description, setDescription] = useState('');
    const [type,setType]=useState('')
    const[models,setModels]=useState([])
    const[brands,setBrands]=useState([])
    const[brandName,setBrandName]=useState('')

    const[modelName,setModelName]=useState('')



    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/car/models');
                console.log(response.data.model)
                setModels(response.data.model);
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/car/brands/brands');
                console.log(response.data.brand)
                setBrands(response.data.brand);
            } catch (error) {
                console.error('Error fetching brand:', error);
            }
        };


        fetchModels();
        fetchBrands();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cars/store', {
                type,
                car: {
                    prodDate,
                    priceDay,
                    fuel,
                    nbrPlace,
                    model_name: modelName,
                    brand_name:brandName,
                    description,
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
                <label>Description:</label>
                <textarea name="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label>Type:</label>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
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
                <label>Brand:</label>
                <select value={brandName} onChange={(e) => setBrandName(e.target.value)}>
                    <option value="">Select Brand</option>
                    {Array.isArray(brands) && brands.map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Model:</label>
                <select value={modelName} onChange={(e) => setModelName(e.target.value)}>
                    <option value="">Select Model</option>
                    {Array.isArray(models) && models.map((models, index) => (
                        <option key={index} value={models}>{models}</option>
                    ))}
                </select>
            </div>
           
           
           
            <button type="submit">Submit</button>
        </form>
    );
}