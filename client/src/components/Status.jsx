import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Status = () =>
{
  const [speed,setSpeed]= useState(0)
  const [torque,setTorque]= useState(0)
  return (
    <div className="flex flex-col gap-9 con-container bg-white text-black p-10 w-full ">
      <h2 className="text-2xl text-gray-800 font-semibold ">Status</h2>
      <div className="grid grid-cols-2 gap-7 ">
        <span className="bg-neutral-400 text-md py-1 px-7 text-white rounded-lg font-bold ">
          Sensor 1
        </span>
        <span className="bg-neutral-400 text-md py-1 px-7 text-white rounded-lg font-bold ">
          Motor 1
        </span>
        <span className="bg-neutral-400 text-md py-1 px-7 text-white rounded-lg font-bold ">
          Sensor 2
        </span>
        <span className="bg-neutral-400 text-md py-1 px-7 text-white rounded-lg font-bold ">
          Motor 2
        </span>
        <span className="bg-neutral-400 text-md py-1 px-7 text-white rounded-lg font-bold ">
          Sensor 3
        </span>
        <span className="bg-neutral-400 text-md py-1 px-7 text-white rounded-lg font-bold ">
          Motor 3
        </span>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex  items-center justify-between">
          <span className="font-semibold text-lg text-gray-800 font-popping">
            Speed
          </span>
          <div className="flex gap-4 items-center">
            <button
              className="p-3 text-white bg-neutral-400 rounded-full text-3xl"
              onClick={() => {
                if (speed > 0) {
                  setSpeed(speed - 1);
                }
              }}
            >
              <FaMinus />
            </button>
            <span className="font-semibold w-3">{speed}</span>
            <button
              className="p-3 text-white bg-neutral-400 rounded-full text-3xl"
              onClick={() => {
                setSpeed(speed + 1);
              }}
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="flex  items-center justify-between">
          <span className="font-semibold text-lg text-gray-800 font-popping">
            Torque
          </span>
          <div className="flex gap-4 items-center">
            <button
              className="p-3 text-white bg-neutral-400 rounded-full text-3xl"
              onClick={() => {
                if (torque > 0) {
                  setTorque(torque - 1);
                }
              }}
            >
              <FaMinus />
            </button>
            <span className="font-semibold  w-3">{torque}</span>
            <button
              className="p-3 text-white bg-neutral-400 rounded-full text-3xl"
              onClick={() => {
                setTorque(torque + 1);
              }}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
