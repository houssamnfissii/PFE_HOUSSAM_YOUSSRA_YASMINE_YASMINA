import React from 'react'
import {Link} from 'react-router-dom'

//imported icons
import { MdOutlineLocalOffer } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { MdRestaurant } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { MdOutlineTour } from "react-icons/md";
import { FaCar } from "react-icons/fa";


import './VerNavHost.css'


export default function VerNavHost() {
  return (
    <div className='VerNavSection'>
        <div className='NavHeader'>
            <h3>Dashboard</h3>
        </div>
        <div className='NavBody'>
            <li><Link className='VNavLink' to={'/hostPage'}><MdOutlineLocalOffer className='NavIcon'/> Offers</Link></li>
            <li><Link className='VNavLink' to={'/addOffer/restaurant'}><MdRestaurant className='NavIcon'/> Add Restaurante</Link></li>
            <li><Link className='VNavLink' to={'/addOffer/hotel'}><RiHotelLine className='NavIcon'/> Add Hotel</Link></li>
            <li><Link className='VNavLink' to={'/addOffer/tour'}><MdOutlineTour className='NavIcon'/> Add Tour</Link></li>
            <li><Link className='VNavLink' to={'/addOffer/car'}><FaCar className='NavIcon'/> Add Car</Link></li>
        </div>
        <div className='NavFooter'>
            <li><Link className='VNavLink'><IoExitOutline className='NavIcon'/> Logout</Link></li>
        </div>
      
    </div>
  )
}
