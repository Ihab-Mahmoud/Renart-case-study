import React from "react";
import {Toggle} from "./index";

const toggleComponent = ({
  text,
  onIcon,
  offIcon,
  value,
  setValue,
  power,
  setVacuum,
  setLight
}) => {
  return (
    <div className="flex w-72 justify-between items-center ">
      <span className="text-2xl text-gray-800 font-popping  font-semibold flex ">
        {text}
      </span>
      <Toggle
        onIcon={onIcon}
        offIcon={offIcon}
        value={value}
        setValue={setValue}
        power={power}
        text={text}
        setVacuum={setVacuum}
        setLight={setLight}
      />
    </div>
  );
};

export default toggleComponent;
