import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext.tsx";
import App from "./App.tsx";
import "normalize.css";
import "./assets/styles/global.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
