import { Button } from "@/components/ui/button";
import { useOrders } from "@/lib/order";
import { useState } from "react";

export default function OrdersPage() {
  const [offset, setOffset] = useState(1);
  const { data: orders, error, isLoading } = useOrders(5, offset);

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto h-full p-4">
      <h1 className="text-2xl font-bold">Orders</h1>
      {isLoading && <p>Loading...</p>}
      {Array.isArray(orders) && orders.length > 0 ? (
        <div className="flex flex-col justify-between mt-4">
          <table className="w-full mt-4" border={2}>
            <thead className="bg-gray-100">
              <tr className="text-center">
                <th>Order ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Ordered At</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="text-center">{order.id}</td>
                  <td className="text-center">
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.quantity}x {item.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="text-center">${order.total_price}</td>
                  <td className="text-center">
                    {new Date(order.timestamp).toLocaleString()}
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
              // disabled={orders.length < limit}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <p>No orders found</p>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
