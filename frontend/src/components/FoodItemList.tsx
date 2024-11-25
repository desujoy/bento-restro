import { useEffect, useState } from "react";
import { api, setAuthToken } from "../lib/api";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { isAuth } from "@/lib/auth";

interface FoodItem {
  id: number;
  name: string;
  category: string;
  price: number;
  likes_count: number;
}

export default function FoodItemList({ className }: { className?: string }) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      const response = await api.get("/food-items/");
      setFoodItems(response.data);
    };
    fetchFoodItems();
  }, []);

  const handleLike = async (id: number) => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
    setAuthToken(localStorage.getItem("token"));
    await api.post("/preferences/", { food_item: id, like: true });
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes_count: item.likes_count + 1 } : item
      )
    );
  };

  const handleDislike = async (id: number) => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
    setAuthToken(localStorage.getItem("token"));
    await api.put("/preferences/", { food_item: id, like: false });
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes_count: item.likes_count - 1 } : item
      )
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-2xl font-bold">Food Items</h2>
      <ul className="flex flex-row flex-wrap gap-4">
        {foodItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Price: ${item.price}</p>
              <p>Likes: {item.likes_count}</p>
            </CardContent>
            <CardFooter className="flex flex-row gap-4">
              <Button
                className="bg-green-500"
                onClick={() => handleLike(item.id)}
              >
                Like
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => handleDislike(item.id)}
              >
                Dislike
              </Button>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
}
