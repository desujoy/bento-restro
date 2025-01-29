import { Routes, Route } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import HomePage from "./pages/Home";
import AuthLayout from "./pages/Auth";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import Navbar from "./components/Navbar";
import OrdersPage from "./pages/Orders";
import Page404 from "./pages/404";
import RecipesPage from "./pages/Recipes";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="order" element={<OrdersPage />} />
          <Route path="recipe" element={<RecipesPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
