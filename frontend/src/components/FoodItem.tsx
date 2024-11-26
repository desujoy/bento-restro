import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { getSession } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { setUserPreference } from "@/lib/api";

export interface FoodItemType {
  id: number;
  name: string;
  category: string;
  price: number;
  likes_count: number;
  liked?: boolean;
}

export default function FoodItem({
  fooditem,
  className,
}: {
  fooditem: FoodItemType;
  className?: string;
}) {
  const [item, setItem] = useState<FoodItemType>(fooditem);
  const mutation = useMutation({
    mutationFn: () => setUserPreference(item.id, !item.liked),
    onSuccess: () => {
      setItem((prev) => ({
        ...prev,
        likes_count: prev.liked ? prev.likes_count - 1 : prev.likes_count + 1,
        liked: !prev.liked,
      }));
    },
  });
  const handleLike = async () => {
    if ((await getSession()) === null) {
      window.location.href = "/auth/login";
    }
    mutation.mutate();
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
        <Button
          className={
            item.liked ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }
          onClick={handleLike}
        >
          {item.liked ? "Dislike" : "Like"}
        </Button>
        <Button className="bg-blue-500 text-white" variant={"link"}>
          <Link to={`/order?id=${item.id}`}>Order</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
