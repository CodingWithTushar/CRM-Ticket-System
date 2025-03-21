import React, { useState } from "react";
import tickets from "../assets/dummy-data.json";
import TicketTable from "../components/TicketTable.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {

  const pendingTickets = tickets.filter((row) => row.status.includes("pending"))

  return (
    <div className="bg-white h-screen transition-all duration-200 font-semibold">
      <div className="flex flex-col items-center justify-center mt-3">
          <Link to={"/TicketPage"}>
        <button onClick={() => {}} className="MeanButton text-center">
          <span className="btn-text-one">Click Me</span>
          <span className="btn-text-two">Add New Ticket</span>
        </button>
          </Link>
        <div className="flex flex-col mt-7 items-center justify-center">
          <span>Total Tickets: {tickets.length}</span>
          <span >Pending Tickets: {pendingTickets.length}</span>
        </div>
      </div>
      <div className="text-center my-3">Recently Added</div>
      <div className="text-center">
        <div className="mb-2">Table Here</div>
        <div className="flex items-center justify-between font-bold px-4">
          <div>#</div>
          <div>Subjects</div>
          <div>Status</div>
          <div className="pr-3">Opened Date</div>
        </div>
        <TicketTable tickets={tickets}/>
      </div>
    </div>
  );
};

export default HomePage;
