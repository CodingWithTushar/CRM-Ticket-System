import React from "react";
import tickets from "../assets/dummy-data.json";
import TicketTable from "../components/TicketTable.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  const pendingTickets = tickets.filter((row) =>
    row.status.includes("pending")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">
          Ticket Dashboard
        </h1>
        <p className="text-indigo-600">
          Manage and track all your support tickets
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <Link
            to="/TicketPage"
            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-lg group hover:ring-1 hover:ring-indigo-500 w-full md:w-auto"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-indigo-700 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative flex items-center justify-center w-full text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Ticket
            </span>
          </Link>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="bg-white p-2 rounded-xl shadow-md flex-1 text-center min-w-[150px]">
              <p className="text-gray-500 text-sm">Total Tickets</p>
              <p className="text-2xl font-bold text-indigo-700">
                {tickets.length}
              </p>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-md flex-1 text-center min-w-[150px]">
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-amber-500">
                {pendingTickets.length}
              </p>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-3 border-b border-gray-100 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Recently Added Tickets
            </h2>
          </div>

          {/* Table Header */}
          <div className="flex justify-between gap-4 p-3 bg-indigo-50 text-indigo-800 font-bold">
            <div className="pl-3">#</div>
            <div className="">Subject</div>
            <div className="">Status</div>
            <div className="pr-5">Opened Date</div>
          </div>

          {/* Table Content */}
          <TicketTable tickets={tickets} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
