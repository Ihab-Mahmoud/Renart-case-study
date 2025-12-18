import React from "react";
import Wrapper from "../assets/wrappers/Help";
import { IoMdMail } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";

const help = () => {
  return (
    <Wrapper>
      <div className="help-container">
        <div className="help-card flex flex-col gap-5">
          <h6 className="text-gray-500 font-semibold">Contact Information</h6>
          <div className="flex flex-col gap-3">
            <div className="flex gap-5">
              <IoMdMail className="text-3xl" />
              <div className="flex flex-col items-start gap-1">
                <span className="font-bold text-gray-600">
                  support@loopbot.co
                </span>
                <span className="text-gray-500 text-xs font-semibold">
                  24/7 Support
                </span>
              </div>
            </div>
            <div className="flex gap-5">
              <FaPhoneVolume className="text-2xl" />
              <div className="flex flex-col items-start gap-1">
                <span className="font-bold text-gray-600">
                  +90 850 255 51 55
                </span>
                <span className="text-gray-500 text-xs font-semibold">
                  24/7 Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default help;
