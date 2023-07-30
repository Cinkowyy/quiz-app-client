import { Navigate, Route, Routes } from "react-router-dom";
import styled from 'styled-components'
import MainViewCard from "./assets/components/MainViewCard";

function App() {

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<MainViewCard />}>
          <Route index element={<p>Hello App</p>} />
        </Route>
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