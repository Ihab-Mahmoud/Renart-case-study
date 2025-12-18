import { useEffect, useState } from "react";
import { FaAdjust } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { GrFan } from "react-icons/gr";
import { PiFan } from "react-icons/pi";
import { FaNfcDirectional } from "react-icons/fa6";

const Machine = ({ power, setPower, vacuum, setVacuum, light, setLight }) => {
  const [showGif, setShowGif] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [image, setImage] = useState("/images/close.png");
  const [gif, setGif] = useState("/images/close.png");

  useEffect(() => {
    if (light) {
      if (power) {
        setImage("/images/System_CaseOn_LightingOff.png");
      } else {
        setImage("/images/System_CaseOff_LightingOff.png");
      }
    } else {
      if (power) {
        setImage("/images/System_CaseOn_LightingOn.png");
      } else {
        setImage("  /images/System_CaseOff_LightingOn.png");
      }
      setGif("");
    }
    setShowGif(false);
    setShowImage(true);
  }, [light, power]);

  useEffect(() => {
    // Power must be ON for any action
    if (!power) {
      setShowGif(false);
      setShowImage(false);
      return;
    }

    // If vacuum is ON
    if (vacuum) {
      setShowImage(false);
      setGif("/images/open-vacuumed.gif");
      setImage("/images/open-vacuumed.png");
      setShowGif(true);

      const timeout = setTimeout(() => {
        setShowImage(true);
        setShowGif(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }

    // If vacuum is OFF (but power is ON)
    setImage("/images/open.png");
    setShowGif(false);
    setShowImage(true);
  }, [vacuum, power]);

  useEffect(() => {
    // Only run this on power toggle
    setShowImage(false);

    if (power) {
      setGif("/images/open.gif");
      setImage("/images/open.png");
    } else {
      setGif("/images/close.gif");
      setImage("/images/close.png");
    }

    setShowGif(true);

    const timeout = setTimeout(() => {
      setShowGif(false);
      setShowImage(true);
    }, 3000); // Adjust if your GIF is longer

    return () => clearTimeout(timeout);
  }, [power]);

  return (
    <div className="flex flex-col items-center gap-4 flex-grow basis-3/4 relative">
      <button
        className={`transform transition-transform duration-300 flex items-center justify-center  h-10 w-10 rounded-full bg-neutral-300 btn-one left-0 lg:left-32 top-40 lg:top-20 absolute`}
        onClick={() => {
          const newLight = !light;
          setLight(newLight);
        }}
      >
        <div className=" flex items-center justify-center text-gray-600 text-3xl ">
          <HiOutlineLightBulb />
        </div>
      </button>
      <button
        className={`transform transition-transform duration-300 flex items-center justify-center  h-10 w-10 rounded-full bg-neutral-300 btn-two top-40 lg:top-20  right-0 lg:right-32 absolute`}
        onClick={() => {
          const newPower = !power;
          setPower(newPower);
          setVacuum(false);
          setLight(false);
        }}
      >
        <div className=" flex items-center justify-center text-gray-600 text-3xl ">
          <FaNfcDirectional />
        </div>
      </button>
      <button
        className={`transform transition-transform duration-300 flex items-center justify-center  h-10 w-10 rounded-full bg-neutral-300 btn-three right-5  lg:right-32 bottom-5 absolute`}
        onClick={() => {
          if (power) {
            const newVacuumed = !vacuum;
            setVacuum(newVacuumed);
          }
        }}
      >
        <div className=" flex items-center justify-center text-gray-600 text-3xl ">
          <PiFan />
        </div>
      </button>

      <div className="max-w-96 h-5/6 rounded overflow-hidden">
        {showGif && (
          <img
            src={gif}
            alt="Animated"
            className="w-full h-full object-cover"
          />
        )}
        {showImage && (
          <img
            src={image}
            alt="Final Image"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default Machine;
