import React from "react";
import NavBarButton from "./NavBarButton";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { logout, authUser } = useAuth();

  const handleLogout = async (e) => {

    e.preventDefault();
    try {
      await logout();
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userEmail = authUser?.email || "";

  return (
    <div className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 hover:shadow-sm z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left Section */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex items-center space-x-2">
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
          <div className="hidden md:flex items-center space-x-4">
            <NavBarButton
              to="/home"
              text="Dashboard"
              className="hover:text-indigo-600 transition-colors duration-200"
              title="Dashboard"
            />
            <NavBarButton
              to="/ticketpage"
              text="Tickets"
              className="hover:text-indigo-600 transition-colors duration-200"
              title="Tickets"
            />
            <NavBarButton
              to="#"
              OnClick={handleLogout}
              text="Logout"
              className="hover:text-red-600 transition-colors duration-200"
              title="Logout"
            />

            {authUser && (
              <span className="flex items-center gap-1 bg-gradient-to-br from-indigo-600 to-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-full shadow-lg hover:shadow-md transition-all duration-200 cursor-default group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-indigo-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="max-w-[160px] truncate" title={userEmail}>
                  {userEmail}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
