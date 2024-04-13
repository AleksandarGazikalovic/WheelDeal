import React from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, invertedTheme } from "./themes";

const Theme = ({ dark, children }) => (
  <ThemeProvider theme={dark === true ? invertedTheme : defaultTheme}>
    {children}
  </ThemeProvider>
);

export default Theme;
