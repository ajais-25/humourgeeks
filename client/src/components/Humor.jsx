import { useEffect, useState } from "react";

const Humor = ({ title, emoji, color, rating }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(rating );
    }, 100);
    return () => clearTimeout(timeout);
  }, [rating]);

  return (
    <div className="w-full">
      {/* Title & Emoji Section */}
      <div className="bg-white flex justify-between items-center gap-2 rounded-md px-2 py-1 my-2">
        <div className={`${color} w-4 h-4 rounded-md my-1`}></div>
        <span className="text-xs font-bold">{title} {emoji}</span>
       <div className="text-xs font-bold"> {rating ? rating:null}</div> 
      </div>

      {/* Progress Bar Wrapper with White Background */}
      <div className="w-full bg-white rounded-md overflow-hidden h-3 border border-gray-300">
        <div
          className={`${color} transition-all duration-1000 ease-linear h-full rounded-md`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Percentage Text */}
      <div className="text-[10px] font-bold text-black px-1 mt-1">{rating}%</div>
    </div>
  );
};

export default Humor;
