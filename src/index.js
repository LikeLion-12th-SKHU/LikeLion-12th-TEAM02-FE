import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const clientId = process.env.REACT_APP_G_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
