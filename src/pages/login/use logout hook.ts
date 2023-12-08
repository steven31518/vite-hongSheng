import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";
export function useLogout() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return api.login.logout();
    },
    onMutate(variables) {
      return { variables };
    },
    onError(error) {
      return error.message;
    },
    onSuccess(data) {
      console.log(data);
      document.cookie = "hongShengToken=;";
      navigate("/login");
    },
  });
}
