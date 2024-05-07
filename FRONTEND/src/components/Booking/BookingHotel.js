import React, { useEffect, useState } from "react";
import "./booking.css";
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from "react-bootstrap";

export default function BookingHotel({
  offer,
  avgRating,
  rooms,
  totalRating,
  id,
}) {
  const [room, setSelectedRoom] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const [reservationStatus, setReservationStatus] = useState();
  const [total, setTotal] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [reservationList, setReservationList] = useState([]);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(0); // Define selectedRoomPrice state

  useEffect(() => {
    const calculateTotalAndDays = () => {
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalPrice = selectedRoomPrice * days;
      setTotal(totalPrice);
      setNumberOfDays(days);
    };
    calculateTotalAndDays();
  }, [startDate, endDate, selectedRoomPrice]);

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/reservations/store_hotel",
        {
          start_date: startDate,
          end_date: endDate,
          roomtype_id: room,
          hotel_id: id,
          offer_id: offer[0].id,
        }
      );
      console.log("Reservation successful");
      setReservationStatus('success');
      setReservationList([...reservationList, response.data]);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      setReservationStatus("error");
    }
  };

  const handleRoomChange = (e) => {
    const selectedRoomId = e.target.value;
    const selectedRoomData = rooms.find((r) => r.roomtype_id === parseInt(selectedRoomId));
    setSelectedRoom(selectedRoomId);
    setSelectedRoomPrice(parseFloat(selectedRoomData.price_per_night)); // Set selected room price
  };

  return (
    <div className="booking">
      {reservationStatus === "success" && (
        <Alert color="success">Reservation successful</Alert>
      )}
      {reservationStatus === "error" && (
        <Alert color="danger">{errorMessage}</Alert>
      )}
      <div className="booking__top d-flex align-items-center justify-align-center justify-between">
        <h3 className="text-xl font-bold">Reservation</h3>
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
      <div>
        <Form className="booking__form">
          <div className="booking__info-form">
            <FormGroup>
              <div className="mt-2 flex">
                <div className="w-1/2 mr-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Start Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="yyyy-MM-dd HH:mm"
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="bg-gray-200 text-gray-700  focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    End Date
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="yyyy-MM-dd HH:mm"
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    className="bg-gray-200 text-gray-700  focus:outline-none focus:shadow-outline border border-gray-300 rounded  py-2 px-4 block w-full appearance-none"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label  className="block text-gray-700 text-sm font-bold mb-2">
                  Choose a Room
                </label>
                <select
                  value={room}
                  onChange={handleRoomChange}
                  className="bg-gray-200 text-gray-700  focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                >
                 
                  {rooms.map((room, index) => (
                    <option key={index} value={room.id}>
                      {room.roomtype.name} - Prix per night:{" "}
                      {room.price_per_night}
                    </option>
                  ))}
                </select>
              </div>
            </FormGroup>
          </div>
          <div className="booking__bottom">
            <ListGroup>
          
            </ListGroup>
          </div>
          <div className="mt-8">
            <button className="bg-blue-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700" onClick={handleReservation}>Reserve</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

