import FoodItemList from "@/components/FoodItemList";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

interface CategoryType {
  id: number;
  name: string;
}

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get("/categories/");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto h-full p-4">
      <FoodItemList header="Famous Foods" className="pt-4"/>
      {categories.map((category) => (
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
