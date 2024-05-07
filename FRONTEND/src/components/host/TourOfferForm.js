import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TourOfferForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [nbrPeople, setNbrPeople] = useState('');
    const [pricePerson, setPricePerson] = useState('');
    const [transportations, setTransportations] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [activities, setActivities] = useState([]);
    const [cities, setCities] = useState([]);
    const [type, setType] = useState('');

    const [selectedCities, setSelectedCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cities/cities');
                if (response.data && response.data.cities) {
                    setCities(response.data.cities);
                } else {
                    console.error('No cities found in response:', response);
                }
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);

    const handleAddTransportation = () => {
        if (transportations.length < 5) {
            setTransportations([...transportations, { registration_number: '', type: '', nbr_places: '' }]);
        }
    };

    const handleAddStaff = () => {
        if (staffs.length < 10) {
            setStaffs([...staffs, { first_name: '', last_name: '', role: '', telephone: '' }]);
        }
    };

    const handleAddActivity = () => {
        if (activities.length < 3) {
            setActivities([...activities, { name: '', description: '' }]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/tours/store', {
                type,
                tours: {
                    name,
                    description,
                    startDate,
                    endDate,
                    nbrPeople,
                    pricePerson,
                    selectedCities
                },
                transportations,
                staffs,
                activities,
            });
            console.log("Tour created:", response.data);
            alert("Tour created successfully!");
        } catch (error) {
            console.error("Error creating tour:", error);
            alert("An error occurred while creating the tour.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type of Offer" />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tour Name" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tour Description" />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
            <input type="text" value={nbrPeople} onChange={(e) => setNbrPeople(e.target.value)} placeholder="Number of People" />
            <input type="text" value={pricePerson} onChange={(e) => setPricePerson(e.target.value)} placeholder="Price per Person" />

            <select
                multiple
                value={selectedCities}
                onChange={(e) => setSelectedCities(Array.from(e.target.selectedOptions, option => option.value))}
            >
                {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                ))}
            </select>

 

            <div>
                
    
            </div>
        <br/>
            <button type="button" onClick={handleAddTransportation}>Add Transportation</button>
            {transportations.map((transportation, index) => (
               <div key={index}>
                   <input type="text" value={transportation.registration_number} onChange={(e) => {
                       const updatedTransportations = [...transportations];
                       updatedTransportations[index].registration_number = e.target.value;
                       setTransportations(updatedTransportations);
                   }} placeholder="Registration Number" />
                   <input type="text" value={transportation.type} onChange={(e) => {
                       const updatedTransportations = [...transportations];
                       updatedTransportations[index].type = e.target.value;
                       setTransportations(updatedTransportations);
                   }} placeholder="Type of Transportation" />
                   <input type="text" value={transportation.nbr_places} onChange={(e) => {
                       const updatedTransportations = [...transportations];
                       updatedTransportations[index].nbr_places = e.target.value;
                       setTransportations(updatedTransportations);
                   }} placeholder="Number of Places" />
               </div>
            ))}
            <br/>
            <button type="button" onClick={handleAddStaff}>Add Staff</button>
            {staffs.map((staff, index) => (
                <div key={index}>
                    <input type="text" value={staff.first_name} onChange={(e) => {
                        const updatedStaffs = [...staffs];
                        updatedStaffs[index].first_name = e.target.value;
                        setStaffs(updatedStaffs);
                    }} placeholder="First Name" />
                    <input type="text" value={staff.last_name} onChange={(e) => {
                        const updatedStaffs = [...staffs];
                        updatedStaffs[index].last_name = e.target.value;
                        setStaffs(updatedStaffs);
                    }} placeholder="Last Name" />
                    <input type="text" value={staff.role} onChange={(e) => {
                        const updatedStaffs = [...staffs];
                        updatedStaffs[index].role = e.target.value;
                        setStaffs(updatedStaffs);
                    }} placeholder="Role" />
                    <input type="text" value={staff.telephone} onChange={(e) => {
                        const updatedStaffs = [...staffs];
                        updatedStaffs[index].telephone = e.target.value;
                        setStaffs(updatedStaffs);
                    }} placeholder="Telephone" />
                </div>
            ))}
            <br/>

            <button type="button" onClick={handleAddActivity}>Add Activity</button>
            {activities.map((activity, index) => (
                <div key={index}>
                    <input type="text" value={activity.name} onChange={(e) => {
                        const updatedActivities = [...activities];
                        updatedActivities[index].name = e.target.value;
                        setActivities(updatedActivities);
                    }} placeholder="Activity Name" />
                    <input type="text" value={activity.description} onChange={(e) => {
                        const updatedActivities = [...activities];
                        updatedActivities[index].description = e.target.value;
                        setActivities(updatedActivities);
                    }} placeholder="Activity Description" />
                </div>
            ))}
            <br/>

            <button type="submit">Submit</button>
        </form>
    );
}
