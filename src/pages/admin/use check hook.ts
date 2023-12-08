import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function useCheckUser() {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => api.login.userCheck(),
    onMutate() {},
    onError(error) {
      toast({
        variant: "destructive",
        title: "登入失敗",
        description: error?.message,
      });
      navigate("/login");
    },
    onSuccess(data) {
      if (data.success === false) {
        navigate("/login");
      }
    },
  });
}
