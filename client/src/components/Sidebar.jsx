import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Card } from "./Card";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex fixed top-0 left-0 bottom-0 h-full z-50">
      <button
        className={`md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer ${
          isOpen ? "translate-x-62" : "translate-x-0"
        }`}
        onClick={toggleSidebar}
      >
        {isOpen ? <IoMdClose size={24} /> : <FiMenu size={24} />}
      </button>
      {/* Sidebar */}
      <div
        className={`bg-[#271A10] text-white w-64 p-4 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform transition-transform duration-300 ease-in-out`}
      >
        {/* Top Section */}
          <Card color={"#FFFFF"}>History</Card>

        {/* Middle Section */}
        <div
          className="flex-1 overflow-y-auto mt-4 mb-4"
          style={{ scrollbarWidth: "thin" }}
        >
          <ul className="space-y-2">
            {/* Replace with dynamic content */}
            {/* Add with NavLink */}
            <li className="bg-gray-800 text-gray-200 shadow rounded p-2">
              Sidebar Item 1
            </li>
            <li className="bg-gray-800 text-gray-200 shadow rounded p-2">
              Sidebar Item 2
            </li>
            <li className="bg-gray-800 text-gray-200 shadow rounded p-2">
              Sidebar Item 3
            </li>
            <li className="bg-gray-800 text-gray-200 shadow rounded p-2">
              Sidebar Item 4
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
        <button className="text-gray-400 flex items-center gap-2 hover:text-white text-left cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span className="text-sm">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
