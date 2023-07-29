import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./assets/Components/DashBoard";
import LandingPage from "./assets/Components/LandingPage";
import Edit from "./assets/Components/Edit";
import Card from "./assets/Components/Card";
import Feature from "./assets/Components/Feature";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/edit/:noteId" element={<Edit />} />
        <Route path="/card" element={<Card />} />
        <Route path="/features" element={<Feature />} />
      </Routes>
    </Router>
  );
}

export default App;
