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
import ProductPicDropzone from "./ProductPicDropzone";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "./ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  const { reset } = form;
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            <ScrollArea className="h-[220px] w-full rounded-lg border-2 p-4">
              <h1>已上傳圖片</h1>
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="rounded-md border h-[100px]">123</div>
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            <ProductPicDropzone />
          </div>
          <div>
            <div className="col-span-12 w-[356px] h-[220px] rounded-lg border-2"></div>
            <div className="col-span-12">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>產品描述</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="description about product"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>產品內文</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="content about product"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
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
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="is_enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-between ">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">是否啟用</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={(e) => field.onChange(+e)}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-8">
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
            <div className="col-span-4">
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
                        {...field}
                        placeholder=""
                        type="number"
                        autoComplete="off"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
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
                        {...field}
                        placeholder=""
                        type="number"
                        autoComplete="off"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>產品折扣後的價格</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-start-6 col-span-6 flex justify-end items-center gap-4">
              <Button
                type="submit"
                variant={"outline"}
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </Button>
              <Button type="submit" className="">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
