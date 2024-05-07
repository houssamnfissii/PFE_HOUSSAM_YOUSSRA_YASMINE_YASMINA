import { useEffect, useState } from "react";
import ClientReservations from "./ClientReservations";
import axios from "axios";
const ClientDashboard = () =>{
    const [offerId, setOfferId]=useState(null);
    const fetchOfferId = async () =>{
        try{
            const response = await axios.get('http://localhost:8000/api/client/offerId');
            setOfferId(response.data.offer_id);
        }catch(error){
            console.error('Error fetching offer ID:', error);
        }
    }

    useEffect(()=>{
        fetchOfferId();
    },[]);

    return(
        <div className="dashboard-container">
            <ClientReservations offerId={offerId}/>
        </div>
    )
}

export default ClientDashboard;