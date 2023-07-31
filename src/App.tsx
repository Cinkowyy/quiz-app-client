import { Navigate, Route, Routes } from "react-router-dom";
import styled from 'styled-components'
import MainViewCard from "./assets/views/MainViewCard";
import QuizzesList from "./assets/components/QuizzesList";
import LoginView from "./assets/views/LoginView";
import RegisterView from "./assets/views/RegisterView";

function App() {

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<MainViewCard />}>
          <Route index element={<Navigate to="/quizzes" />} />
          <Route path="/quizzes" element={<QuizzesList />} />
        </Route>
        <Route path="/login" element={<LoginView />}/>
        <Route path="/register" element={<RegisterView />}/>
      </Routes>
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #EAEAEA;
  display: flex;
  align-items: center;
  justify-content: center;
`;