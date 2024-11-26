interface CartItemType {
  id: string;
  name: string;
  quantity: number;
}

export declare global {
  interface Storage {
    getItem(key: "cartitems"): CartItemType[];
    setItem(key: "cartitems", value: CartItemType[]): void;
  }
}
