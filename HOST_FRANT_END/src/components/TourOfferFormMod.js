import React, { useState, useEffect } from "react";
import { useParams,useNavigate} from "react-router-dom";
import axios from "axios";

import './TourOfferFormMod.css'
import NavHost from "./NavHost";
import VerNavHost from "./VerNavHost";


export default function TourOfferFormMod() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cities,setCities]=useState([]);
  const [tour, setTour] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    nbr_people: "",
    price_per_person: "",
    selectedCities: [],
    transportations: [],
    staffs: [],
    activities: []
  });

  useEffect(() => {
    const fetchTourOffer = async () => {
      try {
          const response = await axios.get(`http://127.0.0.1:8000/api/tour/${id}`);
          setTour(response.data.tour);

          // Fetch all cities
          const citiesResponse = await axios.get('http://127.0.0.1:8000/api/cities/cities');
          console.log(citiesResponse.data.cities)
          setCities(citiesResponse.data.cities);
      } catch (error) {
          console.error("Error fetching tour offer:", error);
      }
  };
    
    fetchTourOffer();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTour({ ...tour, [name]: value });
  };

  const handleTransportationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTransportations = [...tour.transportations];
    updatedTransportations[index][name] = value;
    setTour({
      ...tour,
      transportations: updatedTransportations
    });
  };
  const handleRemoveStaff = async (index) => {
    try {
      const updatedStaffs = [...tour.staffs];
      const deletedStaffId = updatedStaffs[index].id; // Obtenez l'ID du membre du personnel supprimé
  
      updatedStaffs.splice(index, 1); // Supprimez le membre du personnel de l'état local
      setTour({ ...tour, staffs: updatedStaffs }); // Mettez à jour l'état local
  
      const token = localStorage.getItem('jwt');
      await axios.delete(`http://127.0.0.1:8000/api/staffs/${deletedStaffId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log('Staff member deleted from the database');
    } catch (error) {
      console.error('Error deleting staff member:', error);
    }
  };
  

const handleRemoveActivity = async (index) => {
  try {
    const updatedActivities = [...tour.activities];
    const deletedActivityId = updatedActivities[index].id; // Récupérer l'ID de l'activité
    updatedActivities.splice(index, 1); // Supprimer l'activité du tableau
    setTour({ ...tour, activities: updatedActivities }); // Mettre à jour l'état

    // Envoyer une requête de suppression à l'API
    const token = localStorage.getItem('jwt');
    await axios.delete(`http://127.0.0.1:8000/api/activities/${deletedActivityId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Activity deleted from the database');
  } catch (error) {
    console.error('Error deleting activity:', error);
  }
};

const handleRemoveTransportation = async (index) => {
  try {
    const updatedTransportations = [...tour.transportations];
    const deletedTransId = updatedTransportations[index].id; // Obtenez l'ID de l'entrée de transport supprimée

    updatedTransportations.splice(index, 1); // Supprimez l'entrée de transport de l'état local
    setTour({ ...tour, transportations: updatedTransportations }); // Mettez à jour l'état local

    const token = localStorage.getItem('jwt');
    await axios.delete(`http://127.0.0.1:8000/api/transporations/${deletedTransId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Transportation entry deleted from the database');
  } catch (error) {
    console.error('Error deleting transportation entry:', error);
  }
};


  const handleAddTransportation = () => {
    setTour({
      ...tour,
      transportations: [...tour.transportations, { registration_number: "", type: "", nbr_places: "" }]
    });
  };

  const handleStaffChange = (index, event) => {
    const { name, value } = event.target;
    const updatedStaffs = [...tour.staffs];
    updatedStaffs[index][name] = value;
    setTour({
      ...tour,
      staffs: updatedStaffs
    });
  };

  const handleAddStaff = () => {
    setTour({
      ...tour,
      staffs: [...tour.staffs, { first_name: "", last_name: "", role: "", telephone: "" }]
    });
  };

  const handleActivityChange = (index, event) => {
    const { name, value } = event.target;
    const updatedActivities = [...tour.activities];
    updatedActivities[index][name] = value;
    setTour({
      ...tour,
      activities: updatedActivities
    });
  };

  const handleAddActivity = () => {
    setTour({
      ...tour,
      activities: [...tour.activities, { name: "", description: "" }]
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('jwt');

      const response = await axios.put(`http://127.0.0.1:8000/api/tours/${id}`, tour, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Tour updated:", response.data);
      alert("Tour updated successfully!");
      navigate('/hostPage');

    } catch (error) {
      console.error("Error updating tour:", error);
      alert("An error occurred while updating the tour.");
    }
  };
  return (
    <div>
      <NavHost/>
      <div className="flexTourOfferMod">
        <VerNavHost/>
        <div className="TourOfferSection">
        <h2>Modify Tour</h2>
      <form onSubmit={handleSubmit}>
        <div className="flexColTour">
          <label>Tour Name:</label>
          <input type="text" name="name" value={tour.name} onChange={handleInputChange} />
        </div>
        <div className="flexColTour">
          <label>Tour Description:</label>
          <input type="text" name="description" value={tour.description} onChange={handleInputChange} />
        </div>
        <div className="flexColTour">
          <label>Start Date:</label>
          <input type="date" name="start_date" value={tour.start_date} onChange={handleInputChange} />
        </div>
        <div className="flexColTour">
          <label>End Date:</label>
          <input type="date" name="end_date" value={tour.end_date} onChange={handleInputChange} />
        </div>
        <div className="flexColTour">
          <label>Number People:</label>
          <input type="text" name="nbr_people" value={tour.nbr_people} onChange={handleInputChange} />
        </div>
        <div className="flexColTour">
          <label>price per person:</label>
          <input type="text" name="price_per_person" value={tour.price_per_person} onChange={handleInputChange} />
        </div>
        <label>Cities Tour:</label>
                <select
                    multiple
                    value={tour.selectedCities}
                    onChange={(e) => setTour({ ...tour, selectedCities: Array.from(e.target.selectedOptions, option => option.value) })}
                >
                    {cities.map(city => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
        
        {/* Add inputs for other tour details like nbrPeople, pricePerson */}
        
        <br/><br/>


        {/* Transportations */}
        <h1>Transportations</h1>
        <button type="button" onClick={handleAddTransportation}>Add Transportation</button>
        {tour.transportations && tour.transportations.map((transportation, index) => (
          <div key={index}>
            <div className="flexColTour">
              <label>Registration Number:</label>
              <input
                type="text"
                name="registration_number"
                value={transportation.registration_number}
                onChange={(e) => handleTransportationChange(index, e)}
              />
            </div>
            <div className="flexColTour">
              <label>Type transportation:</label>
              <input
                type="text"
                name="type"
                value={transportation.type}
                onChange={(e) => handleTransportationChange(index, e)}
              />
            </div>
            <div className="flexColTour">
              <label>Places Number:</label>
              <input
                type="text"
                name="nbr_places"
                value={transportation.nbr_places}
                onChange={(e) => handleTransportationChange(index, e)}
              />
            <button onClick={() => handleRemoveTransportation(index)}>Supprimer</button>

            </div>
             
            {/* Add inputs for other transportation details */}
          </div>
        
        ))}
        <br/>
        <br/>
     

        {/* Staff */}
        <h1>Staff</h1>
        <button type="button" onClick={handleAddStaff}>Add Staff</button>

{tour.staffs && tour.staffs.map((staff, index) => (
  <div key={index}>
    <div className="flexColTour">
      <label>First Name:</label>
      <input
        type="text"
        name="first_name"
        value={staff.first_name}
        onChange={(e) => handleStaffChange(index, e)}
      />
    </div>
    <div className="flexColTour">
      <label>last Name:</label>
      <input
        type="text"
        name="last_name"
        value={staff.last_name}
        onChange={(e) => handleStaffChange(index, e)}
      />
    </div>
    <div className="flexColTour">
      <label>Role:</label>
      <input
        type="text"
        name="role"
        value={staff.role}
        onChange={(e) => handleStaffChange(index, e)}
      />
    </div>
    <div className="flexColTour">
      <label>Telephone:</label>
      <input
        type="text"
        name="telephone"
        value={staff.telephone}
        onChange={(e) => handleStaffChange(index, e)}
      />
              <button onClick={() => handleRemoveStaff(index)}>Supprimer</button>

    </div>

    
    {/* Add inputs for other staff details */}
  </div>
  

))}
        <br/>
        <br/>
        

{/* Activities */}
<h1>Activities</h1>
<button type="button" onClick={handleAddActivity}>Add Activity</button>

{tour.activities && tour.activities.map((activity, index) => (
  <div key={index}>
    <div className="flexColTour">
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={activity.name}
        onChange={(e) => handleActivityChange(index, e)}
      />
    </div>
    <div className="flexColTour">
      <label>Description Activity:</label>
      <input
        type="text"
        name="description"
        value={activity.description}
        onChange={(e) => handleActivityChange(index, e)}
      />
              <button onClick={() => handleRemoveActivity(index)}>Supprimer</button>

    </div>
     
    {/* Add inputs for other activity details */}
  </div>
))}
        <button type="submit" className="updateTour">Update Tour</button>
      </form>
        </div>
      </div>
      
    </div>
  );
}
