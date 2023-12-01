import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext.tsx";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import "normalize.css";
import "./assets/styles/global.scss";

const themeConfig = {
  components: {
    Layout: {
      headerBg: "#fafafa",
      siderBg: "#fafafa",
      footerBg: "#fafafa",
      headerPadding: "0 3rem"
    },
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ConfigProvider theme={themeConfig}>
          <App />
        </ConfigProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
