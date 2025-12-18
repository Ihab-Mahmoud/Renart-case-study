import styled from "styled-components";

const Wrapper = styled.section`
  /* src/CustomCalendar.css */

  /* Important: Make sure this file is imported AFTER 'react-calendar/dist/Calendar.css' */

  /* Base Calendar Container */
   .cal-container {
    max-width: 100%;
       width: inherit !important;
    background-color: #fff;
    border: none; /* Remove default border */
    border-radius: 1rem; /* Rounded corners for the entire calendar */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Soft shadow */
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    line-height: 1.125em; /* Tailwind leading-tight equivalent */
    padding: 1rem; /* p-4 equivalent */
    flex: 2;
   display: flex;
    flex-direction: column;
  }
  .react-calendar {
    max-width: 100%;
       width: 100% !important;
    background-color: #fff;
    border: none; /* Remove default border */
    // border-radius: 1rem; /* Rounded corners for the entire calendar */
    // box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    //   0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Soft shadow */
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    line-height: 1.125em; /* Tailwind leading-tight equivalent */
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Navigation (Month/Year Header) */
  .react-calendar__navigation {
    display: flex; /* Ensure flexbox for layout */
    justify-content: space-between; /* Space out items */
    align-items: center;
    margin-bottom: 1rem; /* mb-4 equivalent */
    height: auto; /* Allow height to adjust */
  }

  .react-calendar__navigation button {
    min-width: unset; /* Remove min-width from default */
    background: none; /* No background for navigation buttons */
    border: none; /* No border */
    font-size: 1.25rem; /* text-xl */
    font-weight: bold; /* font-bold */
    color: #6b7280; /* text-gray-500 */
    padding: 0 0.5rem; /* px-2 */
    border-radius: 0.375rem; /* rounded-md */
    transition: color 0.2s ease-in-out;
  }

  .react-calendar__navigation button:hover {
    color: #4b5563; /* hover:text-gray-700 */
    background-color: transparent; /* Ensure no background on hover */
  }

  .react-calendar__navigation button:disabled {
    background-color: #f3f4f6;
    color: #d1d5db;
  }

  /* Month/Year Title */
  .react-calendar__navigation__label {
    flex-grow: 1; /* Make it take available space */
    text-align: center;
  }

  .react-calendar__navigation__label span {
    font-size: 1.125rem; /* text-lg */
    font-weight: 600; /* font-semibold */
    color: #1f2937; /* text-gray-800 */
  }

  /* Day Headers (Mon, Tue, Wed...) */
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: 500; /* medium */
    font-size: 0.75rem; /* text-xs */
    color: #6b7280; /* text-gray-500 */
    margin-bottom: 0.5rem; /* mb-2 */
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.25rem 0; /* Adjust padding if needed */
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none; /* Remove underline from abbr */
  }

  /* Day Tiles */
  .react-calendar__tile {
    background: none;
    border: none;
    padding: 0.5rem 0.25rem; /* Adjust padding */
    text-align: center;
    border-radius: 9999px; /* rounded-full */
    height: 2rem; /* h-8 */
    width: 2rem; /* w-8 */
    display: flex; /* For centering content */
    align-items: center;
    justify-content: center;
    font-size: 0.875rem; /* text-sm */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    color: black;
  }

  .react-calendar__tile:enabled:hover {
    background-color: #f3f4f6; /* hover:bg-gray-100 */
    color: #1f2937; /* text-gray-800 */
  }

  /* Specific styling for days not in current month */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #9ca3af; /* text-gray-400 */
    opacity: 0.7; /* Make them slightly faded */
    pointer-events: none; /* Make them not clickable */
  }

  /* Active/Selected Day (like the 28th in your image) */
  .react-calendar__tile--active {
    background-color: #2563eb; /* bg-blue-600 */
    color: #fff; /* text-white */
    font-weight: 600; /* font-semibold */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #2563eb; /* Keep blue on hover/focus */
    color: #fff;
  }

  /* Current Day (if different from selected) - react-calendar applies this by default */
  .react-calendar__tile--now {
    background-color: #eff6ff; /* bg-blue-100 */
    color: #1d4ed8; /* text-blue-800 */
    font-weight: 600; /* font-semibold */
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background-color: #dbeafe; /* Slightly darker blue on hover/focus */
    color: #1d4ed8;
  }

  /* Remove border from navigation buttons and "today" button */
  .react-calendar__tile:enabled:focus {
    outline: none; /* Remove default focus outline if desired */
  }

  .flex-3 {
    flex: 3;
  }

  .flex-2 {
    flex: 2;
  }

  .flex-7 {
    flex: 7;
  }

 @media (max-width: 992px) {
  .lower {
    flex-direction: column;
  }

  .upper {
    flex-direction: column;
  }
}

  }
`;

export default Wrapper;
