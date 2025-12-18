import React from "react";

const repElement = ({value,label,color}) => {
  return (
    <div className="flex gap-2 items-center">
      <span
        className="symbol    items-start"
        style={{ backgroundColor: color }}
      />
      <div className="flex flex-col gap-1 ">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold text-black">{value}</span>
      </div>
    </div>
  );
};

export default repElement;
