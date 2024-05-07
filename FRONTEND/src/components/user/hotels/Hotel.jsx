import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from '../ImageSlider';
import axios from 'axios';
import Layout from '../voitures/Layout';

const Hotel = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState("");
    const [data, setData] = useState([]);
    const [r_startDate, setR_startDate] = useState('');
    const [r_endDate, setR_endDate] = useState('');
    const [offer_id, setOffer_id] = useState('');
    const [room, setRoom] = useState("");
    const [rooms, setRooms] = useState([]);
    const [slides, setSlides] = useState([]);


    const get_hotel = () => {
        axios.get(`http://localhost:8000/api/hotels/${id}`)
            .then(response => {
                console.log(response.data);
                setHotel(response.data.hotel);
                setData(response.data);
                setSlides(response.data.offer[0].images);
                console.log(response.data.offer[0].images);
                setRooms(response.data.hotel.rooms);
                console.log(response.data.hotel.rooms)
                setOffer_id(response.data.offer[0].id);
            })
            .catch(error => {
                console.error("Une erreur s'est produite !", error);
            });
    };
    

    useEffect(() => {
        get_hotel();

    }, [id]);




    const book_room = (id,room,r_startDate,r_endDate) => {
        axios.post('http://localhost:8000/api/reservations/store_hotel', {
            hotel_id: id,
            roomtype_id: room,
            start_date: r_startDate,
            end_date: r_endDate,
            offer_id : offer_id
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error("Une erreur s'est produite !", error);
            });
    }

    const containerStyles = {
        width: "500px",
        height: "280px",
        margin: "0 auto",
    };

    return (
        <div>
            <Layout>
                <div className="container mx-auto px-4 py-16">
                    {hotel && (
                        <div className='max-w-3xl mx-auto'>
                            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                                <div className='p-4'>
                                    <h1 className='text-3xl font-semibold mb-2'>
                                        {hotel.name} {hotel.nbr_stars}
                                        {/* {console.log('ici ========> ' + JSON.stringify(slides))} */}
                                    </h1>
                                    <div style={containerStyles}>
                                        {/* <ImageSlider slides={JSON.stringify(slides)} /> */}
                                        <ImageSlider slides={slides} />
                                    </div>


                                    <div className='py-2 border-t border-gray-200 mt-10'>
                                        <div className="mb-2">
                                            <span className="font-semibold"> Description :  </span>
                                            <span> {hotel.description} </span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-semibold">Address: </span>
                                            <span> {hotel.address}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between m-10 gap-4'>
                                    <div className='flex flex-col gap-4'>
                                        <p className='font-semibold text-lg'>Reservation start-date :</p>
                                        <input
                                            value={r_startDate}
                                            onChange={(e) => { setR_startDate(e.target.value) }}
                                            className='bg-light text-gray shadow border border-none outline-none h-14 w-40 text-left text-base'
                                            type='date'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <p className='font-semibold text-lg'>Reservation end-date :</p>
                                        <input
                                            value={r_endDate}
                                            onChange={(e) => { setR_endDate(e.target.value) }}
                                            className='bg-light text-gray shadow border border-none outline-none h-14 w-40 text-left text-base'
                                            type='date'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <p className='font-semibold text-lg'>Choose a room :</p>
                                        <select value={room} onChange={(e) => setRoom(e.target.value)}>
                                            {rooms.map((room, index) => (
                                                <option key={index} value={room.roomtype.id}>{room.roomtype.name}</option>
                                            ))}
                                        </select>


                                    </div>
                                    <div className="flex items-end">
                                        <button onClick={()=>[book_room(hotel.id,room,r_startDate,r_endDate)]}
                                            className="bg-primary rounded transition-bg shadow h-14 px-10 outline-none text-white hover:bg-white hover:text-primary cursor-pointer">
                                            Book Now
                                        </button>
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

export default Hotel;