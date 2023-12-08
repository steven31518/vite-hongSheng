import LoginForm from "@/components/LoginForm";

const Login = () => {
  // function addDays(days: number) {
  //   const today = new Date();
  //   const date2 = today.getDate() + days;
  //   return new Date(today.setDate(date2)).toDateString();
  // }
  return (
    <>
      <div className="container py-5 min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <LoginForm className="mb-2" />
        </div>
      </div>
    </>
  );
};

export default Login;
