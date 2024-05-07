import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageSlider from '../ImageSlider';
import Layout from './Layout';

export default function Car() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [data, setData] = useState([]);
    const [slides, setSlides] = useState([]);
    const [location,setLocation] = useState("");
    const [pickuptime,setPickuptime] = useState("");
    const [dropofftime,setDropofftime] = useState("")

    const get_car = () => {
        axios.get(`http://localhost:8000/api/cars/${id}`)
            .then(response => {
                console.log(response.data);
                setCar(response.data.car);
                setData(response.data);
                setSlides(response.data.offer[0].images);
            })
            .catch(error => {
                console.error("Une erreur s'est produite !", error);
            });
    }

    useEffect(() => {
        get_car();
    }, [id]);

    const containerStyles = {
        width: "500px",
        height: "280px",
        margin: "0 auto",
    };

    const book_car = (id,location,pickuptime,dropofftime,offer_id) => {
        axios.post('http://localhost:8000/api/reservations/store_car', {
            id: id,
            location: location,
            pickuptime: pickuptime,
            dropofftime: dropofftime,
            offer_id: offer_id
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error("Une erreur s'est produite !", error);
        });
    }
    
    const bill = () => {
        axios.get(`http://localhost:8000/api/bills`)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error("Une erreur s'est produite !", error);
            });
    }

    return (

        <div>
            <Layout>
                <div className="container mx-auto px-4 py-16">
                    {car && slides.length > 0 && (
                        
                        <div >
                            <div className="max-w-3xl mx-auto">
                                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <div className="p-4">
                                        <h1 className="text-3xl font-semibold mb-2"> {data.brand.name} {data.model.name} </h1>
                                        <div style={containerStyles}>
                                            <ImageSlider slides={slides} />
                                        </div>
                                        <div className="py-2 border-t border-gray-200 mt-10">
                                            <div className="mb-2">
                                                <span className="font-semibold"> Price per day:  </span>
                                                <span> {data.car.price_per_day} DH</span>
                                            </div>
                                            <div className="mb-2">
                                                <span className="font-semibold">Fuel:</span>
                                                <span> {data.car.fuel}</span>
                                            </div>
                                            <div className="mt-4">
                                                <span className="font-semibold">Production date: </span>
                                                <span>{data.car.production_date}</span>
                                            </div>
                                            <div className="mt-4">
                                                <span className="font-semibold">Number of seats: </span>
                                                <span>{data.car.nbr_places}</span>
                                            </div>
                                            <div className="mt-4">
                                                <span className="font-semibold">Description: </span>
                                                <span className="text-gray-600 mb-4">{data.car.description}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between m-10 gap-4">
                                        <div className="flex flex-col gap-4">
                                            <p className="font-semibold text-lg mb-7">Pick-up & drop-off location</p>
                                            <input 
                                            value = {location}
                                            onChange={(e)=>{setLocation(e.target.value)}}
                                            className="bg-light text-gray shadow border-none outline-none h-14 w-40 px-4 text-left text-base" 
                                            type="text" placeholder="Tangier" />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <p className="font-semibold text-lg">Pick-up date and time</p>
                                            <input 
                                            value = {pickuptime}
                                            onChange={(e)=>{setPickuptime(e.target.value)}}
                                            className="bg-light text-gray shadow border-none outline-none h-14 w-40 px-4 text-left text-base" 
                                            type="datetime-local" />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <p className="font-semibold text-lg">Drop-off date and time</p>
                                            <input 
                                            value = {dropofftime}
                                            onChange={(e)=>{setDropofftime(e.target.value)}}
                                            className="bg-light text-gray shadow border-none outline-none h-14 w-40 px-4 text-left text-base" 
                                            type="datetime-local" />
                                        </div>

                                        <div className="flex items-end">
                                            <button onClick={()=>{book_car(data.car.id,location,pickuptime,dropofftime,data.offer[0].id)}}
                                            className="bg-primary rounded transition-bg shadow h-14 px-10 outline-none text-white hover:bg-white hover:text-primary cursor-pointer">
                                                Book Now
                                            </button>
                                        </div>
                                        <button onClick={bill}>bill</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </div>

    );
}
