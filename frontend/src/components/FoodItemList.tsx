import { cn } from "@/lib/utils";
import FoodItem from "./FoodItem";
import {
  getFamousFoods,
  getFoodByCategory,
  getUserPreferences,
} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function FoodItemList({
  header,
  category,
  className,
}: {
  header: string;
  category?: number;
  className?: string;
}) {
  const {
    data: foodItems,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["foods", category],
    queryFn: () => (category ? getFoodByCategory(category) : getFamousFoods()),
  });

  const { data: foodPreference } = useQuery({
    queryKey: ["preferences"],
    queryFn: getUserPreferences,
  });

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-2xl font-bold">{header}</h2>
      <ul className="flex flex-row gap-4 overflow-x-scroll no-scrollbar">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {Array.isArray(foodItems) &&
          foodItems.map((item) => (
            <FoodItem
              key={item.id}
              fooditem={item}
              liked={
                foodPreference?.find((pref) => pref.food_item === item.id)?.like
              }
            />
          ))}
      </ul>
    </div>
  );
}
