import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./assets/controller/DashBoard";
import LandingPage from "./assets/controller/LandingPage";
import Edit from "./assets/controller/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/edit/:noteId" element={<Edit />} />
        {/* <Route path="/signin" element={<SignIN />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
