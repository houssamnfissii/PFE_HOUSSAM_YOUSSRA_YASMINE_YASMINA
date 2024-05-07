import React, { useEffect, useState } from "react";
import "./booking.css";
import { Alert, Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Booking({ tour, avgRating }) {
  const { price_per_person, offer, totalRating, id: tourId } = tour;
  const [guestSize, setGuestSize] = useState(1);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [type, setType] = useState();
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [id, setuserId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [errss,seterrs]=useState();

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

  const serviceCharge = 10; // Example service charge value, you can change this according to your needs

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "guestSize":
        setGuestSize(value);
        break;
      default:
        break;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(id){
      try {
        const response = await axios.post(
          "http://localhost:8000/api/reservations/store_tour",
          {
            tour_id: tourId,
            client_id: id, // Assuming client ID is fixed or you can get it from the logged-in user
            offer_id: offer.id,
            nbr_guests: guestSize,
          }
        );
        setMessage(response.data.message);
        seterrs('success')
        

        if(response.status === 400){
          setMessage(response.data.message);
          seterrs('error')
        }
      } catch (error) {
        setMessage("This Tour is full. please chose anther one.");
      }
    }
    else{
      setError("You must be logged in to make a reservation")
    }
  };

  const total = price_per_person * guestSize + serviceCharge;

  return (
    <div className="booking ">
      {/* Booking details */}
      {errss === "success" && (
        <Alert color="success">{message}</Alert>
      )}
      {errss === "error" && (
        <Alert color="danger">{message}</Alert>
      )}
      {
        error !==null && (
          <Alert color="danger">{error}</Alert>
        )
      }
      <div className="booking__top d-flex align-items-center justify-between">
        <h3 className="text-xl font-bold">
          {price_per_person}DH <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center gap-1">
          <i
            className="ri-star-fill"
            style={{ color: "var(--secondary-color)" }}
          ></i>{" "}
          {avgRating === 0 ? null : avgRating}
          {totalRating === 0 ? (
            "Not rated"
          ) : (
            <span>({offer.reviews?.length})</span>
          )}
        </span>
      </div>

      {/* Booking form */}
      <div>
        <h5 className="text-xl font-bold">Information</h5>
        <Form className="booking__form" onSubmit={handleSubmit}>
          <div className="booking__info-form">
            <FormGroup className=" align-items-center gap-3">
              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Number of guest
                </label>
                <input
                  className="bg-gray-200 text-gray-700  focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="number"
                  placeholder="Number of guests"
                  value={guestSize}
                  id="guestSize"
                  max={10}
                  onChange={handleChange}
                  min={1}
                />
              </div>
            </FormGroup>
            <div className="booking__bottom">
              <ListGroup>
                <ListGroupItem className="border-0 px-0">
                  <h3 className="text-xl font-bold d-flex align-items-center gap-1">
                    {price_per_person}DH <i className="ri-close-line"></i>{" "}
                    {guestSize} person
                  </h3>
                  <span>{price_per_person * guestSize}DH</span>
                </ListGroupItem>
                <ListGroupItem className="border-0 px-0">
                  <h3 className="text-xl font-bold">Service charge</h3>
                  <span>{serviceCharge}DH</span>
                </ListGroupItem>
                <ListGroupItem className="border-0 px-0">
                  <h3 className="text-xl font-bold">Total</h3>
                  <span>{total}DH</span>
                </ListGroupItem>
              </ListGroup>
            </div>
            <div className="mt-8">
                        <button className="bg-blue-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700">Reserve</button>
                    </div>
          </div>
        </Form>
      </div>

     
    </div>
  );
}
