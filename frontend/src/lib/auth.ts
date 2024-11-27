import { QueryClient, useQuery } from "@tanstack/react-query";
import { api, getAuthToken, removeAuthToken, setAuthToken } from "./api";

const queryClient = new QueryClient();

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
}

export async function getSession() {
  if (getAuthToken() == null) {
    return null;
  }
  setAuthToken(getAuthToken());
  return (await api.get("/session/")).data as {
    username: string;
    email: string;
  };
}

export async function register(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  removeAuthToken();
  await api.post("/signup/", {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });
}

export async function login(username: string, password: string) {
  const response = await api.post("/token/", {
    username,
    password,
  });
  const { access, refresh } = response.data;
  localStorage.setItem("token", access);
  localStorage.setItem("refresh", refresh);
  setAuthToken(access);
}

export async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  queryClient.invalidateQueries({ queryKey: ["session"] });
  queryClient.invalidateQueries({ queryKey: ["preferencesf"] });
  window.location.href = "/";
}
