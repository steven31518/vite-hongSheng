import axios from "axios";
import { z } from "zod";

const getCart_res_schema = z.object({
  data: z.object({
    carts: z.array(
      z.object({
        coupon: z.object({
          code: z.string(),
          due_date: z.number(),
          id: z.string(),
          is_enabled: z.number(),
          percent: z.number(),
          title: z.string(),
        }).or(z.undefined()),
        final_total: z.number(),
        id: z.string(),
        product: z.object({
          category: z.string(),
          content: z.string(),
          description: z.string(),
          id: z.string(),
          imageUrl: z.string(),
          imagesUrl: z.array(z.string()),
          is_enabled: z.number(),
          origin_price: z.number(),
          price: z.number(),
          title: z.string(),
          unit: z.string(),
        }),
        product_id: z.string(),
        qty: z.number(),
        total: z.number(),
      })
    ),
    total: z.number(),
    final_total: z.number(),
  }),
  success: z.boolean(),
  messages: z.array(z.string()),
});

export type getCart_res = z.infer<typeof getCart_res_schema>;

export const getCart = (apiPath: string) => {
  return async () => {
    const response = await axios<getCart_res>({
      url: `/v2/api/${apiPath}/cart`,
      method: "GET",
    });
    const validate = getCart_res_schema.safeParse(response.data);
    if (!validate.success) {
      console.log(validate.error.message);
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
};
