import { useGetOrderData } from "./get admin order hook";
import { DataTable } from "../adminTable/DataTable";
import { order_columns } from "../adminTable/order column";

// import type { order } from "../adminTable/order column";
export function AdminOrder() {
  const { data, isError, isPending, isSuccess, error } = useGetOrderData(
    (data) => data.orders
  );
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error?.message}</div>;
  }
  return (
    <div>
      {isSuccess && (
        <div className="container mx-auto py-3">
          <DataTable columns={order_columns} data={data} />
        </div>
      )}
    </div>
  );
}
