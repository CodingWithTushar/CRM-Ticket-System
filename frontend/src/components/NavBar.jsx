import React from 'react'
import NavBarButton from './NavBarButton'
import useAuth from '../hooks/useAuth'

const NavBar = () => { 
  const { logout } = useAuth()
  return (
    <div className='fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Left Section */}
          <div className='flex items-center flex-shrink-0'>
            <div className='flex items-center space-x-2'>
              <img 
                src="https://img.icons8.com/?size=100&id=EpLoaTznGKMQ&format=png&color=6366F1" 
                alt="Logo" 
                className="w-10 h-10 hover:rotate-12 transition-transform duration-300" 
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Resolve360
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className='hidden md:flex items-center space-x-6'>
            <NavBarButton 
              to="/home" 
              text="Dashboard"
              className="hover:text-indigo-600 transition-colors duration-200"
            />
            <NavBarButton 
              to="/ticketpage" 
              text="Tickets"
              className="hover:text-indigo-600 transition-colors duration-200"
            />
            <NavBarButton 
              to="/login" 
              onClick={logout}
              text="Logout"
              className="hover:text-red-600 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar