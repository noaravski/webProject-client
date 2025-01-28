import SignUp from "./SignUp";
import Login from "./Login";
import ScrollableCards from "./Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ScrollableCards />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
