import LoginForm from "@/components/LoginForm";
import { useAppSelector } from "@/store";
import { useEffect } from "react";
import FullscreenLoading from "@/components/FullscreenLoading";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { msg, error, loginState, loading } = useAppSelector(
    (state) => state.loginData
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (loginState === true) {
      navigate("/admin");
    }
  }, [loginState, navigate]);

  return (
    <>
      <div className="container py-5 min-h-screen">
        {loading && <FullscreenLoading />}
        <div className="flex flex-col justify-center items-center">
          <LoginForm className="mb-2" />
          {msg && (
            <strong
              className={loginState ? "text-green-500" : "text-destructive"}
            >
              {msg}
            </strong>
          )}
          {error && (
            <div className="text-red-500 text-sm font-semibold">
              伺服器無回應
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
