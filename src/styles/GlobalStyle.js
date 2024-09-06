// GlobalStyle.js

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Fonts } from "./Fonts";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${Fonts}

    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input:focus {
      outline: none;
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }

    body {
      max-width: 430px;
      margin: 0 auto;
      background-color: #f2f2f2;
    }
`;

export default GlobalStyle;
