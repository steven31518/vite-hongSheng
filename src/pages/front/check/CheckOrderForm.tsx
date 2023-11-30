import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePostOrder } from "./post order hook";
import { useNavigate } from "react-router-dom";
const form_schema = z.object({
  data: z.object({
    user: z.object({
      name: z.string().min(2).max(10),
      email: z.string().email(),
      tel: z.string().min(10).max(10),
      address: z.string().min(10).max(50),
    }),
    message: z.string().min(10).max(100),
  }),
});
export type check_order_type = z.infer<typeof form_schema>;

export function CheckOrderForm() {
  const { mutate: postOrder } = usePostOrder();
  const navigate = useNavigate();
  const form = useForm<check_order_type>({
    resolver: zodResolver(form_schema),
    defaultValues: {
      data: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    },
  });
  async function onSubmit(values: z.infer<typeof form_schema>) {
    postOrder(values);
  }

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="data.user.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>請輸入真實姓名。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data.user.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>僅寄送帳單與通知使用。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data.user.tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>電話</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>請輸入可聯絡的電話號碼。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data.user.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>寄送地址</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data.message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>訂單備註</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Button type="submit">確認訂單</Button>
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => {
                navigate("/home");
              }}
            >
              繼續購物
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
