import axios from "axios";
import { z } from "zod";

export type coupon_post_req = {
  data: {
    title: string;
    is_enabled: number;
    percent: number;
    code: string;
    due_date: number;
  };
};
const coupon_post_res_schema = z.object({
  success: z.boolean(),
  message: z.string(),
});

const coupon_get_res_schema = z.object({
  success: z.boolean(),
  coupons: z.array(
    z.object({
      code: z.string(),
      due_date: z.number(),
      id: z.string(),
      is_enabled: z.number(),
      num: z.number(),
      percent: z.number(),
      title: z.string(),
    })
  ),
  pagination: z.object({
    total_pages: z.number(),
    current_page: z.number(),
    has_pre: z.boolean(),
    has_next: z.boolean(),
    category: z.string(),
  }),
});
export type get_coupon_res = z.infer<typeof coupon_get_res_schema>;

export function couponPost(apiPath: string) {
  return async (data: coupon_post_req) => {
    const response = await axios.post<coupon_post_req>(
      `/v2/api/${apiPath}/admin/coupon`,
      data
    );
    const validate = coupon_post_res_schema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

export function couponGet(apiPath: string) {
  return async () => {
    const response = await axios.get<get_coupon_res>(
      `/v2/api/${apiPath}/admin/coupons`
    );
    const validate = coupon_get_res_schema.safeParse(response.data);

    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
