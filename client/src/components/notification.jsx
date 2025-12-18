import React from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { NotificationElement } from ".";
import Wrapper from "../assets/wrappers/Notification";

const Notification = () => {
  return (
    <Wrapper>
      <div className="not-container">
        <div className="not-header">
          <IoNotificationsSharp className="not-icon" />
          <h3 className="text-black font-semibold font-popping ">Notifications</h3>
        </div>
        <div className="not-content scroll-container">
          <NotificationElement />
          <NotificationElement />
          <NotificationElement />
          <NotificationElement />
          <NotificationElement />
        </div>
      </div>
    </Wrapper>
  );
};

export default Notification;
