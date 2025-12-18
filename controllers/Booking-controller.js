import Booking from "../models/Appointment.js";
import TimeSlot from "../models/TimeSlots.js";
import User  from "../models/User.js";
import { Booking_STATUS } from "../utils/constants.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";


export const createBooking = async (req, res) => {
  const { slotId } = req.body;
  const { userId } = req.user;
  
  
  // Atomically book the slot
  const slot = await TimeSlot.findOneAndUpdate(
    { _id: slotId, isBooked: false },
    { isBooked: true },
    { new: true }
  );
  console.log(slot.doctorId.toString());

  if (!slot) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Slot already booked or not found" });
  }
  
  // Now create booking
  const doctorId =
  slot?.doctorId?._id ? slot?.doctorId?._id : slot.doctorId;

if (!doctorId) {
  return res.status(400).json({ message: "Slot has no doctorId" });
}
const booking = await Booking.create({
  patientId: userId,
  slotId,
  doctorId, // <-- ObjectId (preferred)
});


  res.status(StatusCodes.OK).json({
    message: "Booking successful!",
    booking,
  });
};


export const getAllBookings = async (req, res, next) => {

  const { userId } = req.user;

const bookings = await Booking.aggregate([
  {
    $match: { userId: new mongoose.Types.ObjectId(userId) }
  },
  {
    $lookup: {
      from: "timeslots",
      localField: "slotId",
      foreignField: "_id",
      as: "slot"
    }
  },
  { $unwind: "$slot" },
  {
    $lookup: {
      from: "users",  // name of your users collection in MongoDB
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" }, // ensure it's a single object, not an array
  {
    $sort: { "slot.startTime": -1 }
  }
]);

  const totalBookings = await Booking.countDocuments();

  res.status(StatusCodes.OK).json({
    message: "data fetched successfully",
    bookings,
    totalBookings: totalBookings,
  });
};

export const getSingleBooking = async (req, res, next) => {

  const bookingRaw = await Booking.findById(req.params.id);
  const doctor = await User.findById(bookingRaw.doctorId);
console.log(doctor);

  const booking = await Booking.findOne({
    _id: req.params.id,
  }).populate("slotId").populate("doctorId");;
  res
    .status(StatusCodes.OK)
    .json({ message: "data fetched successfully", booking });
};

export const deleteBooking = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.user;

    // 1. جيب الموعد
    const appointment = await Booking.findOne({_id:id,userId:userId}).populate("slotId");
    if (!appointment) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "appointment does not exit" });
    }

    // 2. احسب الفرق بين دلوقتي ووقت الموعد
    const now = new Date();
    const appointmentTime = new Date(appointment?.slotId?.startTime);
    
    
    const diffHours = (appointmentTime - now) / (1000 * 60 * 60); // بالساعة
    
    // 3. تحقق من 24 ساعة
    if (diffHours < 24) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:"Appointments cannot be cancelled less than 24 hours in advance.",
      });
    }

    // 4. حدث الحالة إلى ملغي
    appointment.status = Booking_STATUS.CANCELLED;
    await appointment.save();

      // 5. اجعل الـ slot غير محجوز
  if (appointment.slotId) {
    await TimeSlot.findByIdAndUpdate(appointment.slotId._id, { isBooked: false });
  }

  let updatedUser;
if (appointment.userId) {
   updatedUser= await User.findOneAndUpdate(
    { _id: appointment.userId },          // شرط البحث (المستخدم)
    { $inc: { paidSessions: 1 } },        // تزود جلسة واحدة
    { new: true, runValidators: true }    // يرجّع القيمة الجديدة
  );
}

  const appointmentDate = new Date(appointment?.slotId?.date).toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const appointmentTimeV = new Date(appointment?.slotId?.startTime).toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  emailQueue.add({
    to: updatedUser.email,
    subject: "الفاء حجز الجلسة",
    html: `
      <p>مرحباً ${updatedUser.fullName}،</p>
      <p>تم الغاء حجز موعدك بنجاح!</p>
      <p><strong>التاريخ:</strong> ${appointmentDate}</p>
      <p><strong>الوقت:</strong> ${appointmentTimeV}</p>
      <p>نحن نتطلع لرؤيتك في جلسات اخرى.</p>
    `,
});


    return res.status(StatusCodes.OK).json({ message: "The appointment has been cancelled successfully"});
};

export const EditBooking = async (req, res, next) => {
  const { slotId } = req.body;
  const { userId } = req.user;

  const slot = await TimeSlot.findById(slotId);
  if (!slot) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "there ıs not such a slot" });
  }

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "the booking does not exist" });
  }

  const previousSlotId = booking.slotId;

  // Update booking
  booking.slotId = slotId;
  await booking.save();

  // Free old slot
  await TimeSlot.findByIdAndUpdate(previousSlotId, { isBooked: false });

  // Mark new slot as booked
  await TimeSlot.findByIdAndUpdate(slotId, { isBooked: true });

  // Get user
  const updatedUser = await User.findById(userId);

  const appointmentDate = new Date(slot.date).toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const appointmentTime = new Date(slot.startTime).toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

//  Send confirmation email
   emailQueue.add({
    to: updatedUser.email,
    subject: "تأكيد تغيير ميعاد حجز الجلسة",
    html: `
      <p>مرحباً ${updatedUser.fullName}،</p>
      <p>تم تغيير ميعاد حجز موعدك بنجاح!</p>
      <p><strong>التاريخ:</strong> ${appointmentDate}</p>
      <p><strong>الوقت:</strong> ${appointmentTime}</p>
    `,
  });

// إرسال تذكير قبل ساعة من الموعد
    const reminderTime = new Date(slot.startTime).getTime() - 60 * 60 * 1000;
     emailQueue.add(
      {
        to: updatedUser.email,
        subject: "تذكير بموعد الجلسة",
        html: `
          <p>مرحباً ${updatedUser.fullName}،</p>
          <p>تذكير بموعد جلستك القادمة:</p>
          <p><strong>التاريخ:</strong> ${appointmentDate}</p>
          <p><strong>الوقت:</strong> ${appointmentTime}</p>
        `,
      },
      { delay: reminderTime - Date.now() } // تأخير حتى ساعة قبل الموعد
    );

  res.status(StatusCodes.OK).json({ message: "the booking has been updated successfully", booking });
};
