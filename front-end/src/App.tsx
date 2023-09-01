import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./assets/Components/DashBoard";
import LandingPage from "./assets/Components/LandingPage";
import Edit from "./assets/Components/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage logedIN={false} />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/edit/:noteId" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
