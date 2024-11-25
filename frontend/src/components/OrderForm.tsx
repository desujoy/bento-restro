import React, { useState } from "react";
import { api, setAuthToken } from "../lib/api";

export default function OrderForm() {
  const [item, setItem] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthToken(localStorage.getItem("token"));
    await api.post("/orders/", { item, quantity });
    alert("Order placed successfully!");
  };

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={handleOrder}>
        <input
          type="number"
          placeholder="Enter items (JSON format)"
          value={item}
          onChange={(e) => setItem(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Enter items (JSON format)"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}
