import axios from "axios";
import type { AxiosError } from "axios";

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
      const response = await axios.post(`/v2/api/${apiPath}/admin/upload`);
      return response.data;
    } catch (e) {
      return e as AxiosError;
    }
  };
};
