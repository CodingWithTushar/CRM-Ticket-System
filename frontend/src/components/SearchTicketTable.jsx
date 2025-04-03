import { Link } from "react-router-dom";
import TicketCard from "./TicketCard";
import { format } from "date-fns";

const SearchTicketTable = ({ tickets }) => {
  const renderTickets = () => {
    if (tickets?.message) {
      return tickets.tickets?.map((row , index) => (
        <Link
          key={row._id}
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
      ));
    }

    if (Array.isArray(tickets)) {
      return tickets.map((row , index) => (
        <Link
          key={row._id}
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
      ));
    }

    return <div className="text-gray-500">Tickets not found</div>;
  };

  return (
    <div className="text-center my-3 h-80 flex-nowrap overflow-x-auto p-3">
      {renderTickets()}
    </div>
  );
};

export default SearchTicketTable;