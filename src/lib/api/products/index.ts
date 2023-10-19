import axios from "axios";

export const getAllProducts = async (apiPath: string) => {
  return async () => {
    try {
      const response = await axios.get(`/v2/api/${apiPath}/admin/products/all`);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };
};
