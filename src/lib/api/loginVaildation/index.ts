import axios from "axios";
import type { AxiosError } from "axios";
type SigninParams = {
  username: string;
  password: string;
};

export const signIn = async (params: SigninParams) => {
  try {
    const response = await axios.post("/v2/admin/signin", params);
    return response.data;
  } catch (e) {
    return (e as AxiosError).response?.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post("/v2/logout");
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const userCheck = async () => {
  try {
    await axios.post("/v2/api/user/check");
  } catch (e) {
    return (e as AxiosError).response?.data as {
      success: boolean;
      message: string;
    };
  }
};
