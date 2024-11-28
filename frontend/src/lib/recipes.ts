import { useMutation, useQuery } from "@tanstack/react-query";
import { api, getAuthToken, setAuthToken } from "./api";

export interface RecipeType {
  id: number;
  recipe: string;
  status: string;
  timestamp: string;
}

export function useRecipes(limit: number, offset: number) {
  return useQuery({
    queryKey: ["recipes", limit, offset],
    queryFn: () => fetchRecipes(limit, offset),
  });
}

async function fetchRecipes(limit: number = 5, offset: number = 1) {
  setAuthToken(getAuthToken());
  const response = await api.get(`/recipes?limit=${limit}&offset=${offset}`);
  if (response.status !== 200) {
    throw new Error(response.data);
  }
  return response.data as RecipeType[];
}

export function useCreateRecipe() {
  return useMutation({
    mutationFn: ({ recipe, file }: { recipe: string; file: File }) =>
      createRecipe({
        name: recipe,
        file: file,
      }),
    onSuccess: () => {
      console.log("Recipe created");
    },
  });
}

async function createRecipe(recipe: { name: string; file: File }) {
  const formData = new FormData();
  formData.append("recipe", recipe.name);
  if (recipe.file) {
    formData.append("file", recipe.file);
  }
  setAuthToken(getAuthToken());
  return api.post("/recipes/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
