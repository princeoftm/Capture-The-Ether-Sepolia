import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import the two pages you want to switch between
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import Resources from "./Pages/Resources";
import Challenges from './Pages/Challenges';
import HelloChallenge from './Challenges/Challenge1/Hellocontract';
import Challenge1 from './Challenges/Challenge2/Challenge2';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route 1: Show the LandingPage at the root URL */}
          <Route path="/" element={<LandingPage />} />

          {/* Route 2: Show the blank Home page at the /home URL */}
          <Route path="/home" element={<Home />} />
          <Route path="/Resources" element={<Resources />} />
          <Route path="/Challenges" element={<Challenges />} />
          <Route path="/Challenge1" element={<HelloChallenge />} />
          <Route path="/Challenge2" element={<Challenge1 />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;