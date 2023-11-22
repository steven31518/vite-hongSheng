import axios from "axios";
import { productType } from "@/components/ProductForm";

interface productWithIdType extends productType {
  id: string;
}

export type allProducts_res = {
  products: productWithIdType[];
  pagination: {
    category: string;
    current_page: number;
    has_next: boolean;
    has_pre: boolean;
    total_pages: number;
  };
};
export type product_res = {
  product: productWithIdType;
  success: boolean;
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
