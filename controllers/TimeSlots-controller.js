import { StatusCodes } from "http-status-codes";
import TimeSlot from "../models/TimeSlots.js";


export const getAllSlots = async (req, res, next) => {
  const {date} = req.query

  let {startDate,endDate}=req.query
  const today = new Date();
  
  today.setHours(0, 0, 0, 0);

  let queryObject = {
    startTime: { $gte: today }   // filter slots starting today and later
  };

  if (startDate && endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // If the same day, adjust end to the end of the day
  if (startDate === endDate) {
    end.setHours(23, 59, 59, 999); // include the whole day
    start.setHours(0, 0, 0, 0);     // start of the day
  }

  queryObject = {
    startTime: { $gte: start, $lte: end }
  };
}
  if (date) {
    const start = new Date(date);
    const end = new Date(date);

      end.setHours(23, 59, 59, 999); // include the whole day
      start.setHours(0, 0, 0, 0);     // start of the day

    queryObject = {
      startTime: { $gte: start, $lte: end }
    };
  }
  // setup pagination

const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 5;
const skip = (page - 1) * limit;

const slots = await TimeSlot.find(queryObject)
  .sort({ startTime: 1 }) 
  .skip(skip)
  .limit(limit);
  

  const totalSlots = await TimeSlot.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalSlots / limit);

  res.status(StatusCodes.OK).json({
    message: "data fetched successfully",
    slots,
    totalSlots: totalSlots,
    currentPagee: page,
    numOfPages: numOfPages
  });
};

export const createSlot = async (req, res, next) => {
  const { date, startTime, endTime, intervalMinutes = 30,doctorId } = req.body;
  
  // Generate slots
  const slots = [];
  let current = new Date(`${date}T${startTime}`);
  let end = new Date(`${date}T${endTime}`);



  while (current.getTime() + intervalMinutes * 120000 <= end) {
    const slotStart = new Date(current);
    const slotEnd = new Date(current.getTime() + intervalMinutes * 120000);
    const overlapping = await TimeSlot.findOne({
      doctorId,
      startTime: { $lt: slotEnd },
      endTime: { $gt: slotStart },
    });

    if (overlapping) {
      console.log("64532");
      
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Overlapping slot exists!" });
    }
    slots.push({
      date,
      startTime: slotStart,
      endTime: slotEnd,
      isBooked: false,
      doctorId:doctorId
    });

    current = slotEnd;
  }
  console.log(slots);
  
  const savedSlots = await TimeSlot.insertMany(slots);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Slots created!", savedSlots });
};

export const EditSlot = async (req, res, next) => {
const { date, startTime, endTime, intervalMinutes = 30 } = req.body;

  let dateOnly;
  if (!date.includes("T")) {
    dateOnly = date; // already YYYY-MM-DD
  } else {
    dateOnly = new Date(date).toISOString().split("T")[0];
  }

  // Generate slots
  const slotStart = new Date(`${dateOnly}T${startTime}`);
  const slotEnd = new Date(slotStart.getTime() + intervalMinutes * 120000);


  // overlapping check
  const overlapping = await TimeSlot.findOne({
      _id: { $ne: req.params.id }, // exclude current slot
      startTime: { $lt: slotEnd },
      endTime: { $gt: slotStart },
      });

    if (overlapping) {
      return res
        .status(StatusCodes.BAD_REQUEST)  
        .json({ msg: "Overlapping slot exists!" });
    }
    req.body.endTime=slotEnd
    req.body.startTime=slotStart
    const slot = await TimeSlot.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true, runValidators: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "data updated successfully", slot });
};

export const deleteSlot = async (req, res, next) => {
  const slot = await TimeSlot.deleteOne({ _id: req.params.id });
  res
    .status(StatusCodes.OK)
    .json({ message: "slot deleted successfully", slot });
};
