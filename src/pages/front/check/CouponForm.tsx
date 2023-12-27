import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  code: z.string().min(2).max(50),
});
import { useCouponPost } from "./post coupon hook";

export function CouponForm() {
  const { mutate, isPending } = useCouponPost();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ data: values });
  }

  return (
    <div className="rounded-lg border items-center p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>優惠卷</FormLabel>
                <FormControl>
                  <Input placeholder="輸入優惠卷代碼" type="text" {...field} />
                </FormControl>
                <FormDescription>輸入優惠卷代碼，領取專屬優惠</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            登錄優惠卷
          </Button>
        </form>
      </Form>
    </div>
  );
}
