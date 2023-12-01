import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<div style={{marginLeft:'1rem'}}>Hello</div>} />
      </Route>
    </Routes>
  );
}

export default App;
