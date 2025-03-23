import React, { useState } from "react";
import tickets from "../assets/dummy-data.json";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const TicketConversation = () => {
  const [message, setmessage] = useState("");

  const { id } = useParams();

  const ticket = tickets[id];

  if (!ticket) {
    toast.error(`Ticket does not found`);
  }
  const currentDate = new Date();

  const handleonSubmit = (e) => {

    e.preventDefault()
    alert("Hello")
    toast.success("Reply sent")
  };
  return (
    <>
      <div className="h-screen bg-white flex justify-center items-center font-semibold transition-all duration-200">
        <div className="bg-white rounded  w-[1000px] px-5 py-3 shadow-xl hover:shadow-2xl transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>Ticket Conversation</div>
            <div>
              <Link style={{textDecoration: "none"}} to={"/home"}>
              <button className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-700 ">
                Close
              </button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="font-bold">Subject:</div>
            <div>{ticket.subject}</div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="font-bold">Issue found:</div>
            <div>{ticket.status}</div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="font-bold">Ticket Created:</div>
            <div>{ticket.addedAt}</div>
          </div>

          <form onSubmit={(e) => handleonSubmit(e)}>
            {message ? (<><div className="flex items-center justify-around mt-3 gap-3">
              <label>
                <h6>Client Name</h6>
                <p>{`${currentDate}`}</p>
              </label>
              <div>
                <textarea
                  spellCheck={true}
                  className="lg:w-[700px] font-semibold rounded gap-3 mb-2 border-2 border-gray-300  hover:ring-2 hover:ring-black-400 p-1"
                  rows={5}
                ></textarea>
              </div>
            </div><div className="flex items-center justify-around mt-3 gap-3">
                <div>
                  <textarea
                    spellCheck={true}
                    className="lg:w-[700px] font-semibold rounded gap-3 mb-2 border-2 border-gray-300 hover:ring-2 hover:ring-black-400 p-1"
                    rows={5}
                  ></textarea>
                </div>
                <label>
                  <h6>Operator Name</h6>
                  <p>{`${currentDate}`}</p>
                </label>
              </div></>) : ""}
            
            <div className="flex-col flex gap-1">
              <label className="text-center font-bold">Reply</label>
              <p>Please reply your message here or update the ticket</p>
              <textarea
                className="lg:w-full font-semibold rounded gap-3 mb-2 border-2 border-gray-300 hover:ring-2 hover:ring-black-400 p-1"
                onChange={(e) => setmessage(e.target.value)}
                value={message}
                rows={5}
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-700 "
                
              >
                Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TicketConversation;
