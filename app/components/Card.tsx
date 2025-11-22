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
         relative p-6 rounded-lg shadow-xl overflow-hidden
   bg-white/15 content-center justify-center
backdrop-filter backdrop-blur-sm
border border-gray-600 border-opacity-30

        
        ${className}
      `}
    >
      {title && (
        <h3 className="text-lg font-semibold text-white mb-4 text-center">
          {title}
        </h3>
      )}
      <div className="text-gray-200">{children}</div>
    </div>
  );
};

export default Card;

// relative p-6 rounded-lg shadow-xl overflow-hidden
//         bg-white/15 content-center justify-center
//         backdrop-filter backdrop-blur-sm
//         border border-gray-600 border-opacity-30
