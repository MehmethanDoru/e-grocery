const Loader = ({ size = "default" }) => {
  const sizeClasses = {
    small: "w-16 h-16",
    default: "w-24 h-24",
    large: "w-32 h-32",
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#064c4f] border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-[#064c4f40] border-t-transparent rounded-full animate-spin [animation-direction:reverse]"></div>
      </div>
    </div>
  );
};

export default Loader;
