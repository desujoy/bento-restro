import { useOrders } from "@/lib/order";

export default function OrdersPage() {
  const { data: orders, error, isLoading } = useOrders();

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto h-full p-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      {isLoading && <p>Loading...</p>}
      {Array.isArray(orders) && orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="flex flex-row gap-4">
              <p>{order.id}</p>
              {order.items.map((item) => (
                <p key={item.id}>
                  {item.name} x {item.quantity}
                </p>
              ))}
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
