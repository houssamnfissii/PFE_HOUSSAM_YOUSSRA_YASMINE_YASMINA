import Layout from "../voitures/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Hotels = () => {

    const [data, setData] = useState([]);
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [nbr_stars, setNbr_stars] = useState("");
    const [roomType, setRoomType] = useState("");
    const [roomTypes, setRoomTypes] = useState([]);


    const get_hotel_offers = () => {
        axios.get('http://localhost:8000/api/hotels/hotel_offers')
            .then(response => {
                console.log('get_hotel_offers');
                console.log(response.data.data);
                setData(response.data.data);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }

    const get_cities = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/cities`);
            console.log('get_cities');
            console.log(response.data);
            setCities(response.data.cities);
        } catch (error) {
            console.error("Une erreur s'est produite:", error);
        }
    }

    const get_roomTypes = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/roomtypes/name`);
            console.log('get_roomTypes');
            console.log(response.data);
            setRoomTypes(response.data);
        } catch (error) {
            console.error("Failed to fetch room types", error);
        }
    }

    const filteredHotels = data.filter(({ hotel }) => {
        const cityMatch = !city || hotel.city_name === city;
        const starsMatch = !nbr_stars || hotel.nbr_stars === nbr_stars;
        const hotel_room_types = hotel.rooms.map(room => room.roomtype.name);
        const roomTypeMatch = !roomType || hotel_room_types.includes(roomType);
        return cityMatch && starsMatch && roomTypeMatch;
    });

    useEffect(() => {
        get_hotel_offers();
        get_cities();
        get_roomTypes();

        console.log('----------');
        console.log(filteredHotels);
        console.log("Data:", data);
       
    }, []);


    const EmptyFilters = () => {
        setNbr_stars("");
        setCity("");
        setRoomType("");
        get_cities();
        get_roomTypes();
    };
    

    return (
        <Layout>
            <div>
                <select
                    value={nbr_stars}
                    onChange={(e) => {setNbr_stars(parseInt(e.target.value)) }}
                >
                    <option value="">Select number of stars</option>
                    <option value="1">1 star</option>
                    <option value="2">2 stars</option>
                    <option value="3">3 stars</option>
                    <option value="4">4 stars</option>
                    <option value="5">5 stars</option>
                </select>

                <select value={city}
                    onChange={(e) => { setCity(e.target.value) }}
                >
                    {
                        cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))
                    }
                </select>


                <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                >
                    <option value="">Select room type</option>
                    {roomTypes.map((elem, index) => (
                        <option key={index} value={elem}>{elem}</option>
                    ))}
                </select>

                <button type='button' onClick={EmptyFilters}>Empty filters</button>


                {filteredHotels.map(( hotel , index) => (
                    <div key={index} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                        <div className="order-1 sm:ml-6 xl:ml-0">
                            <h3 className="mb-1 text-slate-900 font-semibold">
                                <span className="mb-1 block text-sm leading-6 text-indigo-500">{hotel.hotel.name}</span><br />
                                Description: {hotel.hotel.description}
                            </h3>
                            <p className="text-slate-600 mb-2">Number of stars: {hotel.hotel.nbr_stars}</p>
                            <p className="text-slate-600 mb-2">City: {hotel.hotel.city_name}</p>
                            <h4 className="text-slate-600 mb-2">Offer Images:</h4>

                            {hotel.offer && hotel.offer.images && hotel.offer.images.length > 0 && (
                                
                                <img
                                    src={hotel.offer.images[0].url}
                                    alt=""
                                    className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                                    width="1216"
                                    height="640"
                                />
                            )}
                            <Link
                                to={`/hotels/${hotel.hotel.id}`}
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
        </Layout>
    );
}

export default Hotels;