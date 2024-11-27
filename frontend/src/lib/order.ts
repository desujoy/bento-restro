import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { api, getAuthToken, setAuthToken } from "./api";

const queryClient = new QueryClient();

interface CartItemType {
  id: string;
  name: string;
  quantity: number;
  price?: number;
}

interface OrderType {
  id: number;
  items: CartItemType[];
}

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

async function getOrders() {
  setAuthToken(getAuthToken());
  const response = await api.get("/orders/get");
  if (response.status !== 200) {
    throw new Error(response.data);
  }
  return response.data as OrderType[];
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      localStorage.removeItem("cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

async function createOrder(cart: CartItemType[]) {
  setAuthToken(getAuthToken());
  return api.post("/orders/create", {
    cart: cart,
  });
}
