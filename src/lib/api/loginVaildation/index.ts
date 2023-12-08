import axios from "axios";
import { z } from "zod";
type SigninParams = {
  username: string;
  password: string;
};

const login_res_schema = z.object({
  success: z.boolean(),
  message: z.string(),
  uid: z.string(),
  token: z.string(),
  expired: z.number(),
});

export type login_res = z.infer<typeof login_res_schema>;

export const signIn = async (params: SigninParams) => {
  const response = await axios<login_res>({
    url: "/v2/admin/signin",
    method: "POST",
    data: params,
  });

  const validate = login_res_schema.safeParse(response.data);
  if (!validate.success) {
    throw new Error(validate.error.message);
  }
  return validate.data;
};

export const logout = async () => {
  try {
    const response = await axios.post("/v2/logout");
    
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
const check_res_schema = z.object({
  success: z.boolean(),
  uid: z.string(),
});

export type check_res = z.infer<typeof check_res_schema>;
export const userCheck = async () => {
  const response = await axios<check_res>({
    url: "/v2/api/user/check",
    method: "POST",
  });
  const validate = check_res_schema.safeParse(response.data);
  if (!validate.success) {
    throw new Error(validate.error.message);
  }
  return validate.data;
};
