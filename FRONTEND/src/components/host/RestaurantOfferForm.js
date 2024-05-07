import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RestaurantOfferForm() {
    const [name, setName] = useState('');
    const [cuisineName, setCuisineName] = useState('');
    const [cityName, setCityName] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [tables, setTables] = useState([{ type: '', quantity: 1 }]);

    const [description, setDescription] = useState('');
    const [cuisines, setCuisines] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cities');
                console.log(response.data.cities)
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


        fetchCities();
        fetchCuisines();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/offers/store', {
                type,
                restaurant: {
                    name,
                    cuisine_name: cuisineName,
                    city_name: cityName,
                    address,
                    description,
                },
                
                table_type: tables.map(table => table.type),
                table_quantity: tables.map(table => table.quantity),
            });
            console.log("Offer created:", response.data);
            alert("Offer created successfully!");
        } catch (error) {
            console.error("Error creating offer:", error);
            alert("An error occurred while creating the offer.");
        }
    };
    
    const handleTableTypeChange = (index, event) => {
        const newTables = [...tables];
        newTables[index].type = event.target.value;
        setTables(newTables);
    };

    const handleTableQuantityChange = (index, event) => {
        const newTables = [...tables];
        newTables[index].quantity = parseInt(event.target.value);
        setTables(newTables);
    };

    const addTable = () => {
        setTables([...tables, { type: '', quantity: 1 }]);
    };

    const removeTable = (index) => {
        const newTables = [...tables];
        newTables.splice(index, 1);
        setTables(newTables);
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
                <label>Name of restaurant:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Address:</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
                <label>Cuisine:</label>
                <select value={cuisineName} onChange={(e) => setCuisineName(e.target.value)}>
                    <option value="">Select Cuisine</option>
                    {Array.isArray(cuisines) && cuisines.map((cuisine, index) => (
                        <option key={index} value={cuisine}>{cuisine}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>City:</label>
                <select value={cityName} onChange={(e) => setCityName(e.target.value)}>
                    <option value="">Select City</option>
                    {Array.isArray(cities) && cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div>
                {tables.map((table, index) => (
                    <div key={index}>
                        <label>Choose table type:</label>
                        <select value={table.type} onChange={(e) => handleTableTypeChange(index, e)}>
                            <option value="">Select Table Type</option>
                            <option value="Table 2">Table 2</option>
                            <option value="Table 4">Table 4</option>
                            <option value="Table 6">Table 6</option>
                            <option value="Table 8">Table 8</option>
                            <option value="Table 10">Table 10</option>
                        </select>
                        <label>Choose table quantity:</label>
                        <input
                            type="number"
                            value={table.quantity}
                            onChange={(e) => handleTableQuantityChange(index, e)}
                            min="1"
                            step="1"
                        />
                        <button type="button" onClick={() => removeTable(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addTable}>Add Table</button>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}
