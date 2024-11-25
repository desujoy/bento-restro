import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import FoodItemList from "./components/FoodItemList";
import OrderForm from "./components/OrderForm";
import { SignUp } from "./components/Auth/SignUp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodItemList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
