export interface queryStatus {
  status: "idle" | "pending" | "error" | "success"|"fetching";
  message?: string;
}
