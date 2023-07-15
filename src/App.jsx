import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./assets/DashBoard";
import LandingPage from "./assets/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        {/* <Route path="/signin" element={<SignIN />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
