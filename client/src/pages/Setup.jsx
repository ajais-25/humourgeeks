import { Card } from "../components/Card";
import Humor from "../components/Humor";
import { SecondaryCard } from "../components/SecondaryCard";
import { useEffect, useState } from "react";
import { SendIcon } from "../assets/SendIcon";
import { PlusIcon } from "../assets/PlusIcon";
import { SetupTag } from "../components/SetupTag";
import TitleEmoji from "../components/TitleEmoji";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../apiUrl";

export const HUMOR_TYPES = [
  { title: "Dark", color: "bg-red-500", emoji: "😈" },
  { title: "Pun", color: "bg-green-500", emoji: "😂" },
  { title: "Sarcasm", color: "bg-yellow-500", emoji: "👀" },
  { title: "Wholesome", color: "bg-blue-500", emoji: "😅" },
];

const Setup = () => {
  const [setup, setSetup] = useState(null);
  const [punches, setPunches] = useState([]);
  const [punchline, setPunchline] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const [humors, setHumors] = useState(
    HUMOR_TYPES.map((h) => ({ ...h, rating: 0 }))
  );
  const notify = () =>
    toast(
      "Congrats! You just invented a new language—too bad even Google Translate gave up! 😂",
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { background: "#1a1a1a", color: "#FFD700", width: "90%" }, // Dark background and yellow text
      }
    );
  const [loading, setLoading] = useState(false);
  const [overallRating, setOverallRating] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [setupResponse, punchesResponse] = await Promise.all([
          axios.get(`${API_URL}/setups/${id}`),
          axios.get(`${API_URL}/punchline/${id}`),
        ]);

        setSetup(setupResponse.data.data);
        setPunches(punchesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [id]);

  function addNew() {
    setHumors(humors.map((h) => ({ ...h, rating: 0 })));
    setPunchline("");
  }

  const addPunch = async () => {
    if (!punchline) return;

    setLoading(true);

    try {
      const response = await axios.patch(`${API_URL}/punchline/${id}`, {
        punchline,
      });
      const newPunch = response.data.data.punches.slice(-1)[0];
      setResult(newPunch);
      setPunches((prev) => [...prev, newPunch]);

      const humorRating = newPunch.humorRating || {};
      setOverallRating(humorRating.overallRating || null);
      setHumors(
        HUMOR_TYPES.map((h) => ({
          ...h,
          rating: humorRating[h.title.toLowerCase()] || 0,
        }))
      );
    } catch (error) {
      notify();
      // alert("Punchline not funny enough");
      console.error("Error adding punchline", error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async () => {
    if (!punchline || !humors) return;

    console.log(humors);

    try {
      const response = await axios.post(`${API_URL}/top-punches/${id}`, {
        punchline,
        humourRating: humors,
      });
      console.log(response.data.data);
      toast.success("Punchline added in the Top Punches section! 🎉", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error adding post", error);
    }
  };

  const handleSolutionChange = (event) => {
    const selectedIndex = event.target.selectedIndex - 1;
    if (selectedIndex >= 0) {
      const selectedPunch = punches[selectedIndex];
      setPunchline(selectedPunch.punchline);
      setHumors(
        HUMOR_TYPES.map((h) => ({
          ...h,
          rating: selectedPunch.humorRating[h.title.toLowerCase()] || 0,
        }))
      );
      setOverallRating(selectedPunch.humorRating.overallRating || 0);
      console.log(selectedPunch.humorRating.overallRating);
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#F3D723] md:pl-72 pl-8">
      <div className="w-[80%]">
        <div className="flex flex-col h-full max-w-3xl mx-auto justify-evenly py-5">
          <div className="w-full text-center text-4xl font-extrabold cursor-default">
            <TitleEmoji />
          </div>
          <div className="h-[50%] flex flex-col bg-white w-full rounded-2xl border-1">
            <div className="w-full flex justify-between border-b-2 border-gray-400 py-2">
              <span className="font-bold text-2xl text-gray-700 px-2">
                Setup :-
              </span>
              <div className="flex flex-wrap items-center">
                {setup?.tags?.map((tag) => (
                  <SetupTag key={tag._id} title={tag.name} />
                ))}
              </div>
            </div>
            <div className="w-full p-4 overflow-y-auto red-scrollbar text-md font-semibold text-gray-500">
              {setup?.setup}
            </div>
          </div>
          <div className="relative h-[30%] w-full bg-white border-1 rounded-2xl">
            <span className="h-[20%] px-2 flex items-center text-lg font-bold">
              Write your punchline
            </span>
            <textarea
              value={punchline}
              onChange={(e) => setPunchline(e.target.value)}
              className="w-full h-[80%] border-t-1 px-2 mt-1 outline-none text-sm font-medium text-gray-800"
            />
            <div className="absolute right-0 top-0 flex items-center">
              {punchline && (
                <div
                  onClick={addPost}
                  className="flex items-center gap-1 hover:bg-slate-300 text-xs font-semibold text-slate-500 bg-slate-200 rounded-full cursor-pointer py-2 px-4 mr-1 mt-1"
                >
                  Post
                </div>
              )}
              {punches.length > 0 && (
                <select
                  className="outline-none flex items-center gap-1 hover:bg-slate-300 text-sm font-semibold text-slate-500 bg-slate-200 rounded-full cursor-pointer py-1.5 px-1 mr-1 mt-1"
                  onChange={handleSolutionChange}
                >
                  <option value="" disabled selected>
                    Previous solution
                  </option>
                  {punches.map((punch, index) => (
                    <option key={punch._id} value={index}>
                      {index + 1}: {punch.punchline.slice(0, 10)}...
                    </option>
                  ))}
                </select>
              )}

              <div
                onClick={addNew}
                className="flex items-center gap-1 hover:bg-slate-300 text-xs font-semibold text-slate-500 bg-slate-200 rounded-full cursor-pointer py-1 px-2 mr-1 mt-1"
              >
                <PlusIcon /> Add New
              </div>
            </div>
            <div
              className={`absolute bottom-0 right-0 p-2 rounded-full bg-white cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
              }`}
              onClick={loading ? null : addPunch}
            >
              {loading ? (
                <div className="loader">Loading...</div>
              ) : (
                <SendIcon />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[20%] bg-[#271A10] px-2 py-4 flex flex-col justify-between">
        <Card color={"#F3D723"}>Humor Result</Card>
        <div>
          {humors.map((humor, index) => (
            <Humor key={index} {...humor} />
          ))}
        </div>
        <Card color={"#F3D723"}>
          <div className="flex w-full justify-between">
            Overall <span>{overallRating}</span>
          </div>
        </Card>
        <SecondaryCard>
          <div
            onClick={() => {
              navigate(`/setups/${id}/top-punches`);
            }}
          >
            Top Punches{" "}
          </div>
        </SecondaryCard>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Setup;
