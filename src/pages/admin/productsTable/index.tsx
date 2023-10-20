import type { Product } from "./column";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { useAppSelector } from "@/store";

const ProductsTable = () => {
  const { products } = useAppSelector((state) => state.productsData);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={products as Product[]} />
    </div>
  );
};

export default ProductsTable;
