import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateRecipe, useRecipes } from "@/lib/recipes";
import { recipeSchema } from "@/schema/recipeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RecipesPage() {
  const [offset, setOffset] = useState(1);
  const { data: recipes, isLoading } = useRecipes(5, offset);
  const createRecipe = useCreateRecipe();
  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      file: undefined,
    },
  });

  const handleCreateRecipe = async (values: z.infer<typeof recipeSchema>) => {
    try {
      await createRecipe.mutateAsync({
        recipe: values.name,
        file: values.file,
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto h-full p-4">
      <h1 className="text-2xl font-bold">Recipes</h1>
      <p className="mt-4">
        Upload your recipes here to have a chance to win 3 serving of that dish
        for free!
        <span role="img" aria-label="chef">
          👩‍🍳
        </span>{" "}
        Share your culinary masterpieces and stand a chance to win amazing
        prizes!{" "}
        <span role="img" aria-label="trophy">
          🏆
        </span>
      </p>
      <p className="mt-4 text-sm">Accepted file formats: .pdf, .doc, .docx</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateRecipe)}
          className="space-y-2 my-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-auto">Recipe Name</FormLabel>
                <FormControl>
                  <Input placeholder="Recipe Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-auto">Upload Recipe</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    accept=".pdf,.doc,.docx"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {Array.isArray(recipes) && recipes.length > 0 ? (
            <div className="flex flex-col justify-between mt-4">
              <table className="w-full mt-4" border={2}>
                <thead className="bg-gray-100">
                  <tr className="text-center">
                    <th>Recipe ID</th>
                    <th>Name</th>
                    <th>Recipe Name</th>
                    <th>Uploaded At</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {recipes.map((recipe) => (
                    <tr key={recipe.id}>
                      <td className="text-center">{recipe.id}</td>
                      <td className="text-center">{recipe.recipe}</td>
                      <td className="text-center">{recipe.status}</td>
                      <td className="text-center">
                        {new Date(recipe.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => setOffset(offset - 1)}
                  disabled={offset === 1}
                >
                  Previous
                </Button>
                <span>Page {offset}</span>
                <Button
                  onClick={() => setOffset(offset + 1)}
                  // disabled={recipes.length < limit}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center mt-4">No recipes found</p>
          )}
        </>
      )}
    </div>
  );
}
