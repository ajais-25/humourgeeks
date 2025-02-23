import React, { useEffect, useState } from "react";
import TitleEmoji from "../components/TitleEmoji";
import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HUMOR_TYPES } from "./Setup";
import { API_URL } from "../apiUrl";

const comments = [
  {
    username: "notoyrobots",
    text: "I'm proposing in a week, went with a Sapphire instead. More affordable (savings going to a better honeymoon) and it definitely suits her/the ring design better.",
    upvotes: 1700,
    timeAgo: "2 hours ago",
  },
  {
    username: "motoyrobots",
    text: "I'm proposing in a week, went with a Sapphire instead. More affordable (savings going to a better honeymoon) and it definitely suits her/the ring design better.",
    upvotes: 876,
    timeAgo: "2 hours ago",
  },
  {
    username: "motoyrobots",
    text: "I'm proposing in a week, went with a Sapphire instead. More affordable (savings going to a better honeymoon) and it definitely suits her/the ring design better.",
    upvotes: 876,
    timeAgo: "2 hours ago",
  },
  {
    username: "motoyrobots",
    text: "I'm proposing in a week, went with a Sapphire instead. More affordable (savings going to a better honeymoon) and it definitely suits her/the ring design better.",
    upvotes: 876,
    timeAgo: "2 hours ago",
  },
  {
    username: "motoyrobots",
    text: "I'm proposing in a week, went with a Sapphire instead. More affordable (savings going to a better honeymoon) and it definitely suits her/the ring design better.",
    upvotes: 876,
    timeAgo: "2 hours ago",
  },
];

function getTimeDifference(updatedTime) {
  const currentTime = new Date();
  const updatedDate = new Date(updatedTime);

  const diffInMilliseconds = currentTime - updatedDate;

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Approximate number of days in a month
  const years = Math.floor(days / 365.25); // Approximate number of days in a year

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

const TopPunches = () => {
  const { id } = useParams();
  const [topPunches, setTopPunches] = useState([]);
  const [humourRating, setHumourRating] = useState({});

  const handleUpvote = async (punchId, isUpvoted) => {
    if (isUpvoted) {
      setTopPunches((prev) =>
        prev.map((punch) => {
          if (punch._id === punchId) {
            return {
              ...punch,
              isUpvoted: false,
              upvoteCount: punch.upvoteCount - 1,
            };
          }
          return punch;
        })
      );
    } else {
      setTopPunches((prev) =>
        prev.map((punch) => {
          if (punch._id === punchId) {
            return {
              ...punch,
              isUpvoted: true,
              upvoteCount: punch.upvoteCount + 1,
            };
          }
          return punch;
        })
      );
    }

    try {
      const response = await axios.patch(
        `${API_URL}/top-punches/${punchId}/upvote`
      );
      console.log(response.data.data);
    } catch (error) {
      console.log("Error upvoting punch", error);
    }
  };

  useEffect(() => {
    const getTopPunches = async () => {
      try {
        const response = await axios.get(`${API_URL}/top-punches/${id}`);
        console.log("Hello :", response.data.data[0].humourRating);
        setHumourRating(response.data.data[0].humourRating);
        setTopPunches(response.data.data);
      } catch (error) {
        console.error("Error fetching top punches", error);
      }
    };

    getTopPunches();
  }, []);

  return (
    <div className="bg-yellow-400 min-h-screen flex flex-col items-center p-4 w-full h-screen overflow-hidden md:pl-72 pl-8">
      <div className="w-full text-center text-4xl font-extrabold cursor-default">
        <TitleEmoji />
      </div>
      <div className="bg-white w-full max-w-5xl mt-8 rounded-lg shadow-lg p-4 flex-1 overflow-y-hidden relative">
        <button
          className="absolute top-4 left-4 text-black text-xl"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft className="cursor-pointer" size={24} />
        </button>
        <div className="mt-10 text-left">
          <h2 className="text-xl font-semibold mb-4">Top Punches :</h2>
        </div>
        <div className="space-y-4 overflow-y-auto red-scrollbar h-[80%] pr-2">
          {topPunches &&
            topPunches.map((punch, index) => (
              <div
                key={punch._id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-start space-x-4"
              >
                <div className="w-10 h-10 flex justify-center items-center text-white rounded-full font-bold bg-black ">
                  {punch.user.name[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-700">
                    {punch.user.name}
                  </div>
                  <p className="text-gray-800 text-sm mt-1">
                    {punch.punchline}
                  </p>
                  <div className="flex gap-10 mt-2">
                    {HUMOR_TYPES.map((h, index) => (
                      <div key={index} className="flex gap-2 items-center ">
                        <div className={`h-4 w-4 rounded-md ${h.color}`}></div>
                        <span className="text-sm font-bold">{h.title} :</span>
                        <span className="font-bold">
                          {humourRating[h.title.toLowerCase()] !== undefined
                            ? humourRating[h.title.toLowerCase()]
                            : "N/A"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => handleUpvote(punch._id, punch.isUpvoted)}
                      className="px-2 py-1 rounded flex items-center cursor-pointer hover:bg-gray-200 transition-all"
                    >
                      {punch.isUpvoted ? <BiSolidUpvote /> : <BiUpvote />}{" "}
                      {punch.upvoteCount}
                    </button>
                    <span className="text-gray-500 text-sm">
                      {getTimeDifference(punch.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopPunches;
