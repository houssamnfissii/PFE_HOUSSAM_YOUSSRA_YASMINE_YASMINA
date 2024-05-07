import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function HotelOfferForm() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [nbrStars, setNbrStars] = useState('');
    const [cityName, setCityName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [rooms, setRooms] = useState([{ nbrBeds: '', priceDay: '', descriptionRo: '', typeRoName: '' }]);

    const [cities, setCities] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cities');
                setCities(response.data.cities);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/rooms/rooms/type');
                setRoomTypes(response.data.roomType);
            } catch (error) {
                console.error('Error fetching room types:', error);
            }
        };

        fetchCities();
        fetchRoomTypes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/hotels/store', {
                type,
                hotel: {
                    name,
                    address,
                    nbr_stars: nbrStars,
                    city_name: cityName,
                    description,
                },
                rooms,
            });
            console.log("Offer created:", response.data);
            alert("Offer created successfully!");
        } catch (error) {
            console.error("Error creating offer:", error);
            alert("An error occurred while creating the offer.");
        }
    };

    const handleAddRoom = () => {
        setRooms([...rooms, { nbrBeds: '', priceDay: '', descriptionRo: '', typeRoName: '' }]);
    };

    const handleRemoveRoom = (index) => {
        const updatedRooms = [...rooms];
        updatedRooms.splice(index, 1);
        setRooms(updatedRooms);
    };

    const handleRoomChange = (index, key, value) => {
        const updatedRooms = [...rooms];
        updatedRooms[index][key] = value;
        setRooms(updatedRooms);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Type d'Offre:</label>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div>
                <label>Name Hotel:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Description Hotel:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>City:</label>
                <select value={cityName} onChange={(e) => setCityName(e.target.value)}>
                    <option value="">Select City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Address:</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
                <label>Nombre Stars:</label>
                <input type="text" value={nbrStars} onChange={(e) => setNbrStars(e.target.value)} />
            </div>
            {rooms.map((room, index) => (
                <div key={index}>
                    <label>Room {index + 1}</label>
                    <input type="text" value={room.nbrBeds} onChange={(e) => handleRoomChange(index, 'nbrBeds', e.target.value)} placeholder="Number of beds" />
                    <input type="text" value={room.priceDay} onChange={(e) => handleRoomChange(index, 'priceDay', e.target.value)} placeholder="Price per day" />
                    <input type="text" value={room.descriptionRo} onChange={(e) => handleRoomChange(index, 'descriptionRo', e.target.value)} placeholder="Room description" />
                    <select value={room.typeRoName} onChange={(e) => handleRoomChange(index, 'typeRoName', e.target.value)}>
                        <option value="">Select Room Type</option>
                        {roomTypes.map((roomType, index) => (
                            <option key={index} value={roomType}>{roomType}</option>
                        ))}
                    </select>
                    <button type="button" onClick={() => handleRemoveRoom(index)}>Remove Room</button>
                </div>
            ))}
            <button type="button" onClick={handleAddRoom}>Add Room</button>
            <button type="submit">Submit</button>
        </form>
    );
}
