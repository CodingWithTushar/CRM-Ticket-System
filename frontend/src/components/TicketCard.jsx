import React from "react";

const TicketCard = ({ div1, div2, div3, div4 }) => {
  return (
    <div className="flex items-center justify-between gap-4 
      bg-gradient-to-r from-red-200 to-red-300 
      hover:from-red-200 hover:to-red-400 
      border border-red-200 
      rounded-lg 
      shadow-sm hover:shadow-md 
      p-2 mb-3 
      transition-all duration-300 
      hover:-translate-y-0.5 
      group">

      <div className="text-red-800 font-bold text-lg">
        {div1}
      </div>
      
      <div className="text-red-700 font-medium">
        {div2}
      </div>

      <div className="text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm">
        {div3}
      </div>

      <div className="text-red-900 text-sm">
        {div4}
      </div>
    </div>
  );
};

export default TicketCard;