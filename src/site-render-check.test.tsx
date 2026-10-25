/** @jest-environment node */
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, THEME_ID } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./app/store";
import theme from "./app/MaterialTheme";
import App from "./app/App";

test("home page renders", () => {
  expect(() => renderToString(
    <Provider store={store}>
      <ThemeProvider theme={{ [THEME_ID]: theme }}>
        <MemoryRouter><App /></MemoryRouter>
      </ThemeProvider>
    </Provider>
  )).not.toThrow();
});
