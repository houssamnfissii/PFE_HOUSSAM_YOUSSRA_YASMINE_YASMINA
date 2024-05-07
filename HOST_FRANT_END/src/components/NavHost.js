// import React from 'react'
// import './NavHost.css'
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function NavHost() {
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         try {
//             const token = localStorage.getItem('jwt');
//             console.log("Token from localStorage:", token);
    
//             const response = await axios.post('http://127.0.0.1:8000/api/logout', null, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
    
//             console.log("Logout response:", response.data);
//             localStorage.removeItem('jwt');
//             alert("Logout successful!");
//             navigate('/');
//         } catch (error) {
//             console.error("Error logging out:", error);
//             alert("An error occurred while logging out.");
//         }
//     };

//   return (
    
//       <header className="header">
//         <div>
//             <h3>Dashboard</h3>
//         </div>
//         <div className="">
//           <Link to="/profile" className="header-link">My Profile</Link>
//           <Link to="/hostPage" className="header-link">Offers</Link>
          
//         </div>
//         <div>
//             <Link onClick={handleLogout} className="header-link">Logout</Link>
//         </div>
//       </header>
//   )
// }


// Navbar.js
import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

import './NavHost.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hostName, setHostName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://127.0.0.1:8000/api/host/details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data.name)
        setHostName(response.data.name);
      } catch (error) {
        console.error("Error fetching host details:", error);
      }
    };

    fetchHostDetails();
  }, []); // Fetch host details only once when the component mounts

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.removeItem('jwt');
      alert("Logout successful!");
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out.");
    }
  };
  return (
    <div className='header'>
      <div className='navbar'>
      <div>
          <h3>Welcome {hostName}</h3>
        </div>


        <ul className={`link ${isMenuOpen ? 'open' : ''}`}>
          <div className='div'>
            {/* <Link to='/AtlasWings/'>Home</Link> */}
            <Link to="/profile" className="">My Profile</Link>
            <p className='line'></p>
          </div>
        
          <div className='div'>
            {/* <Link to='/AtlasWings/About'>About Us</Link> */}
            <p className='line'></p>
          </div>
          <div className='div'>
            {/* <Link to='/AtlasWings/services'>Services</Link> */}
            <p className='line'></p>
          </div>
        </ul>
        <div className={`link1 ${isMenuOpen ? 'open' : ''}`}>
          {/* <li><a href="">Sign In</a></li>
          <li><a href="">Sign Up</a></li>
          <li><a href="#get-started" className="action_btn">Get Started</a></li> */}
          <li><Link onClick={handleLogout} className="header-link">Logout</Link></li>
        </div>
        <div className="toggle_btn" onClick={handleToggle}>
          <FaBars className={`pipi ${isMenuOpen ? 'open' : ''}`} />
        </div>
      </div>

      <div className={`dropdown_menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {/* <li><Link to='/AtlasWings/'>Home</Link></li>
          <li><Link to='/AtlasWings/booking'>Offres</Link></li>
          <li><Link to='/AtlasWings/About'>About Us</Link></li>
          <li><Link to='/AtlasWings/services'>Services</Link></li>
          <li><a href="">Sign In</a></li>
          <li><a href="">Sign Up</a></li>
          <li><a href="#get-started" className="action_btn">Get Started</a></li> */}
            <li><Link to="/profile" className="header-link">My Profile</Link></li>
            <li><Link className='header-link' to={'/hostPage'}>Offers</Link></li>
            <li><Link className='header-link' to={'/addOffer/restaurant'}>Add Restaurante</Link></li>
            <li><Link className='header-link' to={'/addOffer/hotel'}>Add Hotel</Link></li>
            <li><Link className='header-link' to={'/addOffer/tour'}>Add Tour</Link></li>
            <li><Link className='header-link' to={'/addOffer/car'}>Add Car</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
