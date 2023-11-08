import axios from "axios";
import { AxiosError } from "axios";

export const getProductsInPage = (apiPath: string) => {
  return async (page: string, category: string) => {
    try {
      const response = await axios.get(
        `/v2/api/${apiPath}/products?page=${page}&category=${category}`
      );
      return response.data;
    } catch (e) {
      return (e as AxiosError).response?.data;
    }
  };
};
