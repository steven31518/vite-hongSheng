import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { couponWithId } from "../admin coupon/CouponForm";

export const coupon_columns: ColumnDef<couponWithId>[] = [
  {
    accessorKey: "num",
    header: "序號",
  },
  {
    accessorKey: "title",
  },
  {
    accessorKey: "code",
    header: "代碼",
  },
  {
    accessorKey: "percent",
    header: "折扣",
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          到期日
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
   accessorKey:"id",
   header:"ID"
  },
  {
    accessorKey: "is_enabled",
    header: "是否啟用",
  },
 
  //   {
  //     accessorKey: "id",
  //     header: "編輯",
  //     cell: ({ row }) => {
  //       return (
  //         <div className="flex justify-center">
  //           <ProductEditor product={row.original} />
  //         </div>
  //       );
  //     },
  //   },
];
