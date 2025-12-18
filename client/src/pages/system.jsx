import React, { useState } from "react";
import { Control, Info, Machine, Status } from "../components";

const System = () =>
{
   const [power, setPower] = useState(false);
    const [light, setLight] = useState(false);
    const [vacuum, setVacuum] = useState(false);
  return (
    <div className="flex  relative gap-8 justify-between flex-col  lg:flex-row ">
      <div className="flex flex-col gap-4 flex-grow basis-1/4">
        <Control
          power={power}
          setPower={setPower}
          light={light}
          setLight={setLight}
          vacuum={vacuum}
          setVacuum={setVacuum}
        />
        <Status />
      </div>
      <div className="flex flex-col gap-5 lg:gap-1 justify-between flex-grow basis-3/4 ">
        <Machine
          power={power}
          setPower={setPower}
          light={light}
          setLight={setLight}
          vacuum={vacuum}
          setVacuum={setVacuum}
        />
        <div className="flex  w-full  justify-center  lg:justify-end flex-grow basis-1/4">
          <Info />
        </div>
      </div>
    </div>
  );
};

export default System;
