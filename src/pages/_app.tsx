import React, { useEffect } from "react";

import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import {
  ThemeProvider as MaterialUIThemeProvider,
  StylesProvider,
} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../../styles/theme";
import { Header } from "../component";
import { CartContextProvider } from "../context/CartContext";

const MyApp = ({ Component, pageProps }): JSX.Element => {
  // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <MaterialUIThemeProvider theme={theme}>
        <StyledComponentsThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </StyledComponentsThemeProvider>
      </MaterialUIThemeProvider>
    </StylesProvider>
  );
};

export default MyApp;
