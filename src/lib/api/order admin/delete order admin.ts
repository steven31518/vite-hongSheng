import axios from "axios";
import { z } from "zod";

const delete_order_res_schema = z.object({
  success: z.boolean(),
  message: z.string(),
});

type delete_order = z.infer<typeof delete_order_res_schema>;

export function deleteAdminOrder(apiPath: string) {
  return async (id: string) => {
    const response = await axios<delete_order>({
      url: `/v2/api/${apiPath}/admin/order/${id}`,
      method: "DELETE",
    });

    const validate = delete_order_res_schema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
