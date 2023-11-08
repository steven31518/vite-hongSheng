import { Outlet, Link } from "react-router-dom";
import ClientNavigation from "@/components/ClientNavigation";

const Home = () => {
  return (
    <div className=" h-full flex-1 flex-col  md:flex">
      <div className="flex items-center justify-start space-y-2 space-x-3  border-b-2 border-solid border-border px-4 py-2">
        <div>
          <Link to="/">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          </Link>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <ClientNavigation />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
