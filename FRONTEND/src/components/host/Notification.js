import { useEffect, useState } from "react";
import axios from "axios";

export default function Notification() {
    const [data, setData] = useState([]);
    const [donnees,setDonnes] = useState({});
    
    useEffect(() => {
        const get_notifications = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/notifications');
                console.log(response.data)
                setData(response.data);
                setDonnes(response.data)
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        }
        
        get_notifications();
        console.log("-------");
        console.log(donnees);
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">{donnees.length>0 && donnees.host.first_name}</a>
                    <ul className="navbar-nav d-flex flex-row me-1">
                        <li className="nav-item me-3 me-lg-0">
                            <div className="dropdown">
                                <a data-mdb-dropdown-init className="me-3 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink"
                                    role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-bell text-white"></i>
                                    <span className="badge rounded-pill badge-notification bg-danger">{donnees.length>0 && donnees.notifications_count}</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                    { donnees.length>0 &&
                                        donnees.notifications.map((elem, index) => (
                                            <li key={index}>
                                                <a className="dropdown-item" href="#">{elem.created_at} Bill</a>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}