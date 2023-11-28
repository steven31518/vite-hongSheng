import axios from "axios";
import { z } from "zod";


const getOrderbyId_res_schema = z.object({
  success: z.boolean(),
  order: z.object({
    id: z.string(),
    create_at: z.number(),
    is_paid: z.boolean(),
    message: z.string(),
    products: z.record(
      z.string(),
      z.object({
        final_total: z.number(),
        total: z.number(),
        id: z.string(),
        product_id: z.string(),
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
        qty: z.coerce.number(),
      })
    ),
    total: z.number(),
    user: z.object({
      address: z.string(),
      email: z.string(),
      name: z.string(),
      tel: z.string(),
    }),
  }),
});

export type getOrderbyId_res = z.infer<typeof getOrderbyId_res_schema>;

export function getOrderbyId(apiPath: string) {
  return async (id: string) => {
    const response = await axios({
      url: `/v2/api/${apiPath}/order/${id}`,
      method: "GET",
    });
    const validate = getOrderbyId_res_schema.safeParse(response.data);
    console.log(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
