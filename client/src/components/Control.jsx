import React from "react";
import Toggle from "./Toggle";

import { ToggleComponent } from "./index";
import { controls } from "../utils/links";
const Control = ({ power, setPower, vacuum, setVacuum, light, setLight }) =>
{
  const getToggleProps = (text) => {
    switch (text.toLowerCase()) {
      case "power":
        return { value: power, setValue: setPower };
      case "vacuum":
        return { value: vacuum, setValue: setVacuum };
      case "light":
        return { value: light, setValue: setLight };
      default:
        return { value: false, setValue: () => {} }; // fallback
    }
  };
  return (
    <div className="flex flex-col gap-9 con-container bg-white text-black p-10 w-fit max-w-full ">
      <h2 className="text-2xl text-gray-800 font-semibold font-popping">
        Control
      </h2>
      {controls.map((element, index) =>
      {
        const { value, setValue } = getToggleProps(element.text);
         
        return (
          <ToggleComponent
            key={index}
            onIcon={element.onIcon}
            offIcon={element.offIcon}
            text={element.text}
            value={value}
            power={power}
            setValue={setValue}
            setVacuum={setVacuum}
            setLight={setLight}
          />
        );
      })}
    </div>
  );
};

export default Control;
