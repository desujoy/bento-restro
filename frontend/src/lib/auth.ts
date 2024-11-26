import { api, getAuthToken, setAuthToken } from "./api";

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
}
