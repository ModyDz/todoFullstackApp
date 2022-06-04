import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import "./globals.css";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./pages/UserProfile/UserProfile";
import MyProfile from "./pages/MyProfile/MyProfile";
import UserTodos from "./pages/UserTodos/UserTodos";

export default function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="user/me" element={<MyProfile />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/user/:username/todos" element={<UserTodos />} />
      </Routes>
    </Router>
  );
}
