import axios from "axios";
import type { AxiosError } from "axios";
import type { newDataType } from "@/pages/admin/admin product/ProductForm";
import { z } from "zod";

interface updateDataType extends newDataType {
  id: string;
}
const get_admin_products_schema = z.object({
  success: z.boolean(),
  products: z.record(
    z.string(),
    z.object({
      category: z.string(),
      content: z.string(),
      description: z.string(),
      id: z.string(),
      is_enabled: z.number(),
      origin_price: z.number(),
      price: z.number(),
      title: z.string(),
      unit: z.string(),
      imageUrl: z.string(),
      imagesUrl: z.array(z.string()),
    })
  ),
});
export type get_admin_products_res = z.infer<typeof get_admin_products_schema>;

export const getAllProducts = (apiPath: string) => {
  return async () => {
    const response = await axios<get_admin_products_res>({
      url: `/v2/api/${apiPath}/admin/products/all`,
      method: "GET",
    });

    const validate = get_admin_products_schema.safeParse(response.data);
    if (!validate.success) throw new Error(validate.error.message);

    return validate.data;
  };
};

export const addPicture = (apiPath: string) => {
  return async (file: File) => {
    const formData = new FormData();
    formData.append("file-to-upload", file);
    try {
      const response = await axios.post(
        `/v2/api/${apiPath}/admin/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return (e as AxiosError).response?.data;
    }
  };
};

export const addProduct = (apiPath: string) => {
  return async (product: newDataType) => {
    try {
      const response = await axios.post(
        `/v2/api/${apiPath}/admin/product`,
        product
      );
      return response.data;
    } catch (e) {
      return (e as AxiosError).response?.data;
    }
  };
};
export const updateProduct = (apiPath: string) => {
  return async (product: updateDataType) => {
    const { id } = product;
    try {
      const response = await axios.put(
        `/v2/api/${apiPath}/admin/product/${id}`,
        product
      );
      return response.data;
    } catch (e) {
      return (e as AxiosError).response?.data;
    }
  };
};

export const deleteProduct = (apiPath: string) => {
  return async (id: string) => {
    try {
      const response = await axios.delete(
        `/v2/api/${apiPath}/admin/product/${id}`
      );
      return response.data;
    } catch (e) {
      return (e as AxiosError).response?.data;
    }
  };
};
