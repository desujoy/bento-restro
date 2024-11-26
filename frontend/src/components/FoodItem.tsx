import { useState } from "react";
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
import { isAuth } from "@/lib/auth";
import { Link } from "react-router";

export interface FoodItemType {
  id: number;
  name: string;
  category: string;
  price: number;
  likes_count: number;
}

export default function FoodItem({
  fooditem,
  className,
}: {
  fooditem: FoodItemType;
  className?: string;
}) {
  const [item, setItem] = useState<FoodItemType>(fooditem);
  const handleLike = async (id: number) => {
    if (!isAuth()) {
      window.location.href = "/login";
    }
    setAuthToken(localStorage.getItem("token"));
    await api.post("/preferences/", { food_item: id, like: true });
    setItem({ ...item, likes_count: item.likes_count + 1 });
  };

  return (
    <Card key={item.id} className={className}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Price: ${item.price}</p>
        <p>Likes: {item.likes_count}</p>
      </CardContent>
      <CardFooter className="flex flex-row gap-4">
        <Button className="bg-green-500" onClick={() => handleLike(item.id)}>
          Like
        </Button>
        <Button className="bg-blue-500 text-white" variant={"link"}>
          <Link to={`/order?id=${item.id}`}>Order</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
