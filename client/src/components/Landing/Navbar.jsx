import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full flex justify-center">
      <nav className="bg-gray-300 fixed top-6 z-100 w-[90%] py-3 px-6 flex justify-between items-center rounded-full mx-auto">
        <span className="text-gray-800 font-bold text-lg">Humourgeeks</span>
        <div className="space-x-6 hidden md:flex">
          <button className="text-gray-600">Preview</button>
          <button className="text-gray-600">About</button>
          <Link to={"/login"}>
            <button className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-full cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
