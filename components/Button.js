const Button = ({ children, type, onClick }) => {
  return (
    <button
      className={`w-full min-w-[100px] max-h-[50px] px-4 py-2 rounded-md text-[14px] ${type === "white" ? "text-[#0891B2] bg-none hover:bg-[#0891B210]" : type === "warning" ? "bg-red-200 hover:bg-red-100 text-red-600" : type === "warning-solid" ? "bg-red-600 hover:bg-red-500 text-white" : "bg-[#0891B2] hover:bg-[#06B6D4] text-white"
        } flex items-center justify-center gap-[10px]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
