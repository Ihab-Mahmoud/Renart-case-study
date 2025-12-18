import React from "react";
import Wrapper from "../assets/wrappers/Materials";
import ProgressBar from "./ProgressBar";
const labels = [
  "Karton",
  "r_hdpe",
  "aerosol",
  "pet",
  "Karton",
  "r_hdpe",
  "aerosol",
  "pet",
];
const backgroundColor = [
  "#e40b90",
  "#0097ff",
  "#33d397",
  "#ff6e5f",
  "#e40b90",
  "#0097ff",
  "#33d397",
  "#ff6e5f",
];

const dataSet = [7087, 2272, 76, 2230, 7087, 2272, 76, 2230];
const combined = labels.map((label, i) => ({
  label,
  value: dataSet[i],
  color: backgroundColor[i],
}));
const materials = () => {
  return (
    <Wrapper>
      <div className="mat-container">
        <h2 className="flex justify-start text-xl font-semibold  text-black font-popping">
          Materials
        </h2>
        <div className=" flex flex-col progress-bar scroll-container max-h-80 overflow-auto gap-4">
          {combined.map((element, index) => {
            return (
              <ProgressBar
                value={element.value}
                max={50000}
                label={element.label}
                color={element.color}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default materials;
