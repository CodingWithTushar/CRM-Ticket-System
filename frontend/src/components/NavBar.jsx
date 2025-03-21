import React from 'react'
import NavBarButton from './NavBarButton'
import { NavbarBrand ,  } from 'react-bootstrap'

const NavBar = () => { 
  return (
    <div className='bg-white no-underline flex items-center justify-between p-1  backdrop-blur-lg top-0 w-full hover:shadow-xl transition-all duration-200'>
        <div className='flex items-center justify-center ml-9'>   
        <img src="https://img.icons8.com/?size=100&id=EpLoaTznGKMQ&format=png&color=000000" alt="Logo" className='w-15' />
        <h4>CRM Ticket Management</h4>
        </div>
        <div className='flex items-center gap-3 mr-9' >
            <div><NavBarButton to={"/home"} text={"Dashboard"}/></div>
            <div><NavBarButton to={"/TicketPage"} text={"Tickets"}/></div>
            <div><NavBarButton to={"/login"} text={"Logout"}/></div>
        </div>
    </div>
  )
}

export default NavBar