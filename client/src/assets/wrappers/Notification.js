import styled from "styled-components";

const Wrapper = styled.article`
  .not-container {
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
    flex-direction: column;
    gap: 30px;
    overflow: overlay;
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

  //   /* For Firefox */
  //   .scroll-container {
  //     scrollbar-width: thin; /* 'auto' | 'thin' | 'none' */
  //     scrollbar-color: #ccc transparent; /* thumb-color track-color */
  //     /* If you want to completely hide scrollbar but keep functionality (less common for custom styling) */
  //     /* -ms-overflow-style: none; /* For Internet Explorer and Edge Legacy */
  //     /* overflow: -moz-scrollbars-none; /* For older Firefox */
  //   }

  .scroll-container {
    max-height: 236px;
  }
  .not-header {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .not-container h3 {
    font-size: 1.2rem;
  }

  .not-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: auto;
  }

  .not-content h6 {
    font-weight: 500;
  }
 
  .not-element {
    display: flex;
    justify-content: space-between;
  }

  .not-element-content {
    display: flex;
    flex-direction: column;
  }
  .not-element-content span {
    color: #0000ff9c;
  }

  .not-time {
    font-size: 0.8rem;
    color: #00000047;
    font-weight: 700;
    display: ruby-text;
  }
  .not-time span {
    display: ruby-text;
  }

  .not-icon {
    font-size: 2rem;
    color: black;
  }
`;

export default Wrapper;
