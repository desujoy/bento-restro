export default function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
}
