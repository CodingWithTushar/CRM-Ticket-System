import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import emailjs from "@emailjs/browser";

const TicketConversation = () => {
  const {authUser , getticketbyid, deleteticketbyid, closeticketbyid, updateticketbyid } =
    useAuth();
  const { _id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setIsLoading(true);
        if (_id) {
          const fetchedTicket = await getticketbyid(_id);
          setTicket(fetchedTicket);
        }
      } catch (error) {
        toast.error(`Error fetching ticket: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();
  }, [_id, getticketbyid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      const formData = {
        sender: "Support",
        message: message,
        createdAt: new Date(),
      };
      const service_id = "service_17u00iy";
      const template_id = "template_98q95uf";
      const public_key = "gVegUQDVLTTNf8iq0";

      const templateParams = {
        from_email: authUser.email,
        to_name: "Resolve 360",
        message: message
      } 

      await emailjs.send(service_id, template_id , templateParams , public_key)
      .then((response) => {
          toast.success("Email sent successfully" , response)
      })
      .catch((error) => {
        toast.error("Error in sending email:" , error)
      })  

      await updateticketbyid(_id, formData);
      toast.success("Reply sent successfully");
      setMessage("");
      // Refresh ticket data
      const updatedTicket = await getticketbyid(_id);
      setTicket(updatedTicket);
    } catch (error) {
      toast.error(`Error sending reply: ${error.message}`);
    }
  };

  const deleteTicket = async () => {
    try {
      await deleteticketbyid(_id);
      toast.success("Ticket deleted successfully");
    } catch (error) {
      toast.error(`Error deleting ticket: ${error.message}`);
    }
  };

  const closeTicket = async () => {
    try {
      await closeticketbyid(_id);
      toast.success("Ticket closed successfully");

    } catch (error) {
      toast.error(`Error closing ticket: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="h-screen flex justify-center items-center">
        Ticket not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-8 px-4 font-sans">
      <div className="bg-white rounded-lg w-full max-w-4xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
          <h2 className="text-xl font-bold">Ticket Conversation</h2>
          <div className="flex justify-center items-center gap-3">
            <Link to="/home">
            <button
              onClick={closeTicket}
              className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Close
            </button>
            </Link>
            <Link to="/home">
              <button
                onClick={deleteTicket}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </Link>
            <Link to="/home" className="no-underline">
              <button className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-700">
                Back
              </button>
            </Link>
          </div>
        </div>

        <div className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-gray-500">Subject</h3>
              <p>{ticket.ticket?.subject || "No subject"}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-gray-500">Status</h3>
              <p
                className={`font-medium ${
                  ticket.ticket?.status === "New"
                    ? "text-green-600"
                    : ticket.ticket?.status === "Closed"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {ticket.ticket?.status || "Unknown"}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-gray-500">Created</h3>
              <p>
                {ticket.ticket?.createdAt
                  ? new Date(ticket.ticket.createdAt).toLocaleString()
                  : "Unknown date"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 max-h-[210px] overflow-y-auto">
          {ticket.ticket.conversations?.map((conv, index) => (
            <div
              key={index}
              className={`flex ${
                conv.sender === "Client" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] p-2 rounded-lg ${
                  conv.sender === "Client"
                    ? "bg-blue-100 rounded-tl-none"
                    : "bg-indigo-100 rounded-tr-none"
                }`}
              >
                <div className="flex justify-between items-baseline gap-3">
                  <span className="font-bold">
                    {conv.sender === "Client" ? "Client" : "Support Agent"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(conv.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <p className="mt-1 text-gray-800">{conv.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <div className="p-6 border-t bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block font-semibold text-gray-700">
              Reply Message
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your reply here..."
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Send Reply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketConversation;
