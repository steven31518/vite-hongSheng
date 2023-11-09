import { LuChevronRight, LuChevronLeft } from "react-icons/lu";

import { Button } from "./ui/button";
import { useAppSelector } from "@/store";
import { useAppDispatch } from "@/store";
import { getProductsInPage } from "@/slice/onSalesSlice";
const Pagination = () => {
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.onSalesData
  );
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex justify-center items-center space-x-3 m-5">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => {
          dispatch(
            getProductsInPage({
              page: Number(currentPage - 1).toString(),
              category: "",
            })
          );
        }}
      >
        <LuChevronLeft />
      </Button>
      {new Array(totalPages).fill(0).map((_, i) => (
        <Button
          variant={currentPage === i + 1 ? "default" : "outline"}
          key={i}
          disabled={currentPage === i + 1}
          onClick={() => {
            dispatch(
              getProductsInPage({
                page: Number(i + 1).toString(),
                category: "",
              })
            );
          }}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => {
          dispatch(
            getProductsInPage({
              page: Number(currentPage + 1).toString(),
              category: "",
            })
          );
        }}
      >
        <LuChevronRight />
      </Button>
    </div>
  );
};
export default Pagination;
