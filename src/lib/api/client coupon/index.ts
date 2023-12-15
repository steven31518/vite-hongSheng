import { z } from "zod";
import axios from "axios";

const coupon_post_res_schema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    final_total: z.number(),
  }),
});

type coupon_post_res = z.infer<typeof coupon_post_res_schema>;

export function couponPost_client(apiPath: string) {
  return async (
    data: Record<
      "data",
      {
        code: string;
      }
    >
  ) => {
    const response = await axios.post<coupon_post_res>(
      `/v2/api/${apiPath}/coupon`,
      data
    );
    console.log(response.data);
    const validate = coupon_post_res_schema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
