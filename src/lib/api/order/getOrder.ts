import axios from "axios";
import { z } from "zod";

const getOrder_res_schema = z.object({
  success: z.boolean(),
  order: z.array(
    z.object({
      id: z.string(),
      create_at: z.number(),
      is_paid: z.boolean(),
      message: z.string(),
      products: z.array(
        z.object({
          id: z.string(),
          product_id: z.string(),
          qty: z.coerce.number(),
        })
      ),
      user: z.object({
        address: z.string(),
        email: z.string(),
        name: z.string(),
        tel: z.string(),
      }),
      num: z.number(),
    })
  ),
  pagination: z.object({
    total_pages: z.number(),
    current_page: z.number(),
    has_pre: z.boolean(),
    has_next: z.boolean(),
    category: z.string(),
  }),
  messages: z.array(z.string()),
});

export type get_order_res = z.infer<typeof getOrder_res_schema>;

export function getOrder(apiPath: string) {
  return async () => {
    const response = await axios({
      url: `/v2/api/${apiPath}/orders`,
      method: "GET",
    });
    const validate = getOrder_res_schema.safeParse(response.data);

    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
