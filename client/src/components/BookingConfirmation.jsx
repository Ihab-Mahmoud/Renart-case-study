import { useNavigate } from "react-router-dom";
import fetch from "../utils/custom-axios";
import axios from "axios";

const BookingConfirmation = ({
  slot,
  setOpen,
  open,
  setIsSubmitting,
  isSubmitting,
  check,
  bookingId,
}) => {
  const navigate = useNavigate();

  const handleBooking = async () => {
    setIsSubmitting(true);
    try {
      let createdBooking;

if (check) {
  const res = await axios.patch(
    `/api/v1/booking/${bookingId}`,
    { slotId: slot?._id },
    { headers: { "Content-Type": "application/json" } }
  );

  createdBooking = res.data.booking;
} else {
  const res = await axios.post(
    `/api/v1/booking`,
    { slotId: slot?._id },
    { headers: { "Content-Type": "application/json" } }
  );

  createdBooking = res.data.booking;
}


      sessionStorage.setItem("justBooked", "true");
      navigate(`/dashboard/booking-success/${createdBooking?._id}`);
    } catch (error) {
      console.error("Error creating booking", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date & time in English
  const appointmentDate = new Date(slot?.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const appointmentTime = new Date(slot?.startTime).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <h2 className="text-xl font-bold text-sky-700 mb-4">
          Confirm Appointment
        </h2>

        {/* Content */}
        <p className="text-gray-700 text-lg mt-2">
          Are you sure you want to book an appointment on{" "}
          <span className="font-semibold">{appointmentDate}</span> at{" "}
          <span className="font-semibold">{appointmentTime}</span>?
        </p>

        {/* Footer / Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleBooking();
              setOpen(false);
            }}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
