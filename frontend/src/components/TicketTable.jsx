import React from "react";
import TicketCard from "./TicketCard";

const TicketTable = ({ tickets }) => {
  return (
    <div className="text-center my-3 h-80 flex-nowrap overflow-x-auto p-3">
        {tickets.length ?  tickets.map(row => <TicketCard div1={row.id} div2={row.subject} div3={row.status} div4={row.addedAt} />) : "You does not have any tickets"}
    </div>  
  );
};

export default TicketTable;
