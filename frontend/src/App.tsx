import { Routes, Route } from "react-router";
import OrderForm from "./components/OrderForm";
import HomePage from "./pages/Home";
import AuthLayout from "./pages/Auth";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="order" element={<OrderForm />} />
      </Route>
    </Routes>
  );
}
