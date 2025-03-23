import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import tickets from "../assets/dummy-data.json";
import TicketTable from "../components/TicketTable";
import toast from "react-hot-toast";

const TicketPage = () => {
  const [formData, setformData] = useState({
    subject: "",
    issueFound: "",
    createdAt: "",
  });
  const [search, setsearch] = useState("");
  const [displayticket, setdisplayticket] = useState(tickets)

  const handleonChange = (e) => {
    const value = e.target.value;
    setsearch(value);
    handlesearchticket(value);
  };
  
  const handlesearchticket = (searchTerm) => {
    if (!searchTerm) {
      setdisplayticket(tickets);  
    } else {
      const filteredTickets = tickets.filter((row) =>
        row.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setdisplayticket(filteredTickets);
    }
  };
  const handleonSubmit = (e) => {
    e.preventDefault();
    toast.success("Ticket has been created ")
  };


  return (
    <>
      <div className="h-screen flex justify-center items-center font-semibold transition-all duration-200">
        <form
          onSubmit={(e) => {
            handleonSubmit(e);
          }}
          className="lg:w-[1000px] w-96   flex-col flex  p-11 shadow-xl hover:shadow-2xl transition-all duration-200 rounded"
        >
          <div className="text-center">
            <h2>Add New Ticket</h2>
          </div>
          <hr />

          <div className="lg:flex items-center lg:justify-between mt-5 ">
            <label className="text-xl">Subject</label>
            <input
              type="text"
              className=" font-semibold rounded border border-gray-300 hover:ring-2 hover:ring-black-400 px-2 py-1 lg:w-[700px] w-full mt-2 "
              value={formData.subject}
              required
              minLength={3}
              maxLength={100}
              onChange={(e) =>
                setformData({ ...formData, subject: e.target.value })
              }
            />
          </div>
          <div className="lg:flex lg:justify-between mt-7 ">
            <label className="text-xl">Issue found</label>
            <textarea
              spellCheck={true}
              type="text"
              rows={3}
              required
              value={formData.issueFound}
              className="flex items-center justify-center  font-semibold rounded border border-gray-300 hover:ring-2 hover:ring-black-400 p-2 mt-2 lg:w-[700px] w-full "
              onChange={(e) =>
                setformData({ ...formData, issueFound: e.target.value })
              }
            />
          </div>
          <div className="lg:flex lg:justify-between mt-7">
            <label className="text-xl">Created On </label>
            <input
              type="date"
              required
              className="flex items-center justify-center font-semibold rounded border text-black border-gray-300 hover:ring-2 hover:ring-black-400 mt-2 p-2 lg:w-[700px] cursor-pointer w-full"
              onChange={(e) =>
                setformData({ ...formData, createdAt: e.target.value })
              }
              value={formData.createdAt}
            />
          </div>
          <div className="text-center mt-7 ">
            <button
              type="submit"
              className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-700 "
            >
              Create Ticket
            </button>
          </div>
        </form>

  {/* Fix 2: Separate search section */}
  <div className="mt-8 w-full max-w-4xl px-4">
    <div className="flex items-center gap-3 mb-4">
      <div>Search:</div>
      <FormControl
        value={search}
        onChange={handleonChange}
        placeholder="Search Tickets"
        className="w-64"
      />
    </div>
    <TicketTable tickets={displayticket} />
  </div>
</div>
    </>
  );
};

export default TicketPage;
