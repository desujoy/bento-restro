import FoodItemList from "@/components/FoodItemList";
import { getCategories } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto h-full p-4">
      <FoodItemList key={0} header="Famous Foods" className="pt-4" />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {Array.isArray(categories) &&
        categories.map((category) => (
          <FoodItemList
            key={category.id}
            header={category.name}
            category={category.id}
            className="pt-12"
          />
        ))}
    </div>
  );
}
