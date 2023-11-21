export interface queryStatus {
  status: "idle" | "pending" | "error" | "success";
  message?: string;
}
