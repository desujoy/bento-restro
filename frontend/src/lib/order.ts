import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, getAuthToken, setAuthToken } from "./api";

interface CartItemType {
  id: string;
  name: string;
  quantity: number;
  price?: number;
}

interface OrderType {
  id: number;
  items: CartItemType[];
  total_price: number;
  timestamp: string;
}

export const useOrders = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ["orders", limit, offset],
    queryFn: () => getOrders(limit, offset),
  });
};

async function getOrders(limit: number = 5, offset: number = 1) {
  setAuthToken(getAuthToken());
  const response = await api.get(`/orders/get?limit=${limit}&offset=${offset}`);
  if (response.status !== 200) {
    throw new Error(response.data);
  }
  return response.data as OrderType[];
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      console.log("Order placed");
      localStorage.removeItem("cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
};

export async function createOrder(cart: CartItemType[]) {
  setAuthToken(getAuthToken());
  return api.post("/orders/create", {
    cart: cart,
  });
}
