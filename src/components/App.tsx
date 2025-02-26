import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import EditProfile from "./EditProfile/EditProfile";
import ScrollableCards from "./Home/Home";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/" element={<ScrollableCards />} />
      </Routes>
    </Router>
  );
}

export default App;
