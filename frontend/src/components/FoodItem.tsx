import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUserPreference } from "@/lib/api";
import { useAddToCart } from "@/lib/cart";

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
  liked,
}: {
  fooditem: FoodItemType;
  className?: string;
  liked?: boolean;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => setUserPreference(fooditem.id, !liked),
    onSuccess: () => {
      fooditem.likes_count += liked ? -1 : 1;
      queryClient.invalidateQueries({ queryKey: ["preferences"] });
    },
  });
  const addToCart = useAddToCart();
  const handleLike = async () => {
    if ((await getSession()) === null) {
      window.location.href = "/auth/login";
    }
    mutation.mutate();
  };

  const handleAddToCart = () => {
    addToCart.mutate({
      id: fooditem.id.toString(),
      name: fooditem.name,
      quantity: 1,
    });
  };

  return (
    <Card key={fooditem.id} className={className}>
      <CardHeader>
        <CardTitle>{fooditem.name}</CardTitle>
        <CardDescription>{fooditem.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Price: ${fooditem.price}</p>
        <p>Likes: {fooditem.likes_count}</p>
      </CardContent>
      <CardFooter className="flex flex-row gap-4">
        <Button
          className={
            liked ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }
          onClick={handleLike}
        >
          {liked ? "Dislike" : "Like"}
        </Button>
        <Button
          className="bg-blue-500 text-white"
          variant={"link"}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
