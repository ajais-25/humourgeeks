import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { API_URL } from "../apiUrl.js";
import { Card } from "./Card";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [userHistory, setUserHistory] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getUserHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/history`);
        console.log(response.data.data);
        setUserHistory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserHistory();
  }, []);

  const clearCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/");
    });

    navigate("/login");
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
            {userHistory &&
              userHistory.map((history) => (
                <Link
                  to={`/setups/${history.history.setup._id}`}
                  key={history.history._id}
                >
                  <li
                    key={history.history._id}
                    className="bg-gray-800 text-gray-200 shadow rounded p-2 mb-2 cursor-pointer hover:bg-gray-700 transition-all duration-300 ease-in-out"
                  >
                    {history.history.setup.setup.slice(0, 25)}...
                  </li>
                </Link>
              ))}
          </ul>
        </div>

        <Card>
          <div
            onClick={() => {
              navigate("/setups");
            }}
          >
            Setup List
          </div>
        </Card>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
          <button className="text-gray-400 flex items-center justify-between hover:text-white text-left cursor-pointer">
            <div className="flex items-center gap-2">
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
            </div>

            {/* log out button */}
            <div
              onClick={clearCookies}
              className="cursor-pointer hover:text-yellow-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
