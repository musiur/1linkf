const Button = ({ children, type, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-[14px] ${
        type === "white" ? "text-[#0891B2] bg-none" : "bg-[#0891B2] hover:bg-[#06B6D4] text-white"
      } flex items-center justify-center gap-[10px]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
