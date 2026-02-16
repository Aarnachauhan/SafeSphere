import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/common/MainLayout";
import Feed from "./pages/feed/Feed";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostDetail from "./pages/post/PostDetail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/profile/Profile";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Feed />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}