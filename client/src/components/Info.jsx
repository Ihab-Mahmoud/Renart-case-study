import React from 'react'

const Info = () => {
  return (
    <div className="flex flex-col gap-5 con-container bg-white text-black px-6 lg:px-12  pb-16 p-6  w-fit ">
      <h2 className="text-2xl text-gray-800 font-semibold font-popping ">
        Info
      </h2>
      <div className="w-72 flex flex-col ">
        <div className="flex justify-between border-t-2 pt-5 border-stone-100">
          <span className="font-semibold text-md text-neutral-700">
            Machine ID
          </span>
          <span className="font-semibold text-md text-neutral-700">
            ID-123456789
          </span>
        </div>
        <div className="flex justify-between border-t-2 pt-5 border-stone-100">
          <span className="font-semibold text-md text-neutral-700">Model</span>
          <span className="font-semibold text-md text-neutral-700">
            AB12345
          </span>
        </div>
        <div className="flex justify-between border-t-2 pt-5 border-stone-100">
          <span className="font-semibold text-md text-neutral-700">
            AI Version
          </span>
          <span className="font-semibold text-md text-neutral-700">
            AI-123456789
          </span>
        </div>
        <div className="flex justify-between border-t-2 pt-5 border-stone-100">
          <span className="font-semibold text-md text-neutral-700">
            Last Update
          </span>
          <span className="font-semibold text-md text-neutral-700">
            01.20.2024
          </span>
        </div>
      </div>
    </div>
  );
}

export default Info