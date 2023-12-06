import axios from "axios";
import type { Product } from "@/pages/admin/adminTable/product column";

export type allProducts_res = {
  products: Product[];
  pagination: {
    category: string;
    current_page: number;
    has_next: boolean;
    has_pre: boolean;
    total_pages: number;
  };
};
export type product_res = {
  product: Product;
  success: boolean;
};

export const getAllProductsClient = (apiPath: string) => {
  return async () => {
    try {
      const response = await axios({
        url: `/v2/api/${apiPath}/products/all`,
        method: "GET",
      });

      return response.data as allProducts_res;
    } catch (e) {
      throw new Error(e as string);
    }
  };
};

export const getProductsInPage = (apiPath: string) => {
  return async (page: string, category: string) => {
    try {
      const response = await axios({
        url: `/v2/api/${apiPath}/products?page=${page}&category=${category}`,
        method: "GET",
      });

      return response.data as allProducts_res;
    } catch (e) {
      throw new Error(e as string);
    }
  };
};

export const getProductWithId = (apiPath: string) => {
  return async (id: string) => {
    try {
      const response = await axios<product_res>({
        url: `/v2/api/${apiPath}/product/${id}`,
        method: "GET",
      });
      return response.data;
    } catch (e) {
      throw new Error(e as string);
    }
  };
};
