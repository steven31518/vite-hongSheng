import axios from "axios";
import { z } from "zod";
import type { check_order_type } from "@/pages/front/check/CheckOrderForm";

const post_order_res_schema = z.object({
  success: z.boolean(),
  message: z.string(),
  total: z.number(),
  create_at: z.number(),
  orderId: z.string(),
});

export type post_order_res = z.infer<typeof post_order_res_schema>;

export function postOrder(apiPath: string) {
  return async (data: check_order_type) => {
    const response = await axios({
      url: `/v2/api/${apiPath}/order`,
      method: "POST",
      data: data,
    });
    const validate = post_order_res_schema.safeParse(response.data);

    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
