import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { format } from "date-fns";

const TicketTable = () => {
  const { authUser, getAllTickets} = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTickets(authUser._id);
        setTickets(fetchedTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);
  
  return (
    <>
      <div className="text-center my-1 h-80 flex-nowrap overflow-x-auto p-3 ">
        {tickets.message
          ? tickets.tickets.map((row , index) => (
            <Link
              style={{ textDecoration: "none" }}
              className="no-underline"
              to={`/ticketopen/${row._id}`}

            >
              <TicketCard
                div1={index + 1}
                div2={row.subject}
                div3={row.status}
                div4={format(new Date(row.createdAt), "yyyy-MM-dd")}
              />
            </Link>
          ))
          : "You does not have any tickets"}
      </div>
    </>
  );
};

export default TicketTable;
