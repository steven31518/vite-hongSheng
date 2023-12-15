"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUpdateCoupon } from "./post coupon hook";

const FormSchema = z.object({
  title: z
    .string({
      required_error: "A title is required.",
    })
    .min(1),
  is_enabled: z.number({
    required_error: "A is_enabled is required.",
  }),
  percent: z
    .number({
      required_error: "A percent is required.",
    })
    .min(0)
    .max(100),
  code: z
    .string({
      required_error: "A percent is required.",
    })
    .min(1),
  due_date: z.date({
    required_error: "A date of birth is required.",
  }),
});

export type couponType = z.infer<typeof FormSchema>;

export interface couponWithId extends couponType {
  id: string;
  num: number;
}

export function CouponForm({ coupon }: { coupon?: couponWithId }) {
  const form = useForm<couponType>({
    resolver: zodResolver(FormSchema),
    defaultValues: coupon || {
      title: "",
      is_enabled: 1,
      due_date: new Date(),
      percent: 80,
      code: "testCode",
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });
  const { mutate } = useUpdateCoupon();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData = { ...data, due_date: data.due_date.getTime() };
    mutate({ data: newData });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>優惠活動名稱</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>
                <FormDescription>產品主要名稱</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>折扣比</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder=""
                    type="number"
                    autoComplete="off"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>0 ~ 100%</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>優惠代碼</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>
                <FormDescription>設定使用者輸入的代碼</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="due_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>優惠卷到期日</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>請選擇到期日</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date === new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_enabled"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base">是否啟用</FormLabel>
                <FormControl>
                  <Switch
                    name="is_enabled"
                    checked={!!field.value}
                    onCheckedChange={(e) => field.onChange(+e)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
