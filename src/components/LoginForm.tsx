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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store";
import { login } from "@/slice/loginSlice";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  username: z
    .string()
    .email({
      message: "Please enter correct format of email.",
    })
    .max(50, {
      message: "Username must be less than 50 characters.",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(50, {
      message: "Password must less than 50 characters.",
    }),
});

type typeProps = {
  className?: string;
};

const LoginForm = ({ className }: typeProps) => {
  const dispatch = useAppDispatch();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    dispatch(login(values));
  }
  return (
    <>
      <Card className={cn("w-[380px]", className)}>
        <CardHeader>
          <CardTitle>Hong Sheng i-Manager</CardTitle>
          <CardDescription>manage your product in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter your email"
                        type="email"
                        {...field}
                        autoComplete="on"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter your password"
                        type="password"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-around">
          <Button variant={"link"}>Back to store</Button>
          <Button variant={"link"}>Report problem</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginForm;
