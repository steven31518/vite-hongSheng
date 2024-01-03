import { useGetAdminProducts } from "./get admin products hook";
import DataTable from "../adminTable/DataTable";
import { products_columns } from "../adminTable/product column";
import FullscreenLoading from "@/components/FullscreenLoading";

export default function AdminProducts() {
  const { data, isError, isPending, isSuccess, error } = useGetAdminProducts(
    (data) => Object.values(data.products)
  );
  if (isPending) {
    return <FullscreenLoading />;
  }
  if (isError) {
    return <div>{error?.message}</div>;
  }
  return (
    <div>
      {isSuccess && (
        <div className="container mx-auto py-2">
          <DataTable columns={products_columns} data={data} />
        </div>
      )}
    </div>
  );
}
