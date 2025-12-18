import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar=()=> {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className=" mx-auto bg-white border border-base-300 shadow-lg rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Calendar</h2>

      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => setSelectedDate(date)}
        today={new Date()}
        className="text-gray-800"
        captionLayout="buttons"
        components={{
          IconLeft: () => (
            <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-primary" />
          ),
          IconRight: () => (
            <ChevronRight className="w-5 h-5 text-gray-600 hover:text-primary" />
          ),
        }}
      />

      {/* {selectedDate && (
        <p className="mt-3 text-gray-700 text-sm">
          Selected:{" "}
          <span className="font-semibold">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </p>
      )} */}
    </div>
  );
}


export default Calendar;