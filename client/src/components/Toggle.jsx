import { useState } from "react";

const Toggle = ({
  onIcon,
  offIcon,
  value,
  setValue,
  power,
  text,
  setVacuum,
  setLight,
}) => {
  // const [enabled, setEnabled] = useState(false);

  return (
    <div
      onClick={() => {
        if (text.toLowerCase() == "vacuum") {
          if (power) {
            setValue(!value);
          }
        } else {
          if (text.toLowerCase() == "power") {
            setVacuum(false);
            setLight(false);
          }
          setValue(!value);
        }
      }}
      className="h-12 w-28 flex items-center px-1 rounded-full cursor-pointer transition-colors duration-300 bg-gray-100"
    >
      <div
        className={`transform transition-transform duration-300 flex items-center justify-center ${
          value ? "bg-green-400 translate-x-16" : "bg-red-400 translate-x-0"
        } h-10 w-10 rounded-full`}
      >
        <div className="h-6 w-6 text-white flex items-center justify-center">
          {value ? onIcon : offIcon}
        </div>
      </div>
      <span
        className={`ml-2 font-semibold text-gray-400 ${
          value ? " -translate-x-10" : "translate-x-4"
        }`}
      >
        {value ? "ON" : "OFF"}
      </span>
    </div>
  );
};

export default Toggle;
