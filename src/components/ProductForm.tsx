import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Switch } from "@/components/ui/switch";

import { useForm } from "react-hook-form";

// type dataType = {
//   title: string;
//   category: string;
//   origin_price: number;
//   price: number;
//   unit: string;
//   description: string;
//   content: string;
//   is_enabled: number;
//   imageUrl: string;
//   imagesUrl: string[];
// };

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "title must be at least 1 characters.",
    })
    .max(10, {
      message: "title must be less than 10 characters.",
    }),
  category: z
    .string()
    .min(1, {
      message: "category must be at least 1 characters.",
    })
    .max(10, {
      message: "category must be less than 10 characters.",
    }),
  origin_price: z.number().min(1, {
    message: "origin_price must be at least 1 characters.",
  }),
  price: z.number().min(1, {
    message: "origin_price must be at least 1 characters.",
  }),
  unit: z
    .string()
    .min(1, {
      message: "unit must be at least 1 characters.",
    })
    .max(5, {
      message: "unit must be less than 5 characters.",
    }),
  description: z.string(),
  content: z.string(),
  is_enabled: z.number(),
  imageUrl: z.string(),
  imagesUrl: z.array(z.string()),
});

const ProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      origin_price: 0,
      price: 0,
      unit: "",
      description: "",
      content: "",
      is_enabled: 0,
      imageUrl: "",
      imagesUrl: [],
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>產品名稱</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>
                  <FormDescription>產品主要名稱</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-5">
            <FormField
              control={form.control}
              name="is_enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">是否啟用</FormLabel>
                    <FormDescription>產品是否上架</FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-7">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>類別</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>產品的類別</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-5">
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>單位數</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>顯示單位</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="origin_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>原價</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your password"
                      type="number"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>產品原本的價格</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>優惠價</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter your password"
                      type="number"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>產品折扣後的價格</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProductForm;
