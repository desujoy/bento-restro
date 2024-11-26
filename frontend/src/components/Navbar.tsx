import { api, setAuthToken } from "@/lib/api";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isLoding, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
      api
        .get("/session/")
        .then((response) => {
          setUsername(response.data.username);
          setIsAuth(true);
        })
        .catch((error) => {
          console.error(error);
          localStorage.removeItem("token");
        });
    }
    setIsLoading(false);
  }, []);
  return (
    <>
      <nav className="flex justify-between items-center bg-slate-900 text-white p-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">
            Home
          </Link>
          <Link to="/order" className="text-xl font-bold">
            Order
          </Link>
        </div>
        <div>
          {!isLoding && (
            <>
              {isAuth ? (
                <p className="text-xl font-bold flex items-center space-x-4 gap-4">
                  Welcome, {username}{" "}
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      localStorage.removeItem("token");
                      setIsAuth(false);
                    }}
                    className="text-white"
                  >
                    Logout
                  </Button>
                </p>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    variant={"link"}
                    className="text-xl font-bold bg-blue-500 text-white"
                  >
                    <Link to="/auth/login" className="text-xl font-bold">
                      Login
                    </Link>
                  </Button>
                  <Button
                    variant={"link"}
                    className="text-xl font-bold bg-blue-500 text-white"
                  >
                    <Link to="/auth/signup" className="text-xl font-bold">
                      SignUp
                    </Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
}
