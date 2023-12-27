import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";

const components: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    href: "",
    title: "所有商品",
    description: "Visually or semantically separates content.",
  },
  {
    href: "Tool",
    title: "工具",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    href: "paper",
    title: "文件",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    href: "food",
    title: "食品",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    href: "component",
    title: "元件",
    description: "Visually or semantically separates content.",
  },
];

const ClientNavigation = () => {
  const navigate = useNavigate();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <BiSolidCategoryAlt className="text-primary text-lg me-2" />
            產品分類
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <div className="flex flex-col" key={component.title}>
                  <Button
                    key={component.title}
                    variant={"ghost"}
                    onClick={() => {
                      navigate(`/products?page=1&category=${component.href}`);
                    }}
                  >
                    {component.title}
                  </Button>
                  <small>{component.description}</small>
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button
            variant={"ghost"}
            onClick={() => {
              navigate("/admin");
            }}
          >
            <RiAdminFill className="text-primary text-lg me-2" />
            Admin
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default ClientNavigation;
