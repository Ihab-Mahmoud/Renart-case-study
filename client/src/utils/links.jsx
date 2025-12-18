import { MdAdminPanelSettings } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { LuHardDriveDownload } from "react-icons/lu";
import { PiVideo } from "react-icons/pi";
import { BiCommentError } from "react-icons/bi";
import { GrPowerShutdown } from "react-icons/gr";
import { FaToggleOff } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";
import { GrSun } from "react-icons/gr";
import { GiBottleVapors } from "react-icons/gi";
import { FaPowerOff } from "react-icons/fa";

export const links = [
  { text: "Dashboard", path: ".", icon: <AiOutlineHome /> },
  // { text: "System", path: "system", icon: <LuHardDriveDownload /> },
  // { text: "Booking", path: "booking", icon: <PiVideo /> },
];

export const footerLinks = [
  { text: "Help", path: "help", icon: <BiCommentError /> },
  { text: "Logout", path: "..", icon: <GrPowerShutdown /> },
];
export const controls = [
  { text: "Power", onIcon: <FaPowerOff />, offIcon: <FaPowerOff />,Image:"/public/"  },
  { text: "Vacuum", onIcon: <GiBottleVapors />, offIcon: <GiBottleVapors /> },
  { text: "Light", onIcon: <GrSun />, offIcon: <FaRegMoon /> },
];

