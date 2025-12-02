import React from "react";

// Renamed to Card to match your file
const Card = ({
  title,
  children,
  className = "",
}: {
  title?: string | null;
  children: React.ReactNode;
  className?: string | null;
}) => {
  return (
    <div
      className={`
         relative p-6 rounded-xl shadow-xl overflow-hidden
   bg-white/50 content-center justify-center
backdrop-filter backdrop-blur-md
border border-gray-300 border-opacity-30

        ${className}
      `}
    >
      {title && (
        <h3 className="text-lg font-semibold text-black/70 mb-4 text-center">
          {title}
        </h3>
      )}
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

export default Card;
