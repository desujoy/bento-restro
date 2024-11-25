import { useEffect, useState } from "react";
import { api, setAuthToken } from "../utils/api";

interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number;
  likes_count: number;
  dislikes_count: number;
}

export default function FoodItemList() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      const response = await api.get("/food-items/");
      setFoodItems(response.data);
    };
    fetchFoodItems();
  }, []);

  const handleLike = async (id: number) => {
    setAuthToken(localStorage.getItem("token"));
    await api.post("/preferences/", { food_item: id, like: true });
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes_count: item.likes_count + 1 } : item
      )
    );
  };

  const handleDislike = async (id: number) => {
    setAuthToken(localStorage.getItem("token"));
    await api.post("/preferences/", { food_item: id, like: false });
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, dislikes_count: item.dislikes_count + 1 }
          : item
      )
    );
  };

  return (
    <div>
      <h2>Food Items</h2>
      <ul>
        {foodItems.map((item) => (
          <li key={item.id}>
            <h3>
              {item.name} - ${item.price}
            </h3>
            <p>
              Likes: {item.likes_count} | Dislikes: {item.dislikes_count}
            </p>
            <button onClick={() => handleLike(item.id)}>Like</button>
            <button onClick={() => handleDislike(item.id)}>Dislike</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
