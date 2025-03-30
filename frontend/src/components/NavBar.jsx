import React from 'react'
import NavBarButton from './NavBarButton'
import useAuth from '../hooks/useAuth'

const NavBar = () => { 
  const {logout} = useAuth()
  return (
    <div className='bg-white no-underline flex items-center justify-between p-1 backdrop-blur-lg top-0 w-full hover:shadow-xl transition-all duration-200'>
        <div className='flex items-center justify-center ml-9 py-2.5'>   
        <img 
            src="https://img.icons8.com/?size=100&id=EpLoaTznGKMQ&format=png&color=6366F1" 
            alt="Logo" 
            className="w-8 h-8" 
          />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Resolve360
          </span>
        </div>
        <div className='flex items-center gap-3 mr-9' >
            <div><NavBarButton to={"/home"} text={"Dashboard"}/></div>
            <div><NavBarButton to={"/ticketpage"} text={"Tickets"}/></div>
            <div><NavBarButton to={"/login"} OnClick={logout} text={"Logout"} /></div>
        </div>
    </div>
  )
}

export default NavBar