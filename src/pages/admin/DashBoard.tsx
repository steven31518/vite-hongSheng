import { Outlet, Link } from "react-router-dom";
import UserNav from "@/components/UserNav";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Product List",
    href: "/admin/products",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Coupon management",
    href: "/admin/coupons",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Order management",
    href: "/admin/orders",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

const DashBoard = () => {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col  md:flex">
        <div className="flex items-center justify-between space-y-2 border-b-2 border-solid border-border">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav></UserNav>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-2 border-r-2 border-solid border-border min-h-screen">
            <ul className="grid grid-rows-4 grid-flow-col gap-4 text-center">
              {components.map((component) => {
                return (
                  <Link
                    className="border-b-2 border-solid border-border py-2 "
                    to={component.href}
                  >
                    {component.title}
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="col-span-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
