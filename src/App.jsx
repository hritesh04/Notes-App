import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./assets/DashBoard";
import LandingPage from "./assets/LandingPage";
import Edit from "./assets/controller/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/edit/:noteId" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
