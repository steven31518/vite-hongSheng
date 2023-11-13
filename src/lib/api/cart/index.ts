import axios from "axios";
import { AxiosError } from "axios";

export type postCartType = {
  data: {
    product_id: string;
    qty: number;
  };
};

export const postCart = (apiPath: string) => {
  return async (data: postCartType) => {
    try {
      const response = await axios.post(`/v2/api/${apiPath}/cart`, data);
      return response.data;
    } catch (e) {
      return e as AxiosError;
    }
  };
};

export const getCart = (apiPath: string) => {
  return async () => {
    try {
      const response = await axios.get(`/v2/api/${apiPath}/cart`);
      return response.data;
    } catch (e) {
      return e as AxiosError;
    }
  };
};
