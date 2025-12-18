import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import fetch from "../utils/custom-axios";
import Confetti from "react-confetti";

/* ---------- Loader ---------- */
export const Loader = async ({ params }) => {
  try {
    const { id } = params;
    const booking  = await fetch(`/booking/${id}`, "get");
    console.log(booking);
    
    return booking.data.booking;
  } catch (error) {
    return null;
  }
};

const BookingSuccess = () => {
  const navigate = useNavigate();
  const booking = useLoaderData();
  const { user } = useOutletContext();

  const [countdown, setCountdown] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  /* ---------- Confetti on successful booking ---------- */
  useEffect(() => {
    const booked = sessionStorage.getItem("justBooked");
    if (booked) {
      setShowConfetti(true);
      sessionStorage.removeItem("justBooked");
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, []);

  /* ---------- Countdown ---------- */
  useEffect(() => {
    if (!booking) return;

    const appointmentTime = new Date(booking?.slotId?.startTime);

    const updateCountdown = () => {
      const now = new Date();
      const diff = appointmentTime - now;

      if (diff <= 0) {
        setCountdown("The appointment has started");
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setCountdown(`${hours} hours and ${minutes} minutes`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60);

    return () => clearInterval(interval);
  }, [booking]);

  if (!booking) return null;

  /* ---------- Date & Time ---------- */
  const appointmentDate = new Date(
    booking?.slotId?.date
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const appointmentTime = new Date(
    booking?.slotId?.startTime
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center py-10">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-xl w-full">
        <div className="mb-6">
          <div className="text-green-600 text-6xl animate-bounce mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">
            Appointment Booked Successfully!
          </h2>
        </div>

        <p className="text-gray-700 mb-1">
          <strong>Date:</strong> {appointmentDate}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Time:</strong> {appointmentTime}
        </p>
        

        <p className="text-gray-500 mb-4">
          You will receive an email with appointment details shortly.
        </p>

        <p className="text-gray-500 mb-4">
          Time remaining: {countdown}
        </p>

        {user?.paidSessions !== undefined && (
          <p className="text-gray-700 mb-6 font-medium">
            Remaining paid sessions: {user?.paidSessions}
          </p>
        )}

        <div className="flex flex-col gap-4">

          <div className="p-4 bg-gray-50 rounded-md text-gray-700 text-left">
            <h5 className="font-bold mb-2">How to join the session:</h5>
            <div className="flex flex-col gap-2 mt-4">
              <p>
                Please prepare any required documents such as ID or medical
                records.
              </p>
              <p>
                You may write down notes or questions before the session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
