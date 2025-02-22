export const SecondaryCard = ({children}) => {
  return (
    <button className="mt-8 bg-white text-black py-1 px-8 rounded-full text-base font-semibold shadow cursor-pointer hover:bg-gray-300 transition">
        {children}
    </button>
  );
};
