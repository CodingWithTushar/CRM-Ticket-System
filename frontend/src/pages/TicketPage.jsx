import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import SearchTicketTable from "../components/SearchTicketTable";
import toast from "react-hot-toast";

const TicketPage = () => {
  const { createticket, isCreatingTicket, authUser, getAllTickets } = useAuth();
  const [tickets, setTickets] = useState({ tickets: [] });
  const [search, setsearch] = useState("");
  const [displayticket, setdisplayticket] = useState({ tickets: [] });
  const [formData, setformData] = useState({
    subject: "",
    conversations: [],
    createdAt: new Date().toISOString().split("T")[0],
    clientId: authUser._id,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTickets(authUser._id);
        setTickets(fetchedTickets);
      } catch (e) {
        toast.error("Error fetching tickets:", e);
      }
    };
    fetchTickets();
  }, [authUser._id, getAllTickets]);

  useEffect(() => {
    if (search.trim() === "") {
      setdisplayticket(tickets);
    } else {
      const filteredTickets = tickets.tickets?.filter((row) =>
        row.subject.toLowerCase().includes(search.toLowerCase())
      );
      setdisplayticket({ tickets: filteredTickets || [] });
    }
  }, [search, tickets]);

  const handleSearchChange = (e) => {
    setsearch(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    const newMessage = {
      sender: "Client",
      message: message,
      createdAt: new Date(),
    };

    const ticketData = {
      ...formData,
      conversations: [newMessage],
      status: "New",
      createdAt: formData.createdAt || new Date(),
    };

    try {
      await createticket(ticketData);

      setformData({
        subject: "",
        conversations: [],
        createdAt: new Date().toISOString().split("T")[0],
        clientId: authUser._id,
      });
      setMessage("");

      const fetchedTickets = await getAllTickets(authUser._id);
      setTickets(fetchedTickets);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-17 pb-6 px-4 sm:px-6 lg:px-8 font-sans">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 space-y-6 mb-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-indigo-900">
            Create New Support Ticket
          </h2>
          <p className="text-indigo-600/90 font-medium">
            Quick and easy way to submit your support requests
          </p>
        </div>

        <div className="space-y-6">

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="block text-lg font-semibold text-gray-800"
            >
              Subject *
              <span className="ml-2 text-sm text-gray-500">
                (3-100 characters)
              </span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-4 py-3 rounded-lg border border-gray-300/90 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all placeholder:text-gray-400"
              value={formData.subject}
              placeholder="e.g., Login issues after recent update"
              required
              minLength={3}
              maxLength={100}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-lg font-semibold text-gray-800"
            >
              Your Message *
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300/90 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all placeholder:text-gray-400"
              placeholder="Describe your issue in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="createdAt"
              className="block text-lg font-semibold text-gray-800"
            >
              Occurrence Date *
            </label>
            <input
              type="date"
              id="createdAt"
              name="createdAt"
              className="w-full px-4 py-3 rounded-lg border border-gray-300/90 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-700"
              value={formData.createdAt}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isCreatingTicket}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {isCreatingTicket ? (
              <div className="flex items-center justify-center gap-2">
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span>Submitting Ticket...</span>
              </div>
            ) : (
              "Create Ticket Now"
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 w-full max-w-4xl px-4">
        <div className="flex items-center gap-3 mb-4">
          <div>Search:</div>
          <FormControl
            value={search}
            onChange={handleSearchChange}
            placeholder="Search Tickets"
            className="w-full"
          />
        </div>
        <SearchTicketTable tickets={displayticket.tickets || []} />
      </div>
    </div>
  );
};

export default TicketPage;
