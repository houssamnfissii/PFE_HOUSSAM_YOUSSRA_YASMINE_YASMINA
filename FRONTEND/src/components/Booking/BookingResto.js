import React, { useEffect, useState } from "react";
import "./booking.css";
import { Alert, Button, Form, FormGroup } from "reactstrap";
import axios from "axios";

export default function BookingResto({
  offer,
  RestaurantDe,
  tables,
  avgRating,
  totalRating,
  id,
}) {


  console.log(offer[0].id);

  const [type, setType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [reservationStatus, setReservationStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [iduser, setuserId] = useState("");
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId=localStorage.getItem("userId");
    const userType=localStorage.getItem("userType");
    const userEmail=localStorage.getItem("userEmail");
    const userImage=localStorage.getItem("userImage");

    
    if (token && userId) {
      setName(username);
      setEmail(userEmail)
      setType(userType)
      setuserId(userId)
      setUserImage(userImage)
     


    }
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    if(iduser){
      try {
        const response = await axios.post(
          "http://localhost:8000/api/reservations/store_table",
          {
            type: type,
            date: selectedDate,
            id: id,
            id_client:iduser,
            offre_id: offer[0].id,
          }
        );
  
        // Check if the reservation was successful
        if (response.data.message === "Réservation ajoutée") {
          // Handle success
         
          setErrorMessage("Reservation successful")
          setReservationStatus("done");
           // navigation n profil yxouf reservation dylo
        } else {
         
          // anzid wahed notification dyl reservation madazitxi
          console.error("Reservation failed:", response.data.message);
          setErrorMessage("try anther date ")
          setReservationStatus("error");
        }
      } catch (error) {
        // Handle error
        console.error("Error adding Reservation:", error);
        setReservationStatus("error");
      }
    }else{
      setError("You must be logged in to make a reservation")
    }
  
  };

  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];
  const oneMonthLater = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );
  const formattedOneMonthLater = oneMonthLater.toISOString().split("T")[0];

  return (
    <div className="booking">
       {reservationStatus === "done" && (
        <Alert color="success">Reservation successful</Alert>
      )}
      {reservationStatus === "error" && (
        <Alert color="danger">{errorMessage}</Alert>
      )}
         {
        error !==null && (
          <Alert color="danger">{error}</Alert>
        )
      }
      <div className="booking__top d-flex align-items-center justify-align-center justify-between">
        <h3 className="text-xl font-bold">
          {/* {price_per_person}DH <span>/per person</span> */}
        </h3>
        <span className="tour__rating d-flex align-align-items-center gap-1">
          <i
            className="ri-star-fill"
            style={{ color: "var(--secondary-color)" }}
          ></i>{" "}
          {avgRating === 0 ? null : avgRating}
          {totalRating === 0 ? (
            "Not rated"
          ) : (
            <span>({offer[0].reviews?.length})</span>
          )}
        </span>
      </div>
      {/* Booking form start */}
      <div>
        <h5 className="text-xl font-bold">Reservation</h5>
        <Form className="booking__form">
          <div className="booking__info-form">
            <FormGroup>
              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Choose Table
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-gray-200 text-gray-700  focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                >
                  <option value="">select type </option>
                  {tables.map((table, index) => (
                    <option key={index} value={table}>
                      {table}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Date
                </label>
                <input
                type="datetime-local"
                value={selectedDate}
                min={formattedCurrentDate}
                max={formattedOneMonthLater}
                onChange={handleDateChange}
                className="bg-gray-200 text-gray-700  focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
              </div>
              <div className="mt-8">
                        <button className="bg-blue-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700" onClick={handleReservation}>Reserve</button>
                    </div>
            </FormGroup>
          </div>
        </Form>
      </div>
    </div>
  );
}
