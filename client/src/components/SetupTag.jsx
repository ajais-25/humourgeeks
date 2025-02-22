export const SetupTag = ({ title }) => {
  return (
    <a
      href={`/setups&tag=${title}`}
      className="text-gray-500 font-semibold text-xs flex items-center 
                hover:bg-slate-300 bg-slate-200  rounded-full px-2 h-6 mx-1 
                 border border-black-400/20"
    >
      {title}
    </a>
  );
};

export default SetupTag;
