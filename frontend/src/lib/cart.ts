import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface CartItemType {
  id: string;
  name: string;
  quantity: number;
}

export const useCartItems = () => {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
  });
};

const fetchCartItems = async () => {
  const items = localStorage.getItem("cartItems");
  return items ? (JSON.parse(items) as CartItemType[]) : [];
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });
};

const addToCart = async (item: CartItemType) => {
  if (item.quantity <= 0) {
    item.quantity = 1;
  }
  const existingItems = localStorage.getItem("cartItems");
  if (existingItems) {
    const items = JSON.parse(existingItems);
    if (items.some((i: CartItemType) => i.id === item.id)) {
      const newItems = items.map((i: CartItemType) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      localStorage.setItem("cartItems", JSON.stringify(newItems));
    } else {
      const newItems = [...items, item];
      localStorage.setItem("cartItems", JSON.stringify(newItems));
    }
  } else {
    localStorage.setItem("cartItems", JSON.stringify([item]));
  }
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });
};

const removeFromCart = async (itemId: string) => {
  const existingItems = localStorage.getItem("cartItems");
  if (existingItems) {
    const items = JSON.parse(existingItems);
    const newItems = items.filter((item: CartItemType) => item.id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  }
};
