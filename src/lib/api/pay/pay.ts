import axios from "axios";
import { z } from "zod";

// const pay_res_schema = z.object({
//   success: z.boolean(),
//   order: z.object({
//     create_at: z.number(),
//     id: z.string(),
//     is_paid: z.boolean(),
//     message: z.string(),
//     products: z.array(
//       z.object({
//         id: z.string(),
//         product_id: z.string(),
//         qty: z.number(),
//       })
//     ),
//     total: z.number(),
//     user: z.object({
//       address: z.string(),
//       email: z.string(),
//       name: z.string(),
//       tel: z.string(),
//     }),
//   }),
// });
const pay_res_schema = z.object({ success: z.boolean(), message: z.string() });

export type pay_res = z.infer<typeof pay_res_schema>;

export function pay(apiPath: string) {
  return async (id: string) => {
    const response = await axios({
      url: `/v2/api/${apiPath}/pay/${id}`,
      method: "POST",
    });
    const validate = pay_res_schema.safeParse(response.data);
    console.log(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
