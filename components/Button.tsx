import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "table";
  text: string;
  className?: string;
}
function Button({ variant, text, className }: ButtonProps) {
  return (
    <button
      className={`rounded-full px-[32px] py-[10px] bg-btn text-white ${
        variant === "table"
          ? "bg-[#E3E3E3] text-[#7A7A7A] rounded-md font-body text-[16px]"
          : ""
      } text-[20px] font-heading  ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
