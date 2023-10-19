import LoginForm from "@/components/LoginForm";
import { useAppSelector } from "@/store";
import { useEffect } from "react";
import ReactLoading from "react-loading";
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
        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(255,255,255,0.8)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(3px)",
            }}
          >
            <ReactLoading type="bars" color="block" height={100} width={60} />
          </div>
        )}
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
