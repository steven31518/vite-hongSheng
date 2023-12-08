import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (data: { username: string; password: string }) => {
      return api.login.signIn(data);
    },
    onMutate(variables) {
      return { variables };
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: "登入失敗",
        description: error?.message,
      });
    },
    onSuccess(data) {
      const { token, expired } = data;
      document.cookie = `hongShengToken=${token}; expires=${new Date(
        expired
      )};`;
      toast({
        variant: "default",
        title: "登入成功",
        description: data?.message,
      });
      navigate("/admin");
    },
  });
}
