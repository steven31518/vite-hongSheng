import { Outlet, Link } from "react-router-dom";
import UserNav from "@/components/UserNav";
import { useCheckUser } from "./use check hook";
import { ModeToggle } from "@/components/ModeToggle";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "產品管理",
    href: "/admin/products",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "優惠卷",
    href: "/admin/coupons",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "訂單管理",
    href: "/admin/orders",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "返回賣場",
    href: "/home",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

const DashBoard = () => {
  const { mutate, isPending, isSuccess, data } = useCheckUser();
  const navigate = useNavigate();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hongShengToken="))
    ?.split("=")[1];
  axios.defaults.headers.common["Authorization"] = token;

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    mutate();
  }, [token, navigate, mutate]);

  return (
    <>
      <div className=" h-full flex-1 flex-col  md:flex">
        <div className="flex items-center justify-between space-y-2 border-b-2 border-solid border-border px-4 py-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-3 ">
            <UserNav id={data?.uid as string} />
            <ModeToggle />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-2 border-r-2 border-solid border-border min-h-screen">
            <ul className="grid grid-rows-4 grid-flow-col text-center">
              {components.map((component) => {
                return (
                  <li
                    className="border-b-2 border-solid border-border py-4 px-2 underline-offset-4 hover:underline"
                    key={component.href}
                  >
                    <Link to={component.href}>{component.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-span-10">
            {isPending && <div>loading...</div>}
            {isSuccess && <Outlet />}
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
