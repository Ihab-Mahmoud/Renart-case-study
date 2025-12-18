import styled from "styled-components";

const Wrapper = styled.article`
  .overview-container {
    max-width: 100%;
    background-color: #fff;
    border: none;
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    line-height: 1.125em;
    padding: 1.5rem;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    max-height: 350px;
    width:100%;
    height:400px;
  }
  .symbol {
    border-radius: 10px;
    width: 1.5rem;
    height: 1.5rem;
  }

  //   /* For WebKit browsers (Chrome, Safari, Edge, Opera) */

  .scroll-container::-webkit-scrollbar {
    width: 5px; /* For vertical scrollbar */
  }

  //   .scroll-container::-webkit-scrollbar-thumb {
  //     background-color: #ccc;
  //     border-radius: 4px; /* Optional: adds rounded corners to the thumb */
  //   }

  //   .scroll-container::-webkit-scrollbar-track {
  //     background: transparent; /* Makes the track transparent */
  //   }

  /* Hide scrollbar arrows */
  .scroll-container::-webkit-scrollbar-button {
    display: none;
  }

  .scroll-container {
    max-height: 220px;
  }
`;

export default Wrapper;
