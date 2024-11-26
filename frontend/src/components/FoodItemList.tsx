import { cn } from "@/lib/utils";
import FoodItem, { FoodItemType } from "./FoodItem";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function FoodItemList({
  header,
  category,
  className,
}: {
  header: string;
  category?: number;
  className?: string;
}) {
  const [foodItems, setFoodItems] = useState<FoodItemType[]>([]);
  useEffect(() => {
    const fetchFoodItems = async () => {
      if (category) {
        const response = await api.get(`/food-items/?category=${category}`);
        setFoodItems(response.data);
        return;
      }
      const response = await api.get("/food-items/");
      setFoodItems(response.data);
    };
    fetchFoodItems();
  }, [category]);
  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-2xl font-bold">{header}</h2>
      <ul className="flex flex-row gap-4 overflow-x-scroll no-scrollbar">
        {foodItems.map((item) => (
          <FoodItem key={item.id} fooditem={item} />
        ))}
      </ul>
    </div>
  );
}
