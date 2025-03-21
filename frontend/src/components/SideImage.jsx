import React from "react";

const SideImage = ({ img, text }) => {
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-7">
        <img src={img} alt="SideImage" className="rounded  w-96 " />
        <div className="text-2xl font-semibold">{text}</div>
      </div>
    </>
  );
};

export default SideImage;
