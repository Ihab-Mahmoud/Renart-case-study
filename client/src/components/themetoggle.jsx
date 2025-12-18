/* eslint-disable react/prop-types */
import React from 'react'
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle.js"

const Themetoggle = ({ isDarkTheme, toggleDarkTheme }) => {
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? <BsFillSunFill /> : <BsFillMoonFill />}
    </Wrapper>
  );
};

export default Themetoggle;