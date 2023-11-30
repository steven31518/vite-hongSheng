import axios from "axios";
import { z } from "zod";
export type postCartType = {
  data: {
    product_id: string;
    qty: number;
  };
};
const addCart_res_schema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    product_id: z.string(),
    qty: z.number(),

    total: z.number(),
    final_total: z.number(),
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
  }),
});
export type cart_res = z.infer<typeof addCart_res_schema>;

export const postCart = (apiPath: string) => {
  return async (data: postCartType) => {
    const response = await axios<cart_res>({
      url: `/v2/api/${apiPath}/cart`,
      method: "POST",
      data: data,
    });

    const validate = addCart_res_schema.safeParse(response.data);

    if (!validate.success) {
      throw new Error(validate.error.message);
    }

    return validate.data;
  };
};


