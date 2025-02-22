export const Card = ({ children, color }) => {
  return (
    <>
      <button
        className={`border-2 text-white  px-4 py-2 rounded mb-4 w-full cursor-pointer hover:bg-[#3B3022]`}
        style={{borderColor:color}}
      >
        {children}
      </button>
    </>
  );
};
