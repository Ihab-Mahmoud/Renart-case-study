import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import BookingConfirmation from "../components/BookingConfirmation.jsx";

const BookingPage = () => {
  const { setRerender } = useOutletContext();

  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------- Generate next 7 days ---------- */
  const generateWeekDates = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    const today = new Date();

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return {
        key: date.toISOString().split("T")[0],
        label: `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`,
      };
    });
  };

  const weekDates = generateWeekDates();
  const [selectedDate, setSelectedDate] = useState(weekDates[0]);

  /* ---------- Fetch clinics ---------- */
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await axios.get("/api/v1/doctor");
        setClinics(res.data.data || []);
      } catch (err) {
        console.error("Error fetching clinics", err);
        setClinics([]);
      }
    };
    fetchClinics();
  }, []);

  /* ---------- Fetch doctors by clinic ---------- */
  useEffect(() => {
    if (!selectedClinic) {
      setDoctors([]);
      setSelectedDoctor("");
      setSelectedTime(null);
      return;
    }

    const fetchDoctors = async () => {
      try {
      const res = await axios.post("/api/v1/doctor/doctor", {
      clinicId: selectedClinic,
      });
        console.log(res);
        
        setDoctors(res.data.data || []);
        setSelectedDoctor("");
        setSelectedTime(null);
      } catch (err) {
        console.error("Error fetching doctors", err);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, [selectedClinic]);

  /* ---------- Fetch slots by doctor + date ---------- */
  useEffect(() => {
    if (!selectedDoctor || !selectedDate) {
      setTimeSlots([]);
      return;
    }

    const fetchSlots = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/timeSlot", {
          params: {
            doctorId: selectedDoctor,
            date: selectedDate.key,
          },
        });
        setTimeSlots(res.data.slots || []);
      } catch (err) {
        console.error("Error fetching slots", err);
        setTimeSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDoctor, selectedDate]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center "
     
    >
      <div className="relative container mx-auto p-6 bg-gray-200 rounded-2xl shadow-lg min-h-[620px] backdrop-blur-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Book a Consultation
        </h1>

        {/* Clinic */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Select Clinic
          </label>
          <select
            value={selectedClinic}
            onChange={(e) => setSelectedClinic(e.target.value)}
            className="w-full p-3 rounded-md border text-black"
          >
            <option value="" disabled>
              Choose a clinic
            </option>
            {clinics.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Select Doctor
          </label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            disabled={!selectedClinic}
            className="w-full p-3 rounded-md border disabled:bg-gray-200 text-black"
          >
            <option value="" disabled>
              {selectedClinic ? "Choose a doctor" : "Select a clinic first"}
            </option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">
            Select Date
          </label>
          <div className="flex overflow-x-auto">
            {weekDates.map((date) => (
              <button
                key={date.key}
                disabled={!selectedDoctor}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className={`mx-1 px-3 py-2 rounded-md text-sm text-black ${
                  selectedDate.key === date.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                } ${!selectedDoctor && "opacity-50 cursor-not-allowed"}`}
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time slots */}
        <div className="mb-6">
          {loading ? (
            <div className="text-center text-gray-500">
              Loading available slots...
            </div>
          ) : timeSlots.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => {
                const time = new Date(slot.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <button
                    key={slot._id}
                    disabled={slot.isBooked}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 rounded-md border ${
                      slot.isBooked
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : selectedTime?._id === slot._id
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No available slots for this date
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex justify-end border-t pt-4">
          <button
            onClick={() => setOpen(true)}
            disabled={!selectedTime || isSubmitting}
            className={`px-5 py-2 rounded-md ${
              selectedTime
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </div>

        <BookingConfirmation
          open={open}
          setOpen={setOpen}
          slot={selectedTime}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </div>
  );
};

export default BookingPage;
