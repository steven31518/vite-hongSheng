import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { getAllProducts } from "@/slice/productsSlice";
import { useAppSelector } from "@/store";
import FullscreenLoading from "@/components/FullscreenLoading";
import ProductsTable from "./productsTable";

const AdminProducts = () => {
  const { loading } = useAppSelector((state) => state.productsData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      {loading && <FullscreenLoading />}
      <ProductsTable></ProductsTable>
    </div>
  );
};

export default AdminProducts;
