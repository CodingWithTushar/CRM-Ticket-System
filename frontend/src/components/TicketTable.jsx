import React from "react";
import TicketCard from "./TicketCard";
import {Link} from "react-router-dom"

const TicketTable = ({ tickets }) => {
  return (
    
    <div  className="text-center my-3 h-80 flex-nowrap overflow-x-auto p-3">
        {tickets.length ?  tickets.map(row => <Link style={{textDecoration: 'none'}} className="no-underline" to={`/ticketopen/${row.id}`}>
          <TicketCard div1={row.id} div2={row.subject} div3={row.status} div4={row.addedAt} />
        </Link>) : "You does not have any tickets"}
    </div>  
  );
};

export default TicketTable;
