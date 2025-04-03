import React from "react";

const TicketCard = ({ div1, div2, div3, div4 }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-3 
      bg-gradient-to-r from-blue-200 to-blue-300 
      hover:from-blue-200 hover:to-blue-400 
      border border-blue-200 
      rounded-lg 
      shadow-sm hover:shadow-md 
      p-2.5 mb-3 
      transition-all duration-300 
      hover:-translate-y-0.5 
      group">

      <div className="text-blue-800 font-bold text-lg whitespace-nowrap justify-self-start">
        {div1}
      </div>
      
      <div className="text-blue-700 font-medium whitespace-nowrap">
        {div2}
      </div>

      <div className="text-blue-600 bg-blue-50 px-3 ml-17 py-1 rounded-full text-sm whitespace-nowrap justify-self-center">
        {div3}
      </div>

      <div className="text-blue-900 text-sm whitespace-nowrap justify-self-end">
        {div4}
      </div>
    </div>
  );
};

export default TicketCard;