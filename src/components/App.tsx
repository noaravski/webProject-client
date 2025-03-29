import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import ScrollableCards from "./Home/Home";
import AddPost from "./AddPost/AddPost";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<ScrollableCards />} />
        <Route path="/add" element={<AddPost />} />
      </Routes>
    </Router>
  );
}

export default App;
