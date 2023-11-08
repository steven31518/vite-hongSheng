import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { getAllProducts } from "@/slice/productsSlice";
import { useAppSelector } from "@/store";
import FullscreenLoading from "@/components/FullscreenLoading";
import { columns } from "./productsTable/column";
import { DataTable } from "./productsTable/data-table";
import { useToast } from "@/components/ui/use-toast";
import type { Product } from "./productsTable/column";

const AdminProducts = () => {
  const { loading, products } = useAppSelector((state) => state.productsData);
  const { message } = useAppSelector((state) => state.adminActionData);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  
  useEffect(() => {
    if (message.length > 0) {
      message.forEach((msg) => {
        toast(msg);
      });
    }
  }, [message, toast]);
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
