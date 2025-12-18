import styled from "styled-components";

const Wrapper = styled.article`
  .help-container {
    max-width: 100%;
    width:300px;
    color :black;
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
    overflow: hidden;
    flex: 3;
  }
 
`;

export default Wrapper;
