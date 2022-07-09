import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { extendTheme } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import { ThemeProvider } from "./components/ThemeContext";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  //make a light mode also
  colors: {
    background: {
      subtleDark: "#141414",
      subtleLight: "#EDF2F7",
      dark: "#1A1A1A",
      light: "#F7FAFC",
    },
    font: {
      light: "#171923",
      lightSubtle: "#4A5568",
      dark: "#ffffff",
      darkSubtle: "#ffffffb3",
    },
    border: {
      lightSubtle: "#A0AEC0",
      darkSubtle: "#262626",
      light: "#EDF2F7",
      dark: "#eaeaea",
    },
    input: {
      border: {
        light: "#CBD5E0",
        dark: "#262626",
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ThemeProvider>
        <BrowserRouter>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ChakraProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
