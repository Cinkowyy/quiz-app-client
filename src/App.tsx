import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import { ConfigProvider, App as AntAppProvider } from "antd";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import GuestHomePage from "./pages/GuestHomePage/GuestHomePage";
import { AuthContextProvider } from "./AuthContext";

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
      <AntAppProvider>
        <AuthContextProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<GuestHomePage />} />
              <Route path="/sign-up" element={<RegisterPage />} />
              <Route path="/sign-in" element={<LoginPage />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </AntAppProvider>
    </ConfigProvider>
  );
}

export default App;
