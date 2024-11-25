import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex flex-col bg-blue-300 justify-center item-center w-screen m-auto h-screen p-4">
      <Outlet />
    </div>
  );
}
