import axios from "axios";
import type { AxiosError } from "axios";
import type { newDataType } from "@/components/ProductForm";

type updateDataType = newDataType & {
  id: string;
};

export const getAllProducts = (apiPath: string) => {
  return async () => {
    try {
      const response = await axios.get(`/v2/api/${apiPath}/admin/products/all`);

      return response.data;
    } catch (e) {
      return e as AxiosError;
    }
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
