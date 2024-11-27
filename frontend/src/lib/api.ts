import { FoodItemType } from "@/components/FoodItem";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const removeAuthToken = () => {
  delete api.defaults.headers.common["Authorization"];
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

interface CategoryType {
  id: number;
  name: string;
}

export async function getFamousFoods() {
  removeAuthToken();
  return (await api.get("/food-items")).data as FoodItemType[];
}

export async function getFoodByCategory(category: number) {
  removeAuthToken();
  return (await api.get(`/food-items?category=${category}`))
    .data as FoodItemType[];
}

export async function getCategories() {
  removeAuthToken();
  return (await api.get("/categories")).data as CategoryType[];
}

export async function getUserPreferences() {
  setAuthToken(getAuthToken());
  const response = await api.get("/preferences");
  if (response.status !== 200) {
    throw new Error(response.data);
  }
  return response.data as {
    id: number;
    user: number;
    food_item: number;
    like: boolean;
  }[];
}

export async function setUserPreference(id: number, like: boolean) {
  setAuthToken(getAuthToken());
  const response = await api.post("/preferences/", {
    food_item: id,
    like,
  });
  if (response.status !== 201) {
    throw new Error(response.data);
  }
  return response.data;
}
