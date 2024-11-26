import { Link, Outlet } from "react-router";
import { Button } from "./ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession, logout } from "@/lib/auth";

export default function Navbar() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
  const { username } = data || {};
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
          {!isLoading && (
            <>
              {username ? (
                <p className="text-xl font-bold flex items-center space-x-4 gap-4">
                  Welcome, {username}{" "}
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      logout();
                      queryClient.invalidateQueries({ queryKey: ["session"] });
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
