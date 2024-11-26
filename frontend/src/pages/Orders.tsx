import { getOrders } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function OrdersPage() {
  const {
    data: orders,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto h-full p-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      {isLoading && <p>Loading...</p>}
      {Array.isArray(orders) && orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="flex flex-row gap-4">
              <p>{order.id}</p>
              <p>{order.food_item}</p>
              <p>{order.quantity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found</p>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
