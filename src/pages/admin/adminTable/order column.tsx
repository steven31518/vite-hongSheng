import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderEditor } from "./OrderEditor";

export type order = {
  message: string;
  id: string;
  create_at: number;
  is_paid: boolean;
  products: Record<
    string,
    {
      id: string;
      product_id: string;
      qty: number;
    }
  >;
  user: {
    address: string;
    email: string;
    name: string;
    tel: string;
  };
  num: number;
};

export const order_columns: ColumnDef<order>[] = [
  {
    accessorKey: "num",
    header: "順序",
  },
  {
    accessorKey: "id",
    header: "訂單編號",
  },
  {
    accessorKey: "user",
    header: "訂購人",
    cell: ({ row }) => {
      const { email }: order["user"] = row.getValue("user");
      return <div>{email}</div>;
    },
  },
  {
    accessorKey: "create_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          訂購日期
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value: number = row.getValue("create_at");
      const date = new Date(value * 1000);
      return (
        <div>
          {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
        </div>
      );
    },
  },
  {
    accessorKey: "is_paid",
    header: "付款狀態",
    cell: ({ row }) => {
      return <div>{row.getValue("is_paid") ? "已付款" : "未付款"}</div>;
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return <OrderEditor id={id}></OrderEditor>;
    },
  },
];
