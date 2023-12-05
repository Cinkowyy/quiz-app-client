import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import { ConfigProvider } from "antd";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";

const themeConfig = {
  components: {
    Layout: {
      headerBg: "#FFF",
      siderBg: "#FFF",
      footerBg: "#FFF",
      headerPadding: "0 3rem",
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            index
            element={<div style={{ marginLeft: "1rem" }}>Hello</div>}
          />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
