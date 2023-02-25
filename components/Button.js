const Button = ({ children, type, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-[14px] ${
        type === "white" ? "text-[#0891B2] bg-white" : "bg-[#0891B2] text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
