import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: auto;
  }

  input, select, button {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    cursor: pointer;
  }

  .container {
    padding: 2rem;
  }

  .user-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    margin: 1rem;
  }

  .user-card img {
    max-width: 100px;
    border-radius: 50%;
  }
  
`;

export default GlobalStyle;
