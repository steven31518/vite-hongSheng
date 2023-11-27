import axios from "axios";
import { z } from "zod";
import { getCart_res } from "./getCart";

type CartItem = getCart_res["data"]["carts"];

const editCart_res_schema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    product_id: z.string(),
    qty: z.number(),
  }),
});

export type editCart_res = z.infer<typeof editCart_res_schema>;

export const editCart = (apiPath: string) => {
  return async (arr: CartItem) => {
    const response = await Promise.all(
      arr.map(async (item) => {
        const res = await axios<editCart_res>({
          url: `/v2/api/${apiPath}/cart/${item.id}`,
          method: "PUT",
          data: {
            data: {
              product_id: item.product_id,
              qty: item.qty,
            },
          },
        });
        return res.data;
      })
    );
    const validate = z.array(editCart_res_schema).safeParse(response);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
};
