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
import ProductPicDropzone from "@/components/ProductPicDropzone";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/store";
import { useAppDispatch } from "@/store";
import { setimgsUrl } from "@/slice/productsSlice";
import { useGetAdminProducts } from "@/pages/admin/admin product/get admin products hook";
import { useUpdateAdminProduct } from "./put admin product hook";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Product } from "@/pages/admin/adminTable/product column";
import { useEffect } from "react";

type newProductType = Omit<Product, "id">;

export type newDataType = Record<"data", newProductType>;

type formStatus = {
  productId?: string;
  handleClose?: () => void;
};
const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "title must be at least 1 characters.",
    })
    .max(20, {
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

const ProductForm = ({ productId }: formStatus) => {
  const { mutate, isPending: editIsPending } = useUpdateAdminProduct();
  const { data } = useGetAdminProducts((data) =>
    Object.values(data.products).find((product) => product.id === productId)
  );
  const { imgsUrl } = useAppSelector((state) => state.productsData);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
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
    resetOptions: {
      keepDefaultValues: true,
    },
  });
  const { reset } = form;
  const dispatch = useAppDispatch();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submitData: newProductType = {
      ...values,
      imagesUrl: [...imgsUrl, ...(data ? data.imagesUrl : [])],
    };
    mutate({ data: submitData, id: productId });
  }
  useEffect(() => {
    dispatch(setimgsUrl([]));
  }, [dispatch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-3">
            <ScrollArea className="h-full w-full rounded-lg border-2 p-4">
              <div className="grid grid-cols-2 gap-4 py-2">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>已上傳圖片</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {imgsUrl
                            .concat(data ? data.imagesUrl : [])
                            .map((url, i) => {
                              return (
                                <div
                                  className="flex space-x-2 rounded-md border h-[100px] p-2"
                                  key={url}
                                >
                                  <RadioGroupItem value={url} id={`pic${i}`} />
                                  <img
                                    src={url}
                                    alt="請上傳圖片"
                                    className="object-cover h-full w-full"
                                  />
                                </div>
                              );
                            })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
            <ProductPicDropzone />
          </div>
          <div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>產品描述</FormLabel>
                  <FormControl>
                    <div className="col-span-12 w-full h-[360px] lg:h-[220px] rounded-lg border-2">
                      <img
                        src={field.value}
                        alt="產品主圖"
                        className="object-contain h-full w-full rounded-lg"
                      />
                    </div>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormItem className="flex flex-col items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">是否啟用</FormLabel>
                    </div>
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
                type="button"
                variant={"outline"}
                disabled={editIsPending}
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </Button>
              <Button type="submit" className="" disabled={editIsPending}>
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
