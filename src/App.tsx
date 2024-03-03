import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import { ConfigProvider, App as AntAppProvider } from "antd";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import GuestHomePage from "./pages/GuestHomePage/GuestHomePage";
import { SessionContextProvider } from "./SessionContext";
import ProtectedRoute from "./ProtectedRoute";
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import QuizzesListPage from "./pages/QuizzesList/QuizzesListPage";
import CreateQuizPage from "./pages/CreateQuizPage/CreateQuizPage";
import SolveQuizPage from "./pages/SolveQuizPage/SolveQuizPage";

const themeConfig = {
  components: {
    Layout: {
      headerBg: "#FFF",
      siderBg: "#FFF",
      footerBg: "#FFF",
      headerPadding: "0 2rem",
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <AntAppProvider>
        <SessionContextProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute
                    guestRoute={<GuestHomePage />}
                    userRoute={<UserHomePage />}
                  />
                }
              />
              <Route
                path="/sign-up"
                element={
                  <ProtectedRoute
                    userRoute={<Navigate to="/" />}
                    guestRoute={<RegisterPage />}
                  />
                }
              />
              <Route
                path="/sign-in"
                element={
                  <ProtectedRoute
                    userRoute={<Navigate to="/" />}
                    guestRoute={<LoginPage />}
                  />
                }
              />
              <Route path="/quizzes-list" element={<QuizzesListPage />} />
              <Route
                path="/create-quiz"
                element={
                  <ProtectedRoute
                    userRoute={<CreateQuizPage />}
                    guestRoute={<Navigate to="/sign-in" />}
                  />
                }
              />
              <Route
                path="/quiz/:quizId"
                element={
                  <ProtectedRoute
                    userRoute={<SolveQuizPage />}
                    guestRoute={<SolveQuizPage />}
                  />
                }
              />
            </Route>
          </Routes>
        </SessionContextProvider>
      </AntAppProvider>
    </ConfigProvider>
  );
}

export default App;
