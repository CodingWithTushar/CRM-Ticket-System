import React from "react";
import { Link } from "react-router-dom";

const NavBarButton = ({ text, to ,OnClick }) => {
  return (
    <Link style={{textDecoration: 'none'}} to={to}>
      <button className="
        hidden lg:flex items-center justify-center
        px-6 py-2.5
        font-semibold tracking-wide
        bg-gradient-to-r from-blue-500 to-blue-600
        hover:from-blue-600 hover:to-blue-700
        active:scale-95
        text-white
        rounded
        shadow-md
        hover:shadow-lg
        transition-all
        duration-300
        ease-out
        transform
        hover:-translate-y-0.5
        border-none
        relative
        overflow-hidden
        before:absolute
        before:inset-0
        before:bg-white
        before:opacity-0
        hover:before:opacity-10
        before:transition-opacity
        before:duration-300
        group
      "onClick={OnClick}>
        <span className="relative z-10">
          {text}
          <span className="
            absolute -bottom-1 left-0
            w-full h-0.5
            bg-white
            transition-transform
            duration-300
            transform scale-x-0
            group-hover:scale-x-85
            origin-center
          "></span>
        </span>
      </button>
    </Link>
  );
};

export default NavBarButton;