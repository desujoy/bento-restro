import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAddToCart, useCartItems, useRemoveFromCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CartButton({ className }: { className?: string }) {
  const { data: cartItems, isLoading } = useCartItems();
  const [open, setOpen] = useState(false);
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    removeFromCart.mutate(e.target.id);
    addToCart.mutate({
      id: e.target.id,
      name: e.target.name,
      quantity: parseInt(e.target.value),
    });
  };

  const handleRemove = (id: string) => {
    removeFromCart.mutate(id);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"link"}
          className={cn("text-white bg-blue-500", className)}
        >
          Cart
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[30vw]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="flex flex-col gap-4 py-4">
            {Array.isArray(cartItems) && cartItems.length != 0 ? (
              cartItems.map((item) => (
                <li key={item.id} className="flex flex-row gap-4">
                  <Label>{item.name}</Label>
                  <Input
                    type="number"
                    id={item.id}
                    name={item.name}
                    value={item.quantity}
                    onChange={handleChange}
                  />
                  <Button
                    variant={"destructive"}
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))
            ) : (
              <p className="text-center py-20">No items in cart</p>
            )}
          </ul>
        )}
        <SheetFooter>
          <Button className="bg-blue-500 text-white" type="submit">
            Place Order
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}