import type { ColumnDef } from "@tanstack/react-table";

export type Product = {
  [key: number]: {
    category: string;
    content: string;
    description: string;
    id: string;
    is_enabled: number;
    num: number;
    origin_price: number;
    price: number;
    title: string;
    unit: string;
    imageUrl: string;
    imagesUrl: string[];
  };
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "category",
    header: "category",
  },
  {
    accessorKey: "content",
    header: "content",
  },
  {
    accessorKey: "image",
    header: "image",
  },
  {
    accessorKey: "content",
    header: "content",
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    accessorKey: "origin_price",
    header: "origin_price",
  },

];
