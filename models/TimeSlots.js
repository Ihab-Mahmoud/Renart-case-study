import mongoose from "mongoose";

const TimeSlotShcema = new mongoose.Schema(
  {
    date: Date,
    startTime: {
      type: Date,
      unique: true,
    },
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    endTime: {
      type: Date,
      unique: true,
    },
    isBooked: Boolean,
  },
  { timestamps: true }
);


export default mongoose.model("TimeSlots", TimeSlotShcema);