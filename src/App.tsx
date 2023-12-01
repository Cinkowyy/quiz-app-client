import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<div>Hello</div>}></Route>
    </Routes>
  );
}

export default App;
