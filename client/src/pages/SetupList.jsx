import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../apiUrl";
import TitleEmoji from "../components/TitleEmoji";
import { Link } from "react-router-dom";

const SetupList = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [tagFilter, setTagFilter] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [setups, setSetups] = useState([]);
  const [total, setTotal] = useState(0);

  const itemsPerPage = 10;

  useEffect(() => {
    const getSetups = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/setups?status=${statusFilter}&tags=${tagFilter.join(
            ","
          )}&search=${searchQuery}&page=${page}`
        );
        setSetups(response.data.data.setups);
        setTotal(response.data.data.total);
        // console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getSetups();
  }, [page, statusFilter, tagFilter, searchQuery]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await axios.get(`${API_URL}/tags`);
        setTags(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTags();
  }, []);

  const handleTagsFilter = (id) => {
    setTagFilter([]);
    setTagFilter((prev) => [...prev, id]);
  };

  return (
    <div className="bg-yellow-400 w-full min-h-screen flex flex-col justify-center items-center md:pl-72 pl-8 p-10 px-12 overflow-hidden">
      <div className="w-full text-center text-4xl font-extrabold cursor-default">
        <TitleEmoji />
      </div>
      <div className="bg-white p-4 rounded-lg mt-8 shadow-lg w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
          <div className="relative w-full sm:w-1/2">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a setup..."
              className="border p-2 pl-10 rounded w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <select
              className="border p-2 rounded cursor-pointer"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>
            <select
              className="border p-2 rounded cursor-pointer"
              onChange={(e) => handleTagsFilter(e.target.value)}
            >
              <option value="">Tags</option>
              {tags &&
                tags.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border-b">Sl. No.</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b text-left">Title</th>
              <th className="p-2 border-b text-left">Tags</th>
            </tr>
          </thead>
          <tbody>
            {setups &&
              setups.map((item, index) => (
                <tr key={item._id} className="border-b">
                  <td className="p-2 w-20 text-center">
                    {(page - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="p-2 w-20 text-center">
                    <span
                      className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        item.status === "solved"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></span>
                  </td>
                  <td className="p-2 hover:text-pink-700">
                    <Link to={`/setups/${item._id}`} key={item._id}>
                      {item.setup}
                    </Link>
                  </td>
                  <td className="p-2 w-50 text-left">
                    {item.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="bg-gray-300 text-black text-xs px-2 py-1 rounded-full mr-1"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>
            Page {total ? page : 0} of {Math.ceil(total / itemsPerPage)}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
            disabled={page * itemsPerPage >= total}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupList;
