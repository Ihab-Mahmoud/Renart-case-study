import React from "react";

const ProgressBar = ({ value, max, color, label }) => {
  const percent = (value / max) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <span style={{ color: "#000000b5", fontSize: 14, fontWeight: "600" }}>
          {value}{" "}
          <span style={{ color: "#00000087", fontSize: 13, fontWeight: "600" }}>
            pcs
          </span>
        </span>
        <span className="text-cyan-600 font-semibold">{label}</span>
      </div>
      <div
        style={{
          background: "#e5e7eb", // Tailwind's gray-200
          borderRadius: "9999px",
          height: "12px",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            backgroundColor: color ,
            height: "100%",
            transition: "width 0.3s ease-in-out",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
