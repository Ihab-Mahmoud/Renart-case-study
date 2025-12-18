import React from "react";

const notificationElement = () => {
  return (
    <div className="not-element flex relative gap-1 ">
      <div className="not-element-img flex-grow basis-1/6 min-w-10">
        <img className="rounded-full w-3/4 " src="/public/favicon.png" />
      </div>

      <div className="not-element-content flex-grow basis-4/6">
        <h6 className="text-black text-sm">Error Notification title</h6>
        <span className="text-xs font-semibold truncate block w-40">
          this is an error notification Element
        </span>
      </div>
      <div className="not-time flex-grow basis-1/6">
        <span>0h ago</span>
      </div>
    </div>
  );
};

export default notificationElement;
