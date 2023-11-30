import axios from "axios";
import { z } from "zod";

const deleteItem_res_schema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type deleteItem_res = z.infer<typeof deleteItem_res_schema>;

export function deleteItem(apiPath: string) {
  return async (id: string) => {
    const response = await axios<deleteItem_res>({
      url: `/v2/api/${apiPath}/cart/${id}`,
      method: "DELETE",
    });
    const validate = deleteItem_res_schema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
