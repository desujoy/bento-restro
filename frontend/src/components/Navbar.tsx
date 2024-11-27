import { Link, Outlet } from "react-router";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { logout, useSession } from "@/lib/auth";
import { CartButton } from "./CartButton";
import { Toaster } from "./ui/toaster";

export default function Navbar() {
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useSession();
  const { username } = data || {};
  return (
    <>
      <nav className="flex justify-between items-center bg-slate-900 text-white p-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">
            Home
          </Link>
          {username && (
            <>
              <Link to="/order" className="text-xl font-bold">
                Your Orders
              </Link>
              <Link to="/recipe" className="text-xl font-bold">
                Your Recipes
              </Link>
            </>
          )}
        </div>
        <div>
          {!isLoading && (
            <>
              {!isError && username ? (
                <p className="text-xl font-bold flex items-center gap-4">
                  Welcome, {username}
                  <CartButton className="text-xl font-bold bg-blue-500 text-white" />
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
                  <CartButton className="text-xl font-bold bg-blue-500 text-white" />
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
      <Toaster />
    </>
  );
}
