import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { getAllProducts } from "@/slice/productsSlice";
import { useAppSelector } from "@/store";
import FullscreenLoading from "@/components/FullscreenLoading";
import { columns } from "./productsTable/column";
import { DataTable } from "./productsTable/data-table";
import type { Product } from "./productsTable/column";

const AdminProducts = () => {
  const { loading, products } = useAppSelector((state) => state.productsData);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      {loading && <FullscreenLoading />}
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={products as Product[]} />
      </div>
    </div>
  );
};

export default AdminProducts;
