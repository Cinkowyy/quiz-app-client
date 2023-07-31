import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import MainViewCard from "./assets/views/MainViewCard";
import QuizzesList from "./assets/components/QuizzesList";
import LoginView from "./assets/views/LoginView";
import RegisterView from "./assets/views/RegisterView";
import WelcomeView from "./assets/views/WelcomeView";
import ProtectedRoute from "./assets/components/ProtectedRoutes";

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/quizzes" element={<MainViewCard />}>
          <Route index element={<QuizzesList />} />
        </Route>
        <Route path="/" element={<ProtectedRoute type="unauthorized" />}>
          <Route index element={<WelcomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
        </Route>
      </Routes>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
`;
