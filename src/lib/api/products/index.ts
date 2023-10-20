import axios from "axios";
import type { AxiosError } from "axios";

export const getAllProducts =  (apiPath: string) => {
  return async () => {
    try {
      const response = await axios.get(`/v2/api/${apiPath}/admin/products/all`);
      console.log(response.data);
      return response.data;
    } catch (e) {
      return e as AxiosError;
    }
  };
};
