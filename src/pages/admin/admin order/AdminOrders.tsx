import { useGetOrderData } from "./get admin order hook";

export function AdminOrder() {
  const { data, isError, isPending, isSuccess, error } = useGetOrderData();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error?.message}</div>;
  }
  return (
    <div>
      {isSuccess &&
        data.orders?.map((order) => {
          return (
            <div key={order.id}>
              <div>Order ID: {order.id}</div>
              <div>
                Order Date: {new Date(order.create_at * 1000).toLocaleString()}
              </div>
            </div>
          );
        })}
    </div>
  );
}
